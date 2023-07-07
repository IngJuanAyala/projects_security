module.exports = {
  apps: [
    {
      name: 'ceb-core-common-report-worker',
      script: './src/init.js',
      cwd: `${__dirname}/worker`,
      instances: 1,
      exec_mode: 'fork',
      max_memory_restart: '1000M',
      log_date_format: 'YYYY/MM/DD HH:mm:ss',
      env: {
        NODE_ENV: 'development',
        ENV: 'development',
        PORT: 3000,
        AWS_SECRET_NAME: 'test/cebroker/foundation/common-report-worker',
        AWS_SECRET_REGION: 'us-east-1',
      },
      env_production: {
        NODE_ENV: 'production',
        ENV: 'production',
        PORT: 3000,
        AWS_SECRET_NAME: 'production/cebroker/foundation/common-report-worker',
        AWS_SECRET_REGION: 'us-east-2',
      },
      env_staging: {
        NODE_ENV: 'development',
        ENV: 'development',
        PORT: 3000,
        AWS_SECRET_NAME: 'test/cebroker/foundation/common-report-worker',
        AWS_SECRET_REGION: 'us-east-1',
      },
      env_demo: {
        NODE_ENV: 'demo',
        ENV: 'demo',
        PORT: 3000,
        AWS_SECRET_NAME: 'demo/cebroker/foundation/common-report-worker',
        AWS_SECRET_REGION: 'us-east-2',
      },
    },
    {
      name: 'ceb-core-common-report-api',
      script: './src/init.js',
      cwd: `${__dirname}/api`,
      instances: 1,
      exec_mode: 'fork',
      max_memory_restart: '300M',
      log_date_format: 'YYYY/MM/DD HH:mm:ss',
      env: {
        NODE_ENV: 'development',
        ENV: 'development',
        AWS_SECRET_NAME: 'test/cebroker/foundation/common-report-api',
        AWS_SECRET_REGION: 'us-east-1',
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: 'production',
        ENV: 'production',
        AWS_SECRET_NAME: 'production/cebroker/foundation/common-report-api',
        AWS_SECRET_REGION: 'us-east-2',
        PORT: 3000,
      },
      env_staging: {
        NODE_ENV: 'development',
        ENV: 'development',
        AWS_SECRET_NAME: 'test/cebroker/foundation/common-report-api',
        AWS_SECRET_REGION: 'us-east-1',
        PORT: 3000,
      },
      env_demo: {
        NODE_ENV: 'demo',
        ENV: 'demo',
        AWS_SECRET_NAME: 'demo/cebroker/foundation/common-report-api',
        AWS_SECRET_REGION: 'us-east-2',
        PORT: 3000,
      },
    },
    {
      name: 'ceb-core-common-report-scheduler',
      script: './src/init.js',
      cwd: `${__dirname}/schedulerWorker`,
      instances: 1,
      exec_mode: 'fork',
      max_memory_restart: '300M',
      log_date_format: 'YYYY/MM/DD HH:mm:ss',
      env: {
        NODE_ENV: 'development',
        ENV: 'development',
        AWS_SECRET_NAME: 'test/cebroker/foundation/common-report-scheduler-worker',
        AWS_SECRET_REGION: 'us-east-1',
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: 'production',
        ENV: 'production',
        AWS_SECRET_NAME: 'production/cebroker/foundation/common-report-scheduler-worker',
        AWS_SECRET_REGION: 'us-east-2',
        PORT: 3000,
      },
      env_staging: {
        NODE_ENV: 'development',
        ENV: 'development',
        AWS_SECRET_NAME: 'test/cebroker/foundation/common-report-scheduler-worker',
        AWS_SECRET_REGION: 'us-east-1',
        PORT: 3000,
      },
      env_demo: {
        NODE_ENV: 'demo',
        ENV: 'demo',
        AWS_SECRET_NAME: 'demo/cebroker/foundation/common-report-scheduler-worker',
        AWS_SECRET_REGION: 'us-east-2',
        PORT: 3000,
      },
    },
  ],
};