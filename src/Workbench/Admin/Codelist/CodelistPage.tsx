import Box from '@mui/material/Box';
import makeStyles from '@mui/styles/makeStyles';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import LoaderSpinner from '../../../common/LoaderSpinner';
import DFOSearchBar from '../../../components/DFOSearchBar/DFOSearchBar';
import { ICodelist } from '../../../Nexus/entities/ICodelist';
import { useGetProjectQuery } from '../../../store/api/bankApi';
import { EditableProvider } from '../../Components/EditableContext';
import {
  SearchContainer,
  SearchFieldContainer
} from '../../Components/SearchContainer';
import { StandardContainer } from '../../Components/StandardContainer';
import { IRouteParams } from '../../Models/IRouteParams';
import CodelistPanel from './CodelistPanel';
import CodePanel from './CodePanel';
import { useSelectState } from './SelectContext';
import SearchUtils from '../../../common/SearchUtils';

const useStyles = makeStyles({
  tableContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    minHeight: 0,
    gap: 25
  },
  codelistContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 0 0',
    gap: 5
  },
  codeContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 0 0',
    gap: 5
  }
});

export default function CodeListPage(): React.ReactElement {
  const { codelist, codelists, setCodelists } = useSelectState();
  const classes = useStyles();
  const { t } = useTranslation();

  const { projectId } = useParams<IRouteParams>();
  const { data: project, isLoading } = useGetProjectQuery(projectId);

  useEffect(() => {
    if (project && project.codelist) {
      setCodelists(project.codelist);
    }
  }, [setCodelists, project]);

  if (isLoading) {
    return <LoaderSpinner />;
  }

  if (!project) {
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
