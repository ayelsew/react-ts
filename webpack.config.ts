import path from 'path';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import type { Configuration as ConfigurationWebpack } from 'webpack';
import type { Configuration as ConfigurationDevServer } from 'webpack-dev-server';

interface Configuration extends ConfigurationWebpack {
  devServer?: ConfigurationDevServer
}

function configuration(_env: unknown, argv: { mode: string }): Configuration {
  return {
    entry: './src/index.tsx',
    devtool: argv.mode === 'production' ? false : 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.(css|scss)$/,
          use: ['style-loader', 'css-loader'],
          exclude: /node_modules/,
        },
        {
          test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
          use: ['file-loader'],
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [
      new HTMLWebpackPlugin({
        template: path.resolve(__dirname, 'src', 'index.html'),
      }),
    ],
    resolve: {
      plugins: [new TsconfigPathsPlugin()],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
      static: {
        directory: path.resolve(__dirname, 'dist'),
      },
      historyApiFallback: true,
      port: 8888,
      open: false,
    },
  };
}

export default configuration;
