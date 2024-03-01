import {IMiddleware, Middleware } from "@midwayjs/core";
import {Context, NextFunction} from "@midwayjs/web";

@Middleware()
export class ReportMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    // ctx及时koa的上下文对象，next是koa的下一个中间件（参考洋葱模型）
    return async (ctx: Context, next: NextFunction) => {
      // 控制器前执行的逻辑
      const starTime = Date.now();
      // 执行下一个中间件，最后执行到控制器
      const res = await next();
      // 控制器后执行的逻辑
      const endTime = Date.now();
      console.log('report middleware: run time ', endTime - starTime);
      // 返回上一个中间件的结果
      return res;
    };
  }

  // 提供中间件的名字，方便日后排查问题
  static getName(): string {
    return 'report';
  }

}
