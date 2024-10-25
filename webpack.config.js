const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin'); // For PWA
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // For CSS extraction

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';

  return {
    mode: isProd ? 'production' : 'development',
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProd ? '[name].[contenthash].js' : '[name].js',
      publicPath: '/', // Serve all assets from the root
      clean: true, // Clean the output directory before each build
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'], // Resolve these file types
    },
    optimization: {
      minimize: isProd, // Enable minimization in production
      minimizer: [new TerserPlugin()],
      splitChunks: {
        chunks: 'all', // Split vendor and app code for better caching
      },
      runtimeChunk: {
        name: 'runtime', // Generate a separate runtime chunk for better caching
      },
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
        {
          test: /\.css$/, // Add support for CSS
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i, // Add support for images
          type: 'asset/resource',
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/, // Add support for fonts
          type: 'asset/resource',
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(), // Clean output directory before each build
      new HtmlWebpackPlugin({
        template: './public/index.html', // Use an HTML template for the entry point
        inject: true, // Injects scripts into the HTML
      }),
      new MiniCssExtractPlugin({
        filename: isProd ? '[name].[contenthash].css' : '[name].css', // Extract CSS files
      }),
    ],
    devtool: isProd ? 'source-map' : 'inline-source-map', // Enable source maps in development
    devServer: {
      static: {
        directory: path.resolve(__dirname, 'dist'), // Serve from the 'dist' directory
      },
      compress: true,
      port: 9001,
      open: true,
      historyApiFallback: true, // Support for single-page applications
    },
    stats: {
      children: true,
      errorDetails: true,
    },
  };
};
