import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material/';
import makeStyles from '@mui/styles/makeStyles';
import { ICodelist } from '../../../Nexus/entities/ICodelist';
import DFOSearchBar from '../../../components/DFOSearchBar/DFOSearchBar';
import CodePanel from './CodePanel';
import CodelistPanel from './CodelistPanel';
import { useSelectState } from './SelectContext';
import { EditableProvider } from '../../Components/EditableContext';
import {
  SearchContainer,
  SearchFieldContainer
} from '../../Components/SearchContainer';
import { useParams } from 'react-router-dom';
import { IRouteParams } from '../../Models/IRouteParams';
import { useGetProjectQuery } from '../../../store/api/bankApi';
import LoaderSpinner from '../../../common/LoaderSpinner';
import { StandardContainer } from '../../Components/StandardContainer';

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
    width: '40%',
    gap: 5
  },
  codeContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '40%',
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
    // Filters only codelist with match in title or with code with match in title
    return list.filter((aCodelist) => {
      if (aCodelist.title.toLowerCase().includes(searchString.toLowerCase())) {
        return true;
      }

      return aCodelist.codes.some((code) => {
        return code.title.toLowerCase().includes(searchString.toLowerCase());
      });
    });
  };

  const showCodeContainer = () => {
    if (codelist) {
      return codelists.some((cl) => cl.id === codelist.id);
    }
    return false;
  };

  return (
    <StandardContainer sx={{ width: '75.5vw' }}>
      <SearchContainer>
        <SearchFieldContainer>
          {' '}
          <DFOSearchBar
            list={project.codelist}
            label={t('search for codelist')}
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
        {showCodeContainer() && (
          <Box className={classes.codeContainer}>
            <EditableProvider>
              <CodePanel />
            </EditableProvider>
          </Box>
        )}
      </Box>
    </StandardContainer>
  );
}
