module.exports = {
   entry: './src/js/main.js',
   output: {
      path:'/Users/Monali/Study/myProjects/ReactApp/dist',
      filename: 'bundle.js',
      publicPath: '/'
   },
   devServer: {
      inline: true,
      contentBase: './dist',
   },
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            query: {
               presets: ['es2015', 'react']
            }
         }
      ]
   }
};
