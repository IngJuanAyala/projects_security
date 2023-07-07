const mysql = require('./helpers/db/mysql/index');
require('./utils/String.prototype.formatDate');
const logger = require('@condor-labs/logger');
const moment = require('moment');
const axios = require('axios');

const { TYPES, SEND_SETTING_DATA, END_SETTING_DATA, ERROR_AXIOS, FREQUENCY_LIST } = require('./constants');

const { API_URL, AUTHORIZATION_API_KEY } = process.env;
const worker = {
  start: async () => {
    try {
      const { response } = await callExternalAPI('GET', `${API_URL}/settings`, {
        Authorization: `Basic ${AUTHORIZATION_API_KEY}`,
      });
      if (response !== null && response.length > 0) {
        for (const responseElement of response) {
          // eslint-disable-next-line no-await-in-loop
          const ValidReports = await worker.validateFrequency(responseElement.cd_report_generation_schedule);
          if (ValidReports) {
            const body = {
              reportName: responseElement.nm_report,
              typeRequest: 'scheduled',
            };
            // eslint-disable-next-line no-await-in-loop
            await saveLogs(responseElement.nm_report, SEND_SETTING_DATA, TYPES.INFO);
            // eslint-disable-next-line no-await-in-loop
            const res = await callExternalAPI(
              'POST',
              `${API_URL}/schedule/report`,
              { 'Content-Type': 'application/json', Authorization: `Basic ${AUTHORIZATION_API_KEY}` },
              responseElement.nm_report,
              body
            );
            logger.info(res);
            // eslint-disable-next-line no-await-in-loop
            await saveLogs(responseElement.nm_report, END_SETTING_DATA, TYPES.INFO);
          }
        }
      }
    } catch (error) {
      logger.error(error);
      await saveLogs('Error function start Scheduler Worker', 'ERROR_APLICATION', TYPES.ERROR, `${error.message}`);
    }
  },
  validateFrequency: async (name) => {
    const nowDay = parseInt(moment().format('DD'));
    const nowMonth = parseInt(moment().format('MM'));
    if (
      name === FREQUENCY_LIST.FIRST_DAY_QUARTER &&
      nowDay === 1 &&
      (nowMonth === 1 || nowMonth === 4 || nowMonth === 7 || nowMonth === 10)
    ) {
      return true;
    }

    if (name === FREQUENCY_LIST.DAILY) {
      return true;
    }

    if (name === FREQUENCY_LIST.LAST_DAY_MONTH) {
      return nowDay === moment().daysInMonth();
    }

    if (name.includes('DAY_') && name.includes('_MONTH')) {
      const day = parseInt(name.split('_')[1]);
      return nowDay === day;
    }

    if (name === FREQUENCY_LIST.MONDAY && moment.weekdays()[moment().weekday()] === moment.weekdays()[1]) {
      return true;
    }
    if (name === FREQUENCY_LIST.TUESDAY && moment.weekdays()[moment().weekday()] === moment.weekdays()[2]) {
      return true;
    }
    if (name === FREQUENCY_LIST.WEDNESDAY && moment.weekdays()[moment().weekday()] === moment.weekdays()[3]) {
      return true;
    }
    if (name === FREQUENCY_LIST.THURSDAY && moment.weekdays()[moment().weekday()] === moment.weekdays()[4]) {
      return true;
    }
    if (name === FREQUENCY_LIST.FRIDAY && moment.weekdays()[moment().weekday()] === moment.weekdays()[5]) {
      return true;
    }
    if (name === FREQUENCY_LIST.SATURDAY && moment.weekdays()[moment().weekday()] === moment.weekdays()[6]) {
      return true;
    }
    if (name === FREQUENCY_LIST.SUNDAY && moment.weekdays()[moment().weekday()] === moment.weekdays()[0]) {
      return true;
    }

    return false;
  },
};

const callExternalAPI = async (method, url, headers, report = null, data = null) => {
  try {
    const config = {
      method,
      url,
      timeout: 20000,
      headers,
      data,
    };

    const result = await axios(config);
    return result.data;
  } catch (e) {
    logger.error(e);
    await saveLogs(report, ERROR_AXIOS, TYPES.ERROR, `'${e.message}'`);
  }
};

const saveLogs = async (report, operation, type, detail = null) => {
  try {
    const query = `insert into logs (nm_report, dt_creation_date, cd_operation, ds_detail, cd_type) values ('${report}','${moment().format(
      'YYYY-MM-DD HH:mm:ss'
    )}', '${operation}', ${detail}, '${type}')`;
    await mysql.query(query);
  } catch (error) {
    logger.error(error);
  }
};

module.exports = worker;
