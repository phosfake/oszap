import { INDEX_TYPE, Table } from '@typedorm/common';

export const table = new Table({
  name: 'zaps',
  partitionKey: 'PK',
  sortKey: 'SK',
  indexes: {
    GSI1: {
      type: INDEX_TYPE.GSI,
      partitionKey: 'GSI1PK',
      sortKey: 'GSI1SK'
    }
  }
});
