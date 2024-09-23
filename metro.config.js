const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);
// /** @type {import('expo/metro-config').MetroConfig} */
config.resolver.assetExts.push("db")

module.exports = config;
