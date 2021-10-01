import { format } from 'date-fns';

export default class DateService {
  /** The recommended format for DateTime strings in Azure Cosmos DB
   * is yyyy-MM-ddTHH:mm:ss.fffffffZ which follows the ISO 8601 UTC
   * standard. It is recommended to store all dates in
   * Azure Cosmos DB as UTC. Converting the date strings to this format
   *  will allow sorting dates lexicographically.
   * If non-UTC dates are stored, the logic must be handled at the client-side.
   * To convert a local DateTime to UTC, the offset must be known/stored
   * as a property in the JSON and the client can use the offset to compute
   * the UTC DateTime value. */
  DATETIME_ISO8601UTC = "yyyy-MM-dd'T'HH:mm:ss.SSSSSSS'Z'";

  getDate(): string {
    return format(new Date(), this.DATETIME_ISO8601UTC);
  }
}
