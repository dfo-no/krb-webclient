export const DATE_FORMAT_SHORT = 'dd.MM.yyyy';

export const DATETIME_FORMAT = 'dd.MM.yyyy H:s';

export const PAGE_SIZE = 100;

export const API_URL =
  process.env.NODE_ENV === 'development'
    ? 'https://krb-api-man-dev.azure-api.net'
    : 'https://krb-api-man.azure-api.net';

console.log(JSON.stringify(process.env));
console.log(API_URL);

/** The recommended format for DateTime strings in Azure Cosmos DB
 * is yyyy-MM-ddTHH:mm:ss.fffffffZ which follows the ISO 8601 UTC
 * standard. It is recommended to store all dates in
 * Azure Cosmos DB as UTC. Converting the date strings to this format
 *  will allow sorting dates lexicographically.
 * If non-UTC dates are stored, the logic must be handled at the client-side.
 * To convert a local DateTime to UTC, the offset must be known/stored
 * as a property in the JSON and the client can use the offset to compute
 * the UTC DateTime value. */
export const DATETIME_ISO8601UTC = "yyyy-MM-dd'T'HH:mm:ss.SSSSSSS'Z'";

export const DATETIME_ISO8601 = "yyyy-MM-dd'T'HH:mm:ss.SSSSSSS";
