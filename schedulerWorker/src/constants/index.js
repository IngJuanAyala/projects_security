const ENVIRONMENTS = {
  local: 'local',
  development: 'development',
  test: 'test',
  demo: 'demo',
  production: 'production',
};

const TYPES = {
  INFO: 'INFO',
  ERROR: 'ERROR',
};

const FREQUENCY_LIST = {
  LAST_DAY_MONTH: 'LAST_DAY_MONTH',
  DAY_14_MONTH: 'DAY_14_MONTH',
  DAY_5_MONTH: 'DAY_5_MONTH',
  DAY_16_MONTH: 'DAY_16_MONTH',
  DAY_1_MONTH: 'DAY_1_MONTH',
  DAY_2_MONTH: 'DAY_2_MONTH',
  MONDAY: 'MONDAY',
  TUESDAY: 'TUESDAY',
  WEDNESDAY: 'WEDNESDAY',
  THURSDAY: 'THURSDAY',
  FRIDAY: 'FRIDAY',
  SATURDAY: 'SATURDAY',
  SUNDAY: 'SUNDAY',
  DAILY: 'DAILY',
  FIRST_DAY_QUARTER: 'FIRST_DAY_QUARTER',
};

module.exports = {
  METRICS_NAME: 'ceb_core-common_report_worker',
  METRICS_NAME_COUNT: 'ceb_core-common_report_worker_count',
  METRIC_DATA_MATCH: 'data_status_match',
  METRIC_DATA_NOT_MATCH: 'data_status_not_match',
  TimeZone: 'America/New_York',
  SEND_SETTING_DATA: 'SCHEDULER.SEND_SETTING_DATA',
  END_SETTING_DATA: 'SCHEDULER.END_SETTING_DATA',
  ERROR_SEND_SETTING_DATA: 'SCHEDULER.ERROR_SEND_SETTING_DATA',
  GET_SETTING_DATA: 'SCHEDULER.GET_SETTING_DATA',
  END_GET_SETTING_DATA: 'SCHEDULER.END_GET_SETTING_DATA',
  ERROR_AXIOS: 'SCHEDULER.ERROR_AXIOS',
  APLICATION_ERROR: 'SCHEDULER.APLICATION_ERROR',
  TYPES,
  FREQUENCY_LIST,
  ENVIRONMENTS,
};
