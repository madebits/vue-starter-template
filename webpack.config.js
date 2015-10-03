'use strict'

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')

module.exports = function(env = {}) {
  const getOption = (name, asBoolean = true) => {
    const v = env[`build-${name}`]
    return asBoolean ? ['1', 'true', 'on', true, 1].some(_ => _ === v) : v
  }

  const src = path.resolve(__dirname, 'src')
  const options = {
    isRelease: getOption('release'),
    isTest: getOption('test'),
    includeUnitTests: getOption('unittests'),
    src: src,
    include: [src],
    dest: path.resolve(__dirname, 'dist'),
    sourceMap: getOption('source-map')
  }
  options.isDebug = !options.isRelease && !options.isTest
  console.log(options)

  const styleLoader = (type, fallback) => {
    const sourceMap = !options.isRelease || options.sourceMap
    let use = [
      {
        loader: 'css-loader',
        options: {
          sourceMap,
          minimize: options.isRelease
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap,
          plugins: () => [
            autoprefixer({ browsers: ['last 2 versions', 'ie > 8'] })
          ]
        }
      }
    ]
    switch (type) {
      case 'css':
        break
      case 'less':
        use.push({
          loader: 'less-loader',
          options: { sourceMap }
        })
        break
      case 'scss':
        use.push({
          loader: 'sass-loader',
          options: { sourceMap }
        })
        break
      default:
        throw new Error(`Unknown style loader: ${type}`)
    }

    if(options.isDebug || options.isTest) {
      use.unshift({
        loader: fallback || 'style-loader',
        options: {
          sourceMap
        }
      })
    }

    return (options.isDebug || options.isTest) ? use : ExtractTextPlugin.extract({
      fallback: fallback || 'style-loader',
      use
    })
  }

  const svgLoader = () => {
    const loaders = [
      {
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'i/[hash].[ext]'
        }
      }
    ]
    if (options.isRelease) {
      loaders.push({
        loader: 'svgo-loader'
      })
    }
    return loaders
  }

  let config = {
    name: 'application',
    entry: {
      main: './src/main.js',
      vendor: './src/vendor.js'
    },
    output: {
      filename: options.isDebug ? '[name].js' : '[name].[chunkhash].js',
      path: options.dest
    },
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        vue$: 'vue/dist/vue.esm.js',
        '@': options.src
      }
    },
    module: {
      rules: [
        {
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          enforce: 'pre',
          include: options.include,
          exclude: [path.resolve(__dirname, 'test.bundle.js'), /.+\.spec\.js$/],
          options: {
            emitWarning: options.isDebug,
            emitError: options.isRelease,
            failOnError: options.isRelease,
            formatter: require('eslint-formatter-pretty')
          }
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            //extractCSS: true,
            loaders: {
               css: styleLoader('css', 'vue-style-loader'),
               less: styleLoader('less', 'vue-style-loader'),
               scss: styleLoader('scss', 'vue-style-loader')
            }
          },
          include: options.include
        },
        //{ test: /iview.src.*?js$/, loader: 'babel-loader' },
        {
          test: /\.js$/,
          loader: `babel-loader${options.isDebug
            ? '?cacheDirectory=true'
            : ''}`,
          include: options.include
        },
        {
          test: /\.(svg)(\?.*)?$/,
          use: svgLoader()
        },
        {
          test: /\.(png|jpe?g|gif)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: 'i/[hash].[ext]'
          }
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: 'i/[hash].[ext]'
          }
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: 'i/[hash].[ext]'
          }
        },
        {
          test: /\.css$/,
          use: styleLoader('css')
        },
        {
          test: /\.less$/,
          use: styleLoader('less')
        },
        {
          test: /\.scss$/,
          use: styleLoader('scss')
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        DEBUG: options.isDebug,
        'process.env': {
          NODE_ENV: options.isRelease ? '"production"' : '"debug"' //vue
        }
      }),
      new CleanWebpackPlugin(['dist', 'testresults'], {
        root: __dirname,
        verbose: options.isDebug,
        dry: false
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'index.ejs',
        inject: true,
        chunksSortMode: 'dependency',
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
          // more options:
          // https://github.com/kangax/html-minifier#options-quick-reference
        }
      }),
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, 'static'),
          to: options.dest
        }
      ]),
      new webpack.ProvidePlugin({ // for bootstrap
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Popper: ['popper.js', 'default']
      })
    ]
  }

  if (options.isDebug) {
    config.devtool = '#cheap-module-eval-source-map'
    config.plugins.push(new webpack.NamedModulesPlugin())
  } else if (options.isRelease) {
    if (options.sourceMap) {
      config.devtool = '#source-map'
    }
    config.plugins.push(
      new ExtractTextPlugin({
        filename: options.isDebug ? '[name].css' : '[name].[contenthash].css',
        allChunks: true
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: function(module) {
          if (!module.resource) return false
          const modulePath = module.resource.replace(/\\/g, '/')
          const canInclude = modulePath.indexOf('/node_modules/') > 0
          return canInclude
        }
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        minChunks: Infinity
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        },
        sourceMap: options.sourceMap
      })
    )
  }

  if (options.isTest) {
    delete config.entry
    config.devtool = 'inline-source-map'
  }

  if (options.isDebug && options.includeUnitTests) {
    config.entry.test = path.resolve(__dirname, 'test.bundle.js')
    config.plugins.push(
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'test.ejs'),
        filename: 'test.html',
        inject: 'body',
        hash: false,
        chunks: ['manifest', 'vendor', 'test'],
        chunksSortMode: 'dependency'
      })
    )
  }

  return [config]
}
