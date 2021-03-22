import {
  Container,
  ContainerResponse,
  CosmosClient,
  Database,
  DatabaseResponse,
  FeedResponse,
  ItemDefinition,
  ItemResponse
} from '@azure/cosmos';

import { Bank } from '../models/Bank';

interface IPartitionKey {
  kind: string;
  paths: string[];
}

export class CosmosApi {
  private client: CosmosClient;

  private databaseId: string;

  private containerId: string;

  private partitionKey: IPartitionKey;

  private container: Container;

  private database: Database;

  constructor() {
    if (
      !process.env.REACT_APP_COSMOS_DATABASE ||
      !process.env.REACT_APP_COSMOS_CONTAINER ||
      !process.env.REACT_APP_COSMOSDB_CONNECTION_STRING
    ) {
      throw Error('Missing credentials for database');
    }

    this.databaseId = process.env.REACT_APP_COSMOS_DATABASE;
    this.containerId = process.env.REACT_APP_COSMOS_CONTAINER;

    // TODO: Make new partitionkey
    this.partitionKey = { kind: 'Hash', paths: ['/type'] };
    this.client = new CosmosClient(
      process.env.REACT_APP_COSMOSDB_CONNECTION_STRING
    );
    this.database = this.client.database(this.databaseId);
    this.container = this.database.container(this.containerId);
  }

  async createDatabaseIfNotExists(): Promise<DatabaseResponse> {
    const result = await this.client.databases.createIfNotExists({
      id: this.databaseId
    });
    return result;
  }

  /**
   * Read the database definition
   */
  async readDatabase(): Promise<DatabaseResponse> {
    const result = await this.database.read();
    return result;
  }

  async createContainerIfNotExists(): Promise<ContainerResponse> {
    const result = await this.client
      .database(this.databaseId)
      .containers.createIfNotExists(
        { id: this.containerId, partitionKey: this.partitionKey },
        { offerThroughput: 400 }
      );
    return result;
  }

  async readContainer(): Promise<ContainerResponse> {
    const result = await this.container.read();
    return result;
  }

  /**
   * Query the container using SQL
   */
  async queryContainer(): Promise<FeedResponse<Bank>> {
    const querySpec = {
      query: 'SELECT VALUE r FROM root r WHERE r.id = @id',
      parameters: [
        {
          name: '@id',
          value: '2'
        }
      ]
    };

    const result = await this.container.items.query(querySpec).fetchAll();
    return result;
  }

  async createBank(bank: Bank): Promise<ItemResponse<Bank>> {
    const result = await this.container.items.upsert<Bank>(bank);
    return result;
  }

  async readBank(id: string): Promise<ItemResponse<Bank>> {
    const result = await this.container.item(id).read<Bank>();
    return result;
  }

  async replaceBank(bank: Bank): Promise<ItemResponse<ItemDefinition>> {
    const result = await this.container.item(bank.id).replace({ ...bank });
    return result;
  }

  async deleteBank(id: string): Promise<ItemResponse<ItemDefinition>> {
    const result = await this.container.item(id).delete();
    return result;
  }

  async fetchAllBanks(): Promise<FeedResponse<Bank[]>> {
    const querySpec = {
      query: "SELECT * FROM c WHERE c.type = 'bank' AND c.publishedDate != ''"
    };

    const result = this.container.items.query<Bank[]>(querySpec).fetchAll();
    return result;
  }

  async fetchAllProjects(): Promise<FeedResponse<Bank[]>> {
    const querySpec = {
      query:
        "SELECT * FROM c WHERE c.type='bank' AND (NOT IS_DEFINED(c.publishedDate) OR c.publishedDate = '')"
    };

    const result = this.container.items.query<Bank[]>(querySpec).fetchAll();
    return result;
  }
}

export default CosmosApi;
