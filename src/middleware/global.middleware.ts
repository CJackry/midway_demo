import {Context, NextFunction} from "@midwayjs/web";
import {IMiddleware, Middleware} from "@midwayjs/core";

// 用于全局中间件
@Middleware()
export class GlobalMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      ctx.state.user = {
        name: 'test',
      };
      await next();
    };
  }

  // 忽略的路径
  ignore(ctx: Context): boolean {
    const ignorePath = ['/report'];
    return ignorePath.includes(ctx.path);
  }

  // 匹配的路径(忽略和匹配只能存在一个，不可同时提供，会报错)
  // match(ctx: Context): boolean {
  //   const matchPath = ['/test'];
  //   return matchPath.includes(ctx.path);
  // }


  static getName() {
    return 'global';
  }

}
