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
      'AccountEndpoint=https://krb-cosmos-server-dev.documents.azure.com:443/;AccountKey=2anVhbxREcjzYFcG1eHldQAd8vJveJ0AYuxUHkVSsQrs7GmHj5rP2HXHRGpFjDTP2xGWgeaYygTbWLp68rJGsg=='
    );
    this.database = this.client.database(this.databaseId);
    this.container = this.database.container(this.containerId);
  }

  async createDatabaseIfNotExists(): Promise<DatabaseResponse> {
    return this.client.databases.createIfNotExists({
      id: this.databaseId
    });
  }

  /**
   * Read the database definition
   */
  async readDatabase(): Promise<DatabaseResponse> {
    return this.database.read();
  }

  async createContainerIfNotExists(): Promise<ContainerResponse> {
    return this.client
      .database(this.databaseId)
      .containers.createIfNotExists(
        { id: this.containerId, partitionKey: this.partitionKey },
        { offerThroughput: 400 }
      );
  }

  async readContainer(): Promise<ContainerResponse> {
    return this.container.read();
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

    return this.container.items.query(querySpec).fetchAll();
  }

  async createBank(bank: Bank): Promise<ItemResponse<Bank>> {
    return this.container.items.upsert<Bank>(bank);
  }

  async readBank(id: string): Promise<ItemResponse<Bank>> {
    return this.container.item(id).read<Bank>();
  }

  async replaceBank(bank: Bank): Promise<ItemResponse<ItemDefinition>> {
    return this.container.item(bank.id).replace({ ...bank });
  }

  async deleteBank(id: string): Promise<ItemResponse<ItemDefinition>> {
    return this.container.item(id).delete();
  }

  async fetchAllBanks(): Promise<FeedResponse<Bank[]>> {
    const querySpec = {
      query: "SELECT * FROM c WHERE c.type = 'bank' AND c.publishedDate != ''"
    };

    return this.container.items.query<Bank[]>(querySpec).fetchAll();
  }

  async fetchAllProjects(): Promise<FeedResponse<Bank[]>> {
    const querySpec = {
      query:
        "SELECT * FROM c WHERE c.type='bank' AND (NOT IS_DEFINED(c.publishedDate) OR c.publishedDate = '')"
    };

    return this.container.items.query<Bank[]>(querySpec).fetchAll();
  }
}

export default CosmosApi;
