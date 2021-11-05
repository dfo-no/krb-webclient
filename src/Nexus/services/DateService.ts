/** The recommended format for DateTime strings in Azure Cosmos DB
 * is yyyy-MM-ddTHH:mm:ss.fffffffZ which follows the ISO 8601 UTC
 * standard. It is recommended to store all dates in
 * Azure Cosmos DB as UTC. Converting the date strings to this format
 *  will allow sorting dates lexicographically.
 * If non-UTC dates are stored, the logic must be handled at the client-side.
 * To convert a local DateTime to UTC, the offset must be known/stored
 * as a property in the JSON and the client can use the offset to compute
 * the UTC DateTime value. */

/** CosmosDB will work with JS iso8601 standard format when comparing dates also
 *  SELECT ("2020-12-20T18:00:00.0002Z" > "2020-12-20T18:00:00.000Z") AS ComparisonResult will result in FALSE
 *  SELECT ("2020-12-20T18:00:00.000Z" > "2020-12-20T18:00:00.0002Z") AS ComparisonResult will result in TRUE
 */
export default class DateService {
  static getNowString(): string {
    const now = new Date();
    return now.toISOString();
  }
}
