const path = require('path');
const resolve = dir => path.resolve(__dirname, dir);
const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#1DA57A' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  babel: {
    plugins: [
      ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],
      ['@babel/plugin-proposal-decorators', { legacy: true }],
    ],
  },
  webpack: {
    alias: {
      '@': resolve('src'),
      components: resolve('src/components'),
    },
  },
  // devServer: {
  //   proxy: 'http://localhost:3000',
  // },
};
