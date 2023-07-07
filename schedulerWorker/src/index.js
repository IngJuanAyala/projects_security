const schedule = require('node-schedule');
const worker = require('./worker');
const logger = require('@condor-labs/logger');
const { STATSD_HOST, STATSD_PORT, JOB } = process.env;

const { HealthMonitorPush } = require('@condor-labs/health-middleware');
const { ENVIRONMENTS } = require('./constants');
const { healthConfig } = require('./healthMonitor');

try {
  if (process.env.NODE_ENV !== ENVIRONMENTS.local) {
    HealthMonitorPush(healthConfig);
  }
} catch (error) {
  logger.error(`Error to check the health checker: , ${error}`);
}

const metricsClient = require('@condor-labs/metrics');

const OS = require('os');
require('./utils/String.prototype.formatDate');
metricsClient.socket.on('error', function (error) {
  logger.error(`Error loading metrics client: , ${error}`);
});

const statsDSettings = {
  host: STATSD_HOST,
  port: STATSD_PORT,
  globalTags: {
    instance: OS.hostname(),
    job: JOB,
  },
};

//set metrics's setting to connect and send info throught socker
metricsClient.connect(statsDSettings);

function start(){
  (async () => {
    try {
      metricsClient.increment('heartbeat_total');
      schedule.scheduleJob(process.env.SCHEDULE_TIME, async () => {
        await worker.start();
      });
      logger.info(`CEB Common-report-scheduler-worker is running now`);
    } catch (error) {
      logger.error(error);
      process.emit('SIGINT');
    }
  })();
}


process.on('SIGINT', async () => {
  metricsClient.closeConnection();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  metricsClient.closeConnection();
  process.exit(0);
});

// WINDOWS Process Shutdown
process.on('message', async (msg) => {
  if (msg === 'shutdown') {
    metricsClient.closeConnection();
    process.exit(0);
  }
});

module.exports = start;
