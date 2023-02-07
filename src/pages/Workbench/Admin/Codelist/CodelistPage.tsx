import Box from '@mui/material/Box';
import makeStyles from '@mui/styles/makeStyles';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import CodelistPanel from './CodelistPanel';
import CodePanel from './CodePanel';
import DFOSearchBar from '../../../../components/DFOSearchBar/DFOSearchBar';
import LoaderSpinner from '../../../../common/LoaderSpinner';
import SearchUtils from '../../../../common/SearchUtils';
import { EditableProvider } from '../../../../components/EditableContext/EditableContext';
import { ICodelist } from '../../../../Nexus/entities/ICodelist';
import { IRouteProjectParams } from '../../../../models/IRouteProjectParams';
import {
  SearchContainer,
  SearchFieldContainer,
} from '../../../../components/SearchContainer/SearchContainer';
import { StandardContainer } from '../../../../components/StandardContainer/StandardContainer';
import { useSelectState } from './SelectContext';
import { useGetProjectQuery } from '../../../../store/api/bankApi';

const useStyles = makeStyles({
  tableContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    minHeight: 0,
    gap: 25,
  },
  codelistContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 0 0',
    gap: 5,
  },
  codeContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 0 0',
    gap: 5,
  },
});

export default function CodeListPage(): React.ReactElement {
  const { selectedCodelist, allCodelists, setAllCodelists } = useSelectState();
  const classes = useStyles();
  const { t } = useTranslation();

  const { projectId } = useParams<IRouteProjectParams>();
  const { data: project, isLoading } = useGetProjectQuery(projectId);

  useEffect(() => {
    if (project && project.codelist) {
      setAllCodelists(project.codelist);
    }
  }, [setAllCodelists, project]);

  if (isLoading) {
    return <LoaderSpinner />;
  }

  if (!project) {
    return <></>;
  }

  const searchFieldCallback = (result: ICodelist[]) => {
    setAllCodelists(result);
  };

  const codelistSearch = (searchString: string, list: ICodelist[]) => {
    return SearchUtils.searchCodelist(list, searchString);
  };

  const showCodeContainer = () => {
    if (selectedCodelist) {
      return allCodelists.some((cl) => cl.id === selectedCodelist.id);
    }
    return false;
  };

  return (
    <StandardContainer>
      <SearchContainer>
        <SearchFieldContainer>
          <DFOSearchBar
            list={project.codelist}
            placeholder={t('Search for codelist')}
            callback={searchFieldCallback}
            searchFunction={codelistSearch}
          />
        </SearchFieldContainer>
      </SearchContainer>
      <Box className={classes.tableContainer}>
        <Box className={classes.codelistContainer}>
          <EditableProvider>
            <CodelistPanel />
          </EditableProvider>
        </Box>
        <Box className={classes.codeContainer}>
          {showCodeContainer() && (
            <EditableProvider>
              <CodePanel />
            </EditableProvider>
          )}
        </Box>
      </Box>
    </StandardContainer>
  );
}
