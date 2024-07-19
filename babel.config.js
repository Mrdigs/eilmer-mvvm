module.exports = function (api) {
  const isTest = api.env('test')
  const presets = ['@babel/preset-react']
  const plugins = ['@babel/plugin-proposal-private-methods']

  if (isTest) {
    presets.push(['@babel/preset-env', {targets: {node: 'current'}}])
    presets.push('@babel/preset-typescript')
  }

  return {
    presets,
    plugins
  }
}
