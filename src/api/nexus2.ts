import { Fetcher } from 'openapi-typescript-fetch';
import { useEffect, useState } from 'react';
import { createContainer } from 'unstated-next';
import useSWR from 'swr';

import { components, paths } from './generated';

const fetcher = Fetcher.for<paths>();

fetcher.configure({
  // baseUrl: 'https://krb-backend-api.azurewebsites.net',
  baseUrl: 'http://localhost:8080',
  // baseUrl: 'http://localhost:1080',

  // init: {
  //   headers: {
  //     ...
  // },
  // },
  // use: [...] // middlewares
});

type FetcherArg = RequestInfo | URL;
const swrFetcher = (...args: FetcherArg[]) =>
  fetch('http://localhost:8080' + args[0]).then((res) => res.json());

export type ProjectForm = components['schemas']['ProjectForm'];
export type CodelistForm = components['schemas']['CodelistForm'];
export type CodeForm = components['schemas']['CodeForm'];
export type NeedForm = components['schemas']['NeedForm'];
export type RequirementForm = components['schemas']['RequirementForm'];
export type RequirementVariantForm =
  components['schemas']['RequirementVariantForm'];
export type ProductForm = components['schemas']['ProductForm'];
export type PublicationForm = components['schemas']['PublicationForm'];

// interface Base<T> {
//   [key: string]: keyof T;
// }

// export class Project implements Base<ProjectForm> {
//   [index: keyof NeedForm]: string;
// }

// export class Codelist implements Base<CodelistForm> {
//   [index: keyof CodelistForm]: string;
// }

// export class Need implements Base<NeedForm> {
//   [index: keyof NeedForm]: string;
// }

// export class Need implements Base<NeedForm> {
//   [index: keyof NeedForm]: string;
// }

// export class Need implements Base<NeedForm> {
//   [index: keyof NeedForm]: string;
// }

type Base<T> = {
  [Properties in keyof T]: T[Properties];
};

// export type Codelist = Base<CodelistForm> & {};

// export type Code = Base<CodeForm> & {};

// export type Need = Base<NeedForm> & {};

// export type Requirement = Base<RequirementForm> & {};

const useHeader = () => {
  const [title, setTitle] = useState('');
  const [isProject, setIsProject] = useState(false);
  return {
    title,
    setTitle,
    isProject,
    setIsProject,
  };
};

export const HeaderContainer = createContainer(useHeader);

export const createProject = fetcher
  .path('/api/v1/projects')
  .method('post')
  .create();

export const findProjects = fetcher
  .path('/api/v1/projects')
  .method('get')
  .create();

export const useProject = (ref: string) => {
  const { data, error, isLoading } = useSWR<ProjectForm, never>(
    `/api/v1/projects/${ref}`,
    swrFetcher
  );

  return {
    project: data,
    isLoading,
    isError: error,
  };
};

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
  const [codelists, setCodelists] = useState<CodelistForm[]>();

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

export const useNeeds = (ref: string) => {
  const { data, error, isLoading } = useSWR<NeedForm[], never>(
    `/api/v1/projects/${ref}/needs`,
    swrFetcher
  );

  return {
    needs: data,
    isLoading,
    isError: error,
  };
};

export const useFindNeeds = (projectRef: string) => {
  const [isLoading, setLoading] = useState(false);
  const [needs, setNeeds] = useState<NeedForm[]>();

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
  const [requirements, setRequirements] = useState<RequirementForm[]>();

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
export class Project implements Base<ProjectForm> {
  title: string;

  description: string;

  ref: string;

  getNeeds: () => {
    needs: { ref: string; title: string; description: string }[] | undefined;
    isLoading: boolean;
    isError: undefined;
  };

  constructor(projectForm: ProjectForm) {
    this.title = projectForm.title;
    this.description = projectForm.description;
    this.ref = projectForm.ref;
    this.getNeeds = useNeeds.bind(null, projectForm.ref);
  }
}
