import {
  ContainerResponse,
  CosmosClient,
  DatabaseResponse,
  ItemDefinition,
  ItemResponse
} from '@azure/cosmos';
import { Bank } from '../models/Bank';

interface IPartitionKey {
  kind: string;
  paths: string[];
}

// TODO: Strong typing, read result in a meaningful manner, error handeling etc....
// This is a work in progress

export class CosmosApi {
  private client: CosmosClient;

  private endpoint: string;

  private databaseId: string;

  private containerId: string;

  private readWriteKey: string;

  private partitionKey: IPartitionKey;

  constructor() {
    if (
      !process.env.REACT_APP_COSMOS_API_URL ||
      !process.env.REACT_APP_COSMOS_DATABASE ||
      !process.env.REACT_APP_COSMOS_CONTAINER ||
      !process.env.REACT_APP_COSMOS_KEY
    ) {
      throw Error('Missing credentials for database');
    }

    this.endpoint = process.env.REACT_APP_COSMOS_API_URL;
    this.databaseId = process.env.REACT_APP_COSMOS_DATABASE;
    this.containerId = process.env.REACT_APP_COSMOS_CONTAINER;
    this.readWriteKey = process.env.REACT_APP_COSMOS_KEY;

    // TODO: Make new partitionkey
    this.partitionKey = { kind: 'Hash', paths: ['/Country'] };
    this.client = new CosmosClient({
      endpoint: this.endpoint,
      key: this.readWriteKey
    });
  }

  async createDatabase(): Promise<DatabaseResponse> {
    const result = await this.client.databases.createIfNotExists({
      id: this.databaseId
    });
    console.log('createDatabase', result);
    return result;
  }

  async readDatabase(): Promise<DatabaseResponse> {
    const result = await this.client.database(this.databaseId).read();
    console.log('readDatabase', result);
    return result;
  }

  async createContainer(): Promise<ContainerResponse> {
    const result = await this.client
      .database(this.databaseId)
      .containers.createIfNotExists(
        { id: this.containerId, partitionKey: this.partitionKey },
        { offerThroughput: 400 }
      );
    console.log('createContainer', result);
    return result;
  }

  async readContainer(): Promise<ContainerResponse> {
    const result = await this.client
      .database(this.databaseId)
      .container(this.containerId)
      .read();
    console.log('readContainer', result);
    return result;
  }

  async createBank(bank: any): Promise<ItemResponse<ItemDefinition>> {
    const result = await this.client
      .database(this.databaseId)
      .container(this.containerId)
      // .items.create(bank);
      .items.upsert(bank);
    console.log('createbank', result);
    return result;
  }

  async readBank(id: string): Promise<ItemResponse<any>> {
    const result = await this.client
      .database(this.databaseId)
      .container(this.containerId)
      .item(id)
      .read();
    console.log('readBank', result);
    return result;
  }
}

export default CosmosApi;
