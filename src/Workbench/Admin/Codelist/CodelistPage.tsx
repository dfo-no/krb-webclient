import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material/';
import makeStyles from '@mui/styles/makeStyles';
import { useAppSelector } from '../../../store/hooks';
import { ICodelist } from '../../../Nexus/entities/ICodelist';
import DFOSearchBar from '../../../components/DFOSearchBar/DFOSearchBar';
import CodePanel from './CodePanel';
import CodelistPanel from './CodelistPanel';
import { useSelectState } from './SelectContext';
import { EditableProvider } from '../../Components/EditableContext';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 40,
    width: '75.5vw',
    gap: 10,
    margin: 'auto',
    paddingBottom: 40
  },
  tableContainer: {
    display: 'flex',
    flexDirection: 'row',
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
  },
  searchBarContainer: {
    width: 300
  }
});

export default function CodeListPage(): React.ReactElement {
  const { project } = useAppSelector((state) => state.project);
  const { codelist, codelists, setCodelists } = useSelectState();

  const classes = useStyles();
  const { t } = useTranslation();

  // TODO: Hack som kan løses med RTK Query
  useEffect(() => {
    setCodelists(project.codelist);
  }, [setCodelists, project.codelist]);

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
    <Box className={classes.root}>
      <Box className={classes.searchBarContainer}>
        {' '}
        <DFOSearchBar
          list={project.codelist}
          label={t('search for codelist')}
          callback={searchFieldCallback}
          searchFunction={codelistSearch}
        />
      </Box>
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
    </Box>
  );
}
