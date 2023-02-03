import { Fetcher } from 'openapi-typescript-fetch';
import { useEffect, useState } from 'react';
import { createContainer } from 'unstated-next';
import useSWR from 'swr';
// import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

import { components, paths } from './generated';

// export const baseUrl  'https://krb-backend-api.azurewebsites.net',
// export const baseUrl = 'http://localhost:1080',
export const baseUrl = 'http://localhost:8080'; // Exported for use in tests

// export const setRefOnItem = <T extends { ref: string }>(item: T) => {
//   return { ...item, ref: uuidv4() };
// };

const fetcher = Fetcher.for<paths>();

fetcher.configure({
  baseUrl: baseUrl,

  // init: {
  //   headers: {
  //     ...
  // },
  // },
  // use: [...] // middlewares
});

type FetcherArg = RequestInfo | URL;
const swrFetcher = (...args: FetcherArg[]) =>
  fetch(baseUrl + args[0]).then((res) => res.json());

export type ProjectForm = components['schemas']['ProjectForm'];
export type CodelistForm = components['schemas']['CodelistForm'];
export type CodeForm = components['schemas']['CodeForm'];
export type NeedForm = components['schemas']['NeedForm'];
export type RequirementForm = components['schemas']['RequirementForm'];
export type RequirementVariantForm =
  components['schemas']['RequirementVariantForm'];
export type ProductForm = components['schemas']['ProductForm'];
export type PublicationForm = components['schemas']['PublicationForm'];

export const ProjectSchema = z.object({
  title: z
    .string()
    .min(
      1,
      'Project title to short TODO: temporary error mesage needs to be integrated with i18n '
    ),
  description: z.string(),
  ref: z.string(), // TODO: Validate UUID
});

export const NeedSchema = z.object({
  title: z
    .string()
    .min(
      1,
      'Need title too short TODO: temporary error mesage needs to be integrated with i18n '
    ),
  description: z.string(),
  ref: z.string(), // TODO: Validate UUID
});

export const RequirementSchema = z.object({
  title: z
    .string()
    .min(
      1,
      'Need title too short TODO: temporary error mesage needs to be integrated with i18n '
    ),
  description: z.string(),
  ref: z.string(), // TODO: Validate UUID
  needRef: z.string(), // TODO: Validate UUID
});

export const RequirementVariantFormSchema = z.object({
  ref: z.string(), // TODO: Validate UUID
  description: z
    .string()
    .min(
      1,
      'Need title too short TODO: temporary error mesage needs to be integrated with i18n '
    ),
  requirementText: z
    .string()
    .min(
      1,
      'Need title too short TODO: temporary error mesage needs to be integrated with i18n '
    ),
  instruction: z
    .string()
    .min(
      1,
      'Need title too short TODO: temporary error mesage needs to be integrated with i18n '
    ),
  useProduct: z.boolean(), // TODO: optional
  useSpecification: z.boolean(), // TODO: optional
  useQualification: z.boolean(), // TODO: optional
});

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

type Parentable = { parent: string };

// export type Codelist = Base<CodelistForm> & {};

// export type Code = Base<CodeForm> & {};

export type Need = Base<NeedForm> & Parentable;

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

export const findOneProject = fetcher
  .path('/api/v1/projects/{projectRef}')
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
    const findOneProjectFetcher = fetcher
      .path('/api/v1/projects/{projectRef}')
      .method('get')
      .create();

    setLoading(true);
    findOneProjectFetcher({ projectRef }).then(async (projectsResponse) => {
      setLoading(false);
      if (projectsResponse) {
        setProject(projectsResponse.data);
      }
    });
  }, [projectRef]);

  return { isLoading, project };
};

export const updateProject = fetcher
  .path('/api/v1/projects/{projectRef}')
  .method('put')
  .create();

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

export const createNeed = fetcher
  .path('/api/v1/projects/{projectRef}/needs')
  .method('post')
  .create();

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

export const updateNeed = fetcher
  .path('/api/v1/projects/{projectRef}/needs/{needRef}')
  .method('put')
  .create();

export const createRequirement = fetcher
  .path('/api/v1/projects/{projectRef}/requirements')
  .method('post')
  .create();

export const updateRequirement = fetcher
  .path('/api/v1/projects/{projectRef}/requirements/{requirementRef}')
  .method('put')
  .create();

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

export const deleteRequirement = fetcher
  .path('/api/v1/projects/{projectRef}/requirements/{requirementRef}')
  .method('delete')
  .create();

export const createRequirementVariant = fetcher
  .path(
    '/api/v1/projects/{projectRef}/requirements/{requirementRef}/requirementvariants'
  )
  .method('post')
  .create();

export const findRequirementVariants = fetcher
  .path(
    '/api/v1/projects/{projectRef}/requirements/{requirementRef}/requirementvariants'
  )
  .method('get')
  .create();

export const updateRequirementVariant = fetcher
  .path(
    '/api/v1/projects/{projectRef}/requirements/{requirementRef}/requirementvariants/{requirementVariantRef}'
  )
  .method('put')
  .create();

export const deleteRequirementVariant = fetcher
  .path(
    '/api/v1/projects/{projectRef}/requirements/{requirementRef}/requirementvariants/{requirementVariantRef}'
  )
  .method('delete')
  .create();

export const findProducts = fetcher
  .path('/api/v1/projects/{projectRef}/products')
  .method('get')
  .create();

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
