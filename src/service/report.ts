import {Config, Init, Provide} from "@midwayjs/core";

@Provide()
export class ReportService {

  // 通过Config装饰器获取配置信息(字符串表示在config.xxx中的字段索引)
  @Config('test')
  config;

  // 异步初始化，可以在这里请求远程数据，初始化一些数据等（只能有一个）,@Init装饰器标记的方法一定会以异步的方式执行
  @Init()
  async init() {
    console.log('report controller init');
    console.log('config', this.config);
    await new Promise(resolve => {
      setTimeout(() => {
        this.config.initData = 'init data';
      }, 1000);
    });
  }

  async getReport() {
    return 'get report';
  }
}
