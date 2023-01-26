import { Fetcher, TypedFetch, FetchArgType } from 'openapi-typescript-fetch';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

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
type FetcherArg = RequestInfo | URL;
const swrFetcher = (...args: FetcherArg[]) =>
  fetch(args[0]).then((res) => res.json());

export type ProjectForm = components['schemas']['ProjectForm'];
export type Codelist = components['schemas']['CodelistForm'];
export type Code = components['schemas']['CodeForm'];
export type Need = components['schemas']['NeedForm'];
export type Requirement = components['schemas']['RequirementForm'];
export type RequirementVariant =
  components['schemas']['RequirementVariantForm'];
export type Product = components['schemas']['ProductForm'];
export type PublicationForm = components['schemas']['PublicationForm'];

export const createProject = fetcher
  .path('/api/v1/projects')
  .method('post')
  .create();

export const findProjects = fetcher
  .path('/api/v1/projects')
  .method('get')
  .create();

/**
 * The function below is just a shortened version of this:
 *
 *  export function useProject(ref: string) {
 *    const findOneProject = fetcher
 *      .path('/api/v1/projects/{projectRef}')
 *      .method('get')
 *      .create();
 *
 *    const { data, error, isLoading } = useSWR(`/api/user/${ref}`, findOneProject);
 *
 *    return {
 *      user: data,
 *      isLoading,
 *      isError: error,
 *    };
 *  }
 */
// export const useProject = (ref: string) => {
//   const f1 = fetcher
//     .path('/api/v1/projects/{projectRef}')
//     .method('get')
//     .create();

//   // const f2 = <T>(fn: TypedFetch<T>): TypedFetch<T> => {
//   //   type X = FetchArgType<typeof fn>;
//   //   const f3 = (d: X) => {
//   //     return d;
//   //   };

//   //   return f3(fn);
//   // };

//   const get = async (projectRef: string) => {
//     return f1({ projectRef }).then((tempResult) => {
//       return {
//         ...tempResult,
//         data: tempResult?.data,
//       };
//     });
//   };

//   const { data, error, isLoading } = useSWR(`/api/user/${ref}`, get);
//   return {
//     project: data?.data,
//     isLoading,
//     isError: error,
//   };
// };

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

export const usePutProject = (projectRef: string) => {
  const [isLoading, setLoading] = useState(false);
  const [project, setProject] = useState<ProjectForm>();

  const putProject = fetcher
    .path('/api/v1/projects/{projectRef}')
    .method('put')
    .create();
  // useEffect(() => {
  // }, [projectRef]);

  return {
    putProject: (updatedProject: ProjectForm) => {
      setLoading(true);
      return putProject({ projectRef, ...updatedProject }).then(
        (projectsResponse) => {
          setLoading(false);
          setProject(projectsResponse.data);
          return { data: projectsResponse.data };
        }
      );
    },
    isLoading,
    project,
  };
};

export const useDeleteProject = (projectRef: string) => {
  const [isLoading, setLoading] = useState(false);
  // const [project, setProject] = useState<ProjectForm>();

  const deleteProject = fetcher
    .path('/api/v1/projects/{projectRef}')
    .method('delete')
    .create();

  return {
    deleteProject: (updatedProject: ProjectForm) => {
      // TODO: Is this correct?
      setLoading(true);
      return deleteProject({ projectRef }).then((/* projectsResponse */) => {
        setLoading(false);
        // setProject(projectsResponse.data);
        return { data: updatedProject };
      });
    },
    isLoading,
    // project,
  };
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

// export const useFindNeeds = (projectRef: string) => {
//   const [isLoading, setLoading] = useState(false);
//   const [needs, setNeeds] = useState<Need[]>();

//   useEffect(() => {
//     const findCodelists = fetcher
//       .path('/api/v1/projects/{projectRef}/needs')
//       .method('get')
//       .create();

//     setLoading(true);
//     findCodelists({ projectRef }).then(async (projectsResponse) => {
//       setLoading(false);
//       if (projectsResponse) {
//         setNeeds(projectsResponse.data);
//       }
//     });
//   }, [projectRef]);

//   return { isLoading, needs };
// };

export const useNeeds = (ref: string) => {
  const { data, error, isLoading } = useSWR<Need[], never>(
    `/api/v1/projects/${ref}/needs`,
    swrFetcher
  );

  return {
    needs: data,
    isLoading,
    isError: error,
  };
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

export const usePostProduct = (projectRef: string) => {
  const [isLoading, setLoading] = useState(false);
  const [product, setProduct] = useState<unknown>(); // TODO: Update backend

  const postProduct = fetcher
    .path('/api/v1/projects/{projectRef}/products')
    .method('post')
    .create();

  return {
    postProduct: (updatedProject: Product) => {
      setLoading(true);
      return postProduct({ projectRef, ...updatedProject }).then(
        (projectsResponse) => {
          setLoading(false);
          setProduct(projectsResponse.data);
          return { data: projectsResponse.data };
        }
      );
    },
    isLoading,
    product,
  };
};

export const findPublications = fetcher
  .path('/api/v1/projects/{projectref}/publications')
  .method('get')
  .create();
