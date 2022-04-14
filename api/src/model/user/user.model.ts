import {
  Attribute,
  AutoGenerateAttribute,
  AUTO_GENERATE_ATTRIBUTE_STRATEGY,
  Entity,
  INDEX_TYPE
} from '@typedorm/common';
import { IsAlphanumeric, IsEmail, IsNotEmpty } from 'class-validator';
import { table } from 'src/core/dynamodb/dynamodb.tables';

@Entity({
  name: 'user',
  table: table,
  primaryKey: {
    partitionKey: 'u#{{name}}',
    sortKey: 'u#{{name}}'
  },
  indexes: {
    GSI1: {
      type: INDEX_TYPE.GSI,
      partitionKey: 'u#{{id}}',
      sortKey: 'u#{{id}}'
    }
  }
})
export class User {
  @AutoGenerateAttribute({
    // Chose because of sortability: https://github.com/segmentio/ksuid#what-is-a-ksuid
    strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.KSUID
  })
  id: string;

  @AutoGenerateAttribute({
    // Reason for choice over ISO date: https://stackoverflow.com/a/47426842
    strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.EPOCH_DATE,
    autoUpdate: false
  })
  createdOnUnix: number;

  @AutoGenerateAttribute({
    // Reason for choice over ISO date: https://stackoverflow.com/a/47426842
    strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.EPOCH_DATE,
    autoUpdate: true
  })
  updatedOnUnix: number;

  @IsEmail()
  @IsNotEmpty()
  @Attribute()
  email: string;

  @IsNotEmpty()
  @IsAlphanumeric()
  @Attribute()
  name: string;
}
