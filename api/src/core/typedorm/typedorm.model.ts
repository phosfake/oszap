import { DynamoDB } from 'aws-sdk';

export interface DeletionSuccess {
  success: boolean;
}

export interface FindResult<T> {
  items: T[];
  cursor?: DynamoDB.DocumentClient.Key | undefined;
}
