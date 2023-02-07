import Box from '@mui/material/Box';
import makeStyles from '@mui/styles/makeStyles';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { useFindCodelists } from '../../../../api/nexus2';
import LoaderSpinner from '../../../../common/LoaderSpinner';
import SearchUtils from '../../../../common/SearchUtils';
import { DFOSearchBar } from '../../../../components/DFOSearchBar/DFOSearchBar';
import { EditableProvider } from '../../../../components/EditableContext/EditableContext';
import {
  SearchContainer,
  SearchFieldContainer,
} from '../../../../components/SearchContainer/SearchContainer';
import { StandardContainer } from '../../../../components/StandardContainer/StandardContainer';
import { IRouteProjectParams } from '../../../../models/IRouteProjectParams';
import { ICodelist } from '../../../../Nexus/entities/ICodelist';
import CodelistPanel from './CodelistPanel';
import CodePanel from './CodePanel';
import { useSelectState } from './SelectContext';

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
  const { codelist, codelists, setCodelists } = useSelectState();
  const classes = useStyles();
  const { t } = useTranslation();

  const { projectId } = useParams<IRouteProjectParams>();
  const { isLoading, codelists: loadedCodelists } = useFindCodelists(projectId);

  useEffect(() => {
    if (loadedCodelists) {
      setCodelists(codelists);
    }
  }, [setCodelists, codelist, codelists, loadedCodelists]);

  if (isLoading) {
    return <LoaderSpinner />;
  }

  if (!loadedCodelists) {
    return <></>;
  }

  const searchFieldCallback = (result: ICodelist[]) => {
    setCodelists(result);
  };

  const codelistSearch = (searchString: string, list: ICodelist[]) => {
    return SearchUtils.searchCodelist(list, searchString);
  };

  const showCodeContainer = () => {
    if (codelist) {
      return codelists.some((cl) => cl.id === codelist.id);
    }
    return false;
  };

  return (
    <StandardContainer>
      <SearchContainer>
        <SearchFieldContainer>
          <DFOSearchBar
            list={codelists}
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
