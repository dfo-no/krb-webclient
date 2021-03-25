import { Configuration, PopupRequest } from '@azure/msal-browser';
import Utils from '../common/Utils';

// Config object to be passed to Msal on creation
export const msalConfig: Configuration = {
  auth: {
    clientId: Utils.ensure(process.env.REACT_APP_CLIENTID),
    redirectUri: window.location.origin,
    postLogoutRedirectUri: window.location.origin
  }
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest: PopupRequest = {
  scopes: ['User.Read']
};

export const graphConfig = {
  graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me'
};
