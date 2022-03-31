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
            placeholder={t('search for codelist')}
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
