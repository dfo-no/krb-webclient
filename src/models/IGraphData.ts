/**
 * @see https://graph.microsoft.com/v1.0/$metadata#users/$entity
 * */

export interface IGraphData {
  graphData: {
    businessPhones: string[];
    displayName: string;
    givenName: string;
    id: string;
    jobTitle: string;
    mail: string;
    mobilePhone: string;
    officeLocation: string;
    preferredLanguage: string;
    surname: string;
    userPrincipalName: string;
  };
}
