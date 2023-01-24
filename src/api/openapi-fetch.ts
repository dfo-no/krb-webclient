import { Fetcher } from 'openapi-typescript-fetch';
import { useEffect, useState } from 'react';

import { components, paths } from './generated';

const fetcher = Fetcher.for<paths>();

fetcher.configure({
  baseUrl: 'https://krb-backend-api.azurewebsites.net',
  // baseUrl: 'http://localhost:8080',

  // init: {
  //   headers: {
  //     ...
  // },
  // },
  // use: [...] // middlewares
});

export type ProjectForm = components['schemas']['ProjectForm'];
export type Codelist = components['schemas']['CodelistForm'];
export type Need = components['schemas']['NeedForm'];
export type Requirement = components['schemas']['RequirementForm'];
export type PublicationForm = components['schemas']['PublicationForm'];

export const createProject = fetcher
  .path('/api/v1/projects')
  .method('post')
  .create();

export const findProjects = fetcher
  .path('/api/v1/projects')
  .method('get')
  .create();

export const useFindOneProject = (projectRef: string) => {
  const [isLoading, setLoading] = useState(false);
  const [project, setProject] = useState<ProjectForm>();

  useEffect(() => {
    const findOneProject = fetcher
      .path('/api/v1/projects/{projectRef}')
      .method('get')
      .create();

    setLoading(true);
    findOneProject({ projectRef }).then(async (projectsResponse) => {
      setLoading(false);
      if (projectsResponse) {
        setProject(projectsResponse.data);
      }
    });
  }, [projectRef]);

  return { isLoading, project };
};

export const deleteProject = fetcher
  .path('/api/v1/projects/{projectRef}')
  .method('delete')
  .create();

export const useFindCodelists = (projectRef: string) => {
  const [isLoading, setLoading] = useState(false);
  const [codelists, setCodelists] = useState<Codelist[]>();

  useEffect(() => {
    const findCodelists = fetcher
      .path('/api/v1/projects/{projectRef}/codelists')
      .method('get')
      .create();

    setLoading(true);
    findCodelists({ projectRef }).then(async (projectsResponse) => {
      setLoading(false);
      if (projectsResponse) {
        setCodelists(projectsResponse.data);
      }
    });
  }, [projectRef]);

  return { isLoading, codelists };
};

export const useFindNeeds = (projectRef: string) => {
  const [isLoading, setLoading] = useState(false);
  const [needs, setNeeds] = useState<Need[]>();

  useEffect(() => {
    const findCodelists = fetcher
      .path('/api/v1/projects/{projectRef}/needs')
      .method('get')
      .create();

    setLoading(true);
    findCodelists({ projectRef }).then(async (projectsResponse) => {
      setLoading(false);
      if (projectsResponse) {
        setNeeds(projectsResponse.data);
      }
    });
  }, [projectRef]);

  return { isLoading, needs };
};

export const useFindRequirementsForProject = (projectRef: string) => {
  const [isLoading, setLoading] = useState(false);
  const [requirements, setRequirements] = useState<Requirement[]>();

  useEffect(() => {
    const findCodelists = fetcher
      .path('/api/v1/projects/{projectRef}/requirements')
      .method('get')
      .create();

    setLoading(true);
    findCodelists({ projectRef: projectRef }).then(async (projectsResponse) => {
      setLoading(false);
      if (projectsResponse) {
        setRequirements(projectsResponse.data);
      }
    });
  }, [projectRef]);

  return { isLoading, requirements };
};

export const findPublications = fetcher
  .path('/api/v1/projects/{projectref}/publications')
  .method('get')
  .create();
