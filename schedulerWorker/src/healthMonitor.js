const { APP_NAME, DEBUG_HEALTH = false, API_URL_APP_INVENTORY, API_KEY_HEALTH_CHECK } = process.env;

const healthConfig = {
  service: APP_NAME,
  checks: [],
  dependencies: [],
  description: '',
  urls: [],
  path: '',
  version: '',
  aliasMachine: '',
  timeoutMS: 3000,
  debug: JSON.parse(DEBUG_HEALTH),
  webhook: {
    enabled: true,
    url: `${API_URL_APP_INVENTORY}/apps/${APP_NAME}/sections/health`,
    auth: API_KEY_HEALTH_CHECK,
    intervalMS: 10000,
  },
};

module.exports = { healthConfig };