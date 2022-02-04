module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    //Se debe añadir el plugin de reanimated
    plugins: ['react-native-reanimated/plugin'],
  };
};
