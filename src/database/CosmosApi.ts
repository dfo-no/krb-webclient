/* eslint-disable no-underscore-dangle */
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

  /**
   * Scale a container
   * You can scale the throughput (RU/s) of your container up and down to meet the needs of the workload. Learn more: https://aka.ms/cosmos-request-units
   */
  /* async scaleContainer() {
    const { resource: containerDefinition } = await this.client
      .database(this.databaseId)
      .container(this.containerId)
      .read();
    const { resources: offers } = await this.client.offers.readAll().fetchAll();

    const newRups = 500;

    for (let index = 0; index < offers.length; index += 1) {
      const offer = offers[index];
      if (containerDefinition._rid !== offer.offerResourceId) {
        continue;
      }
      offer.content.offerThroughput = newRups;
      const offerToReplace = client.offer(offer.id);
      await offerToReplace.replace(offer);
      // console.log(`Updated offer to ${newRups} RU/s\n`);
      break;
    }
  } */
}

export default CosmosApi;
