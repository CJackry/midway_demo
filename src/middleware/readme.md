# middleware

## 介绍： [中间件](https://midwayjs.org/docs/middleware) (基于洋葱模型)

Web 中间件是在控制器调用 之前 和 之后（部分）调用的函数。 中间件函数可以访问请求和响应对象。分为路由中间件和全局中间件
1. 路由中间件：只对当前路由有效
2. 全局中间件：对所有路由有效
<p style="color: red">执行顺序：全局中间件 -> 路由中间件 -> 控制器 -> 路由中间件 -> 全局中间件</p>
<img src="https://img.alicdn.com/imgextra/i1/O1CN01oQZ5Rk1jReqck6YMn_!!6000000004545-2-tps-2350-584.png" />

## 使用
1. 创建中间件
见 `src/middleware` 目录下的文件
2. 注册中间件
    - 全局中间件：在 `src/configuration.ts` 中的 `middleware` 字段中添加
    - 路由中间件：在 `@Controller` 装饰器中第二参数`options`添加 `middleware` 字段
3. 直接使用

### 忽略匹配路由
在`middleware`中使用`ignore`字段，可以忽略匹配的路由

### 匹配路由
在`middleware`中使用`match`字段，可以匹配指定的路由

> 注意：`ignore`和`match`不能同时使用

### 执行顺序
按照数组注册的顺序执行，先注册的先执行
> 如何操作修改全局中间件的执行顺序？
>  - 在`configuration`中使用`getMiddleware`方法获取中间件数组，然后修改数组的顺序
>  - 有以下几种方法可以修改数组的顺序
>    - `insertFirst`：加在最前面
>    - `insertLast`：加在最后面
>    - `insertBefore`：加在指定中间件前面
>    - `insertAfter`：加在指定中间件后面
>    - ......等等
