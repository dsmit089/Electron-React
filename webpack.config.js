const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack");

module.exports = {
mode:'development',
//   externals: {
//     'react': 'React'
// },
  entry: path.join(__dirname, "src", "index.js"),
  output: {
    path:path.resolve(__dirname, "dist"),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
                   test: /\.css$/,
                   use: [
                     'style-loader',
                     'css-loader'
                   ]
              },
      {
                test: /\.(png|jp(e*)g|svg|gif|ico|json)$/,
                 use: [
                   {
                     loader: 'file-loader',
                     options: {
                       name: 'images/[hash]-[name].[ext]',
                     }
                   }]
        }    
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
    }),
    new webpack.ExternalsPlugin('commonjs', [
      'electron'
  ])
  ],
}