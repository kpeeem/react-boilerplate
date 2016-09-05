var path = require('path');
var glob = require('glob');

module.exports = { 
 title: 'Boiler Style Guide',
 defaultExample: true,
 components: function() {
    return glob.sync(path.resolve(__dirname, 'app/components/**/*.js')).filter(function(module) {
      return module;
    });
  },
 updateWebpackConfig: function(webpackConfig, env) {
 	"use strict";
   // Your source files folder or array of folders, should not include node_modules
   let dir = path.join(__dirname, 'app');
   webpackConfig.module.loaders.push(
     // Babel loader will use your project’s .babelrc
     {
       test: /\.js?$/,
       include: dir,
       loader: 'babel'
     },
     // Other loaders that is needed for your components
     {
       test: /\.css$/,
       include: dir,
       loader: 'style!css?modules&importLoaders=1'
     }
   );
   return webpackConfig;
 },
};