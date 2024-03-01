import {App, Body, Controller, Get, Inject, Post, Query} from "@midwayjs/core";
import {ReportDto} from "../dto/report.dto";
import {ReportMiddleware} from "../middleware/report.middleware";
import {Context} from "@midwayjs/web";
import {Application} from "egg";
import {ReportService} from "../service/report";
import {ICacheService} from "../service/dynamicCacheService";

// 根据路径装饰器，装饰一个类，如下表示/report路径下的控制器
@Controller('/report', {
  middleware: [ReportMiddleware], // 使用中间件作为路由的中间件
})
// 装饰器注入的属性，都在实例创建后（new）才会赋值，所以在构造函数中使用是获取不到的（@Init可以拿到）
export class ReportController {

  // 通过注入的方式，获取到上下文对象（不同框架的ctx的Context类型不同，比如本demo用的是egg）
  @Inject()
  ctx: Context;

  // 通过注入的方式，获取服务对象
  @Inject()
  reportService: ReportService;

  // 从依赖注入容器中获取到的对象(一般在onReady生命周期中注入的对象)
  @Inject('lodash')
  lodash;

  // 注入的动态函数
  @Inject('dynamicCacheServiceHandler')
  cacheService: ICacheService;

  // 获取容器提供的主要Application，也就是configuration引入的第一个组件Application
  @App('egg')
  app: Application;

  // 根据Get装饰器，装饰一个方法，如下表示/report路径下的get请求
  @Get('/')
  async report(
    // 根据Query装饰器，获取请求参数，但是最好使用DTO来获取参数（方便数据结构的校验等）
    @Query() name: string
  ) {
    const ctx = this.ctx;
    const app = this.app;
    const report = await this.reportService.getReport();
    const serviceConfig = await this.reportService.config;
    const dynamicCacheService = await this.cacheService.getData();

    return {
      path: 'report',
      name,
      ctx,
      app,
      getReport: report,
      dynamicCacheService,
      serviceConfig,
    };
  }

  // 根据Post装饰器，装饰一个方法，如下表示/report路径下的post请求
  @Post('/')
  async saveReport(
    @Body() data: ReportDto
  ) {
    return 'save report';
  }
}
