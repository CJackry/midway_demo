import { MidwayConfig, MidwayAppInfo } from '@midwayjs/core';

export default (appInfo: MidwayAppInfo) => {
  return {
    // use for cookie sign key, should change to your own and keep security
    keys: appInfo.name + '_1709197571317_8387',
    egg: {
      port: 7011,
    },
    // 测试动态函数的字段
    cache: {
      enable: true,
    },
    test: {
      initData: 'test',
    },
    // security: {
    //   csrf: false,
    // },
  } as MidwayConfig;
};
