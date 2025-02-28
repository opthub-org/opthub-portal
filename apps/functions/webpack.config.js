const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    filename: 'index.js',
    path: `${__dirname}/dist`,
    libraryTarget: 'this'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@portal': path.resolve(__dirname, '../../packages')
    },
    symlinks: true
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          configFile: path.resolve(__dirname, 'tsconfig.json')
        }
      }
    ]
  },
  externals: [
    nodeExternals({
      allowlist: [/^@portal/]
    })
  ]
}
