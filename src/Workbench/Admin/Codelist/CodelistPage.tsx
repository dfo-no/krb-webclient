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

  useEffect(() => {
    setCodelists(project.codelist);
  }, [setCodelists, project.codelist]);

  const searchFieldCallback = (result: ICodelist[]) => {
    setCodelists(result);
  };

  const codelistSearch = (searchString: string, list: ICodelist[]) => {
    return list
      .map((cl) => {
        if (cl.title.toLowerCase().includes(searchString.toLowerCase())) {
          return { ...cl, inSearch: true };
        }

        const newCodes = cl.codes.filter((c) => {
          return c.title.toLowerCase().includes(searchString.toLowerCase());
        });

        if (newCodes.length === 0) {
          return { ...cl, inSearch: false };
        }
        return { ...cl, codes: newCodes, inSearch: true };
      })
      .filter((cl) => {
        return cl.inSearch;
      })
      .map((cl) => {
        return cl as ICodelist;
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
          <CodelistPanel />
        </Box>
        {showCodeContainer() && (
          <Box className={classes.codeContainer}>
            <CodePanel />
          </Box>
        )}
      </Box>
    </Box>
  );
}
