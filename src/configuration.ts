import {App, Configuration, ILifeCycle, IMidwayContainer} from '@midwayjs/core';
import { join } from 'path';
import * as egg from '@midwayjs/web';
import * as koa from '@midwayjs/koa';
import {GlobalMiddleware} from "./middleware/global.middleware";
import * as lodash from 'lodash';

@Configuration({
  imports: [egg, koa],
  importConfigs: [join(__dirname, './config')],
})
export class MainConfiguration implements ILifeCycle {
  // 通过App装饰器，获取到不同组件的Application对象（如下app为egg的，koaApp为koa的，可供控制器使用，如this.app.xxx()）
  @App('egg')
  app: egg.Application;

  @App()
  koaApp: koa.Application;


  async onReady(applicationContext: IMidwayContainer) {
    // 注册全局中间件(即可使用)
    this.app.useMiddleware([GlobalMiddleware]);
    // console.log(this.app.getMiddleware())
    // this.app.getMiddleware().insertFirst(GlobalMiddleware);
    // 吧GlobalMiddleware插入到reportMiddleware之后
    // this.app.getMiddleware().insertAfter(GlobalMiddleware, 'reportMiddleware');

    // 想依赖注入容器中注册一个lodash对象，这样就可以在任何地方使用了
    applicationContext.registerObject('lodash', lodash);
  }

  async onServerReady() {
    console.log('server is ready')
  }

}
