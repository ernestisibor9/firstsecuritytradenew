const { withAppBuildGradle } = require('@expo/config-plugins');

const withRemoveBundleCompression = (config) => {
  console.log('Running withRemoveBundleCompression plugin...');
  return withAppBuildGradle(config, (config) => {
    if (config.modResults.language === 'groovy') {
      console.log('Modifying build.gradle contents...');
      config.modResults.contents = config.modResults.contents.replace(
        /.*enableBundleCompression.*/g,
        '    // Removed enableBundleCompression'
      );
    }
    return config;
  });
};

module.exports = withRemoveBundleCompression;
