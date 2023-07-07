const { boot } = require('@cebroker/boot');
boot({
  main: `${__dirname}/index.js`,
  secretName: process.env.AWS_SECRET_NAME,
  secretRegion: process.env.AWS_SECRET_REGION,
  passiveSecretFail: false,
  passiveEnvFail: true,
  shouldSplitSecretKey: true,
  fetchMetadataRegion: process.env.NODE_ENV === 'development' ? false : true,
});
