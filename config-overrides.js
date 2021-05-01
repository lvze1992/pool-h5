const theme = require('./theme');
process.env.BUILD_PATH = 'docs';

const { override, addLessLoader, fixBabelImports, addDecoratorsLegacy } = require('customize-cra');

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
);
