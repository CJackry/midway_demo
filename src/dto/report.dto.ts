import { Rule, RuleType } from '@midwayjs/validate';


export class ReportDto {
  // 根据Rule装饰器，装饰一个属性，如下表示id属性必须是number类型
  @Rule(RuleType.number())
  id: number;
}
