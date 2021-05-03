const theme = require('./theme');
const path = require('path');
process.env.BUILD_PATH = 'docs';

const { override, addLessLoader, fixBabelImports, addDecoratorsLegacy, addWebpackAlias } = require('customize-cra');

module.exports = override(
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: theme,
  }), //antd定制主题
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    libraryDirectory: 'es',
    style: true,
  }), //antd按需加载
  addDecoratorsLegacy(), //配置装饰器
  addWebpackAlias({
    src: path.resolve(__dirname, 'src'),
  }),
);
