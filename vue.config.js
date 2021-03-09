const path = require('path');
const isDev = process.env.NODE_ENV === 'development';
const siteConfig = require('./src/site-config');

module.exports = {
    lintOnSave: false,
    indexPath: isDev?'index.html':'../404.html',
    publicPath: isDev?'/':(siteConfig.cdn+'/dist'),
    productionSourceMap: false,
    chainWebpack: config => {
        config.module
            .rule('svg')
            .exclude.add(path.resolve('src/icons'))
            .end();

        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(path.resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            });
    },
    configureWebpack: {
        // devtool: 'source-map'
    },
};