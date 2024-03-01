import {IMidwayContainer, MidwayConfigService, Provide, providerWrapper, ScopeEnum} from "@midwayjs/core";

export interface ICacheService {
  getData(): any;
}

@Provide()
export class CacheService implements ICacheService {
  async getData() {
    return 'cache data';
  }
}

@Provide()
export class CacheServiceMock implements ICacheService {
  async getData() {
    return 'cache data mock';
  }

}

// 动态函数注入，通过不同的使用环境，返回不同的实例（如下是根据配置信息返回不同的函数实例），也可以返回一个回调函数
export async function dynamicCacheServiceHandler(container: IMidwayContainer) {
  const config = container.get(MidwayConfigService).getConfiguration();
  if (config['cache']['enable']) {
    console.log('cache service enabled');
    return await container.getAsync('cacheService');
  } else {
    console.log('cache service disabled');
    return await container.getAsync('cacheServiceMock');
  }
}

// 通过providerWrapper包装，和现有的依赖注入体系可以融合到一起，让容器能够统一管理。
providerWrapper([
  {
    id: 'dynamicCacheServiceHandler',
    provider: dynamicCacheServiceHandler,
    scope: ScopeEnum.Request, // 设置为请求作用域，则上边传入的容器就为请求作用域容器
  }
])
