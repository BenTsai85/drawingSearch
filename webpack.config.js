const path = require('path')
const fs = require('fs')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const webpack = require('webpack')

const pageSrcPath = path.join(__dirname, '/src/pages/')
const publicPath = 'statics/bundle'
const outputPath = path.join(__dirname, publicPath)
const preLoaded = [
  'webpack-hot-middleware/client',
  'babel-polyfill'
]

const scanPageFiles = () => fs.readdirSync(pageSrcPath).reduce((ret, file) => {
  const M = file.match(/(.+).js$/)
  if (M) {
    ret[M[1]] = [...preLoaded, pageSrcPath + file]
  }
  return ret
}, {
  vendor: ['react', 'react-dom', 'react-redux', 'redux', 'redux-actions', 'core-js']
})

const browserBabelCfg = () => {
  const babelCfg = JSON.parse(fs.readFileSync('./.babelrc', 'utf8'))
  if (process.env.NODE_ENV === 'production') {
    babelCfg.presets[0] = [
      'es2015',
      { modules: false }
    ]
  }
  babelCfg.plugins.shift()
  babelCfg.babelrc = false
  return babelCfg
}

const webpackConfig = {
  node: {
    child_process: 'empty',
    fs: 'empty'
  },
  entry: scanPageFiles,
  devtool: 'cheap-module-eval-source-map',
  output: {
    filename: '[name].js',
    path: outputPath,
    publicPath: `/${publicPath}/`
  },
  module: {
    rules: [
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 2000
            }
          }
        ]
      },
      {
        test: /(statics\/css\/[^/]+|node_modules\/.+)\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            query: {
              importLoaders: 1,
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        exclude: /(statics\/css\/[^/]+|node_modules\/.+)\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            query: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]',
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
            options: browserBabelCfg()
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.NamedChunksPlugin(chunk =>
      chunk.name || chunk.modules.map(m => path.relative(m.context, m.request)).join('_')
    ),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'webpackcore'
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development'
    }),
    new CleanWebpackPlugin([outputPath])
  ]
}

const extractCssConfig = config =>
  (!config.test.test('test.css') && !config.test.test('/statics/css/test.css'))
  ? config
  : Object.assign(config, {
    use: ExtractTextPlugin.extract({
      use: config.use.slice(1).map(cfg => {
        if (cfg.query) {
          if (cfg.query.sourceMap) {
            cfg.query.sourceMap = false
            // cfg.query.minimize = true
          }
        }
        return cfg
      })
    })
  })

if (process.env.NODE_ENV === 'production') {
  preLoaded.shift()
  webpackConfig.devtool = false
  webpackConfig.output.filename = '[name].[chunkhash].js'
  webpackConfig.module.rules = webpackConfig.module.rules.map(cfg => extractCssConfig(cfg))
  webpackConfig.plugins = webpackConfig.plugins.concat([
    new ManifestPlugin(),
    // new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin({
      filename: '[name].[contenthash].css',
      allChunks: true
    })
  ])
} else {
  webpackConfig.plugins = webpackConfig.plugins.concat([
    new webpack.HotModuleReplacementPlugin()
  ])
}

module.exports = webpackConfig
