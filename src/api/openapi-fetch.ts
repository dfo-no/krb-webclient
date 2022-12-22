import { Fetcher } from 'openapi-typescript-fetch';

import { components, paths } from './generated';

const fetcher = Fetcher.for<paths>();

fetcher.configure({
  // baseUrl: 'https://krb-backend-api.azurewebsites.net',
  baseUrl: 'http://localhost:8080',

  // init: {
  //   headers: {
  //     ...
  // },
  // },
  // use: [...] // middlewares
});

export type ProjectForm = components['schemas']['ProjectForm'];

export const createProject = fetcher
  .path('/api/v1/projects')
  .method('post')
  .create();

export const findProjects = fetcher
  .path('/api/v1/projects')
  .method('get')
  .create();

export const deleteProject = fetcher
  .path('/api/v1/projects/{projectRef}')
  .method('delete')
  .create();
