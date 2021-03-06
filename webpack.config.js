const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssPresetEnv = require('postcss-preset-env');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, { mode }) => {
  const config = {
    entry: ['@babel/polyfill', 'react-hot-loader/patch', './src/index.js'],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: './js/[name].js',
      publicPath: '',
    },
    devServer: {
      overlay: true,
      hot: true,
      port: 9000,
      contentBase: [`${__dirname}/public`],
      historyApiFallback: true,
    },
    devtool: mode === 'development' ? 'source-map' : false,
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    postcssPresetEnv({
                      stage: 0,
                      autoprefixer: {
                        grid: true,
                      },
                    }),
                  ],
                },
                sourceMap: true,
              },
            },
            'sass-loader',
          ],
        },
      ],
    },
    resolve: {
      extensions: ['*', '.js', '.jsx'],
      alias: {
        'react-dom': '@hot-loader/react-dom',
        '@': path.resolve(__dirname, 'src'),
      },
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: './assets/styles/[name].css',
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html',
        title: 'form',
      }),

      new webpack.HotModuleReplacementPlugin(),
      new CopyPlugin({
        patterns: [
          {
            from: 'public/assets',
            to: 'assets',
            globOptions: {
              gitignore: true,
            },
          },
        ],
      }),
    ],
  };

  if (mode === 'production') {
    config.optimization = {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              arrows: false,
              collapse_vars: false,
              comparisons: false,
              computed_props: false,
              hoist_funs: false,
              hoist_props: false,
              hoist_vars: false,
              inline: false,
              loops: false,
              negate_iife: false,
              properties: false,
              reduce_funcs: false,
              reduce_vars: false,
              switches: false,
              toplevel: false,
              typeofs: false,
              booleans: true,
              if_return: true,
              sequences: true,
              unused: true,
              conditionals: true,
              dead_code: true,
              evaluate: true,
            },
            mangle: {
              safari10: true,
            },
          },
          sourceMap: false,
          cache: true,
          parallel: true,
          extractComments: false,
        }),
      ],
      splitChunks: {
        chunks: 'all',
        minSize: 10000,
        maxSize: 250000,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    };
    config.plugins.push(
      new PreloadWebpackPlugin({
        rel: 'preload',
        include: 'allAssets',
        fileBlacklist: [/\.map$/, /hot-update\.js$/],
      }),
    );
  }

  return config;
};
