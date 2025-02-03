const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const { wrapWithReanimatedMetroConfig } = require('react-native-reanimated/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
// eslint-disable-next-line no-undef
const config = getDefaultConfig(__dirname);

// Apply NativeWind configuration
const configWithNativeWind = withNativeWind(config, { input: './global.css' });

// Apply Reanimated configuration
const configWithReanimated = wrapWithReanimatedMetroConfig(configWithNativeWind);

module.exports = configWithReanimated;
