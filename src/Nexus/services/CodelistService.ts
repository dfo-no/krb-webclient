import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { CodeForm, CodelistForm, fetcher } from '../../api/nexus2';

export default class CodelistService {
  defaultCodelistValues: CodelistForm = {
    ref: uuidv4(),
    title: '',
    description: '',
    codes: [],
    serializedCodes: '',
  };

  defaultCodeValues: CodeForm = {
    ref: uuidv4(),
    title: '',
    description: '',
  };

  findCodelists = fetcher
    .path('/api/v1/projects/{projectRef}/codelists')
    .method('get')
    .create();

  useFindCodelists = (projectRef: string) => {
    const [isLoading, setLoading] = useState(false);
    const [codelists, setCodelists] = useState<CodelistForm[]>();

    useEffect(() => {
      setLoading(true);
      this.findCodelists({ projectRef }).then(async (projectsResponse) => {
        setLoading(false);
        if (projectsResponse) {
          setCodelists(projectsResponse.data);
        }
      });
    }, [projectRef]);

    return { isLoading, codelists };
  };

  useFindOneCodelist = (projectRef: string, codelistRef: string) => {
    const [isLoading, setLoading] = useState(false);
    const [codelist, setCodelist] = useState<CodelistForm>();

    useEffect(() => {
      const findCodelist = fetcher
        .path('/api/v1/projects/{projectRef}/codelists/{codelistRef}')
        .method('get')
        .create();

      setLoading(true);
      findCodelist({ projectRef, codelistRef }).then(
        async (projectsResponse) => {
          setLoading(false);
          if (projectsResponse) {
            setCodelist(projectsResponse.data);
          }
        }
      );
    }, [projectRef, codelistRef]);

    return { isLoading, codelist };
  };

  createCodelist = fetcher
    .path('/api/v1/projects/{projectRef}/codelists')
    .method('post')
    .create();

  updateCodelist = fetcher
    .path('/api/v1/projects/{projectRef}/codelists/{codelistRef}')
    .method('put')
    .create();

  deleteCodelist = fetcher
    .path('/api/v1/projects/{projectRef}/codelists/{codelistRef}')
    .method('delete')
    .create();
}
