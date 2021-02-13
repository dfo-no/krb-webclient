import {
  ContainerResponse,
  CosmosClient,
  DatabaseResponse,
  ItemDefinition,
  ItemResponse
} from '@azure/cosmos';
import { IConfig } from './config';

interface IPartitionKey {
  kind: string;
  paths: string[];
}

// TODO: Strong typing, read result in a meaningful manner, error handeling etc....
// This is a work in progress

export class CosmosApi {
  private client: CosmosClient;

  private endpoint = '';

  private databaseId = '';

  private containerId = '';

  private partitionKey: IPartitionKey;

  constructor(dbConfig: IConfig) {
    const { endpoint } = dbConfig;
    const { key } = dbConfig;

    this.databaseId = dbConfig.database.id;
    this.containerId = dbConfig.container.id;
    this.partitionKey = { kind: 'Hash', paths: ['/Country'] };
    this.client = new CosmosClient({ endpoint, key });
  }

  async createDatabase(): Promise<DatabaseResponse> {
    return this.client.databases.createIfNotExists({
      id: this.databaseId
    });
  }

  async readDatabase(): Promise<DatabaseResponse> {
    return this.client.database(this.databaseId).read();
  }

  async createContainer(): Promise<ContainerResponse> {
    return this.client
      .database(this.databaseId)
      .containers.createIfNotExists(
        { id: this.containerId, partitionKey: this.partitionKey },
        { offerThroughput: 400 }
      );
  }

  async readContainer(): Promise<ContainerResponse> {
    return this.client
      .database(this.databaseId)
      .container(this.containerId)
      .read();
  }

  async createFamilyItem(itemBody: any): Promise<ItemResponse<ItemDefinition>> {
    return this.client
      .database(this.databaseId)
      .container(this.containerId)
      .items.upsert(itemBody);
  }
}

export default CosmosApi;
