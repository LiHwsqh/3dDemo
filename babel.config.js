module.exports = function (api) {
  api.cache(true);

  return {
    presets: [
      [
        '@babel/preset-env', {
          targets: {
            ios: '9',
            android: '5'
          }
        }
      ]
    ]
  }
}