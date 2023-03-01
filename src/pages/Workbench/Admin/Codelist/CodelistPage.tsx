import Box from '@mui/material/Box';
import makeStyles from '@mui/styles/makeStyles';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { CodelistForm, useFindCodelists } from '../../../../api/nexus2';
import { CodelistPanel } from './CodelistPanel';
import { CodePanel } from './CodePanel';
import LoaderSpinner from '../../../../common/LoaderSpinner';
import { searchCodelist } from '../../../../common/SearchUtils';
import { DFOSearchBar } from '../../../../components/DFOSearchBar/DFOSearchBar';
import { EditableProvider } from '../../../../components/EditableContext/EditableContext';
import {
  SearchContainer,
  SearchFieldContainer,
} from '../../../../components/SearchContainer/SearchContainer';
import { StandardContainer } from '../../../../components/StandardContainer/StandardContainer';
import { IRouteProjectParams } from '../../../../models/IRouteProjectParams';
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
  const {
    selectedCodelist,
    setSelectedCodelist,
    allCodelists,
    setAllCodelists,
  } = useSelectState();
  const classes = useStyles();
  const { t } = useTranslation();

  const { projectId } = useParams<IRouteProjectParams>();
  const { data: project } = useGetProjectQuery(projectId);
  const { isLoading, codelists: loadedCodelists } = useFindCodelists(projectId);

  useEffect(() => {
    if (loadedCodelists) {
      setAllCodelists(loadedCodelists); // TODO: Fix type mismatch after merge
      // setAllCodelists(loadedCodelists);
    }
  }, [setAllCodelists, loadedCodelists]);

  if (isLoading) {
    return <LoaderSpinner />;
  }

  if (!project || !loadedCodelists) {
    return <></>;
  }

  const searchFieldCallback = (result: CodelistForm[]) => {
    setAllCodelists(result);
  };

  const codelistSearch = (searchString: string, list: CodelistForm[]) => {
    return searchCodelist(list, searchString);
  };

  const showCodeContainer = () => {
    if (selectedCodelist) {
      return allCodelists.some((cl) => cl.ref === selectedCodelist.ref);
    }
    return false;
  };

  return (
    <StandardContainer>
      <SearchContainer>
        <SearchFieldContainer>
          <DFOSearchBar
            list={allCodelists}
            placeholder={t('Search for codelist')}
            callback={searchFieldCallback}
            searchFunction={codelistSearch}
          />
        </SearchFieldContainer>
      </SearchContainer>
      <Box className={classes.tableContainer}>
        <Box className={classes.codelistContainer}>
          <EditableProvider>
            <CodelistPanel projectRef={projectId} />
          </EditableProvider>
        </Box>
        <Box className={classes.codeContainer}>
          {showCodeContainer() && selectedCodelist && (
            <EditableProvider>
              <CodePanel
                projectRef={projectId}
                selectedCodelist={selectedCodelist}
                setSelectedCodelist={setSelectedCodelist}
              />
            </EditableProvider>
          )}
        </Box>
      </Box>
    </StandardContainer>
  );
}
