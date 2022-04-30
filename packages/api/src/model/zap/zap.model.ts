import { Entity } from '@typedorm/common';
import { table } from 'src/core/dynamodb/dynamodb.tables';
import { IZapAction } from './zap-action.model';
import { IZapState } from './zap-state.model';
import { ZapTrigger } from './zap-trigger.model';

// @Entity({
//   name: 'zap',
//   table: table,
//   primaryKey: {
//     partitionKey: 'PK',
//     sortKey: 'SK'
//   }
// })
export class Zap {
  id?: string;
  createdOn: Date;
  name: string;
  description?: string;
  trigger: ZapTrigger;
  states: IZapState[];
  actions: IZapAction[];
}
