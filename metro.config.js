const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const path = require('path');

const defaultConfig = getDefaultConfig(__dirname);

const config = {
  resolver: {
    extraNodeModules: {
      ...defaultConfig.resolver.extraNodeModules,
      stream: require.resolve('stream-browserify'),
      crypto: require.resolve('react-native-crypto'),
      buffer: require.resolve('buffer/'),
      assert: require.resolve('assert'),
    },
  },
};

module.exports = mergeConfig(defaultConfig, config);
