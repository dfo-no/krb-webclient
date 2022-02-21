import { Box, Button } from '@mui/material/';
import makeStyles from '@mui/styles/makeStyles';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Dialog from '../../../components/DFODialog/DFODialog';
import DFOSearchBar from '../../../components/DFOSearchBar/DFOSearchBar';
import { ICodelist } from '../../../Nexus/entities/ICodelist';
import { useAppSelector } from '../../../store/hooks';
import theme from '../../../theme';
import CodeList from './CodeList';
import NewCodeListForm from './NewCodeListForm';

const useStyles = makeStyles({
  codelistsContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 40,
    gap: 30,
    margin: 'auto',
    width: '55.5vw',
    paddingBottom: 40
  },
  topContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    [theme.breakpoints.down('lg')]: {
      flexDirection: 'column',
      gap: 15
    }
  },
  searchBarContainer: {
    flex: 1,
    minWidth: 300,
    alignSelf: 'center'
  },
  addCodeButtonContainer: {
    flex: 1,
    alignSelf: 'center'
  },
  addCodeButton: {
    float: 'right',
    alignSelf: 'center'
  },
  codelists: {
    width: '100%',
    alignSelf: 'center',
    height: '100vh',
    [theme.breakpoints.down('md')]: {
      width: 400
    }
  }
});

export default function CodeListPage(): React.ReactElement {
  const { project } = useAppSelector((state) => state.project);

  const [codelist, setCodelist] = useState<ICodelist[]>([]);
  const [show, setShow] = useState(false);

  const searchFieldCallback = (result: ICodelist[]) => {
    setCodelist(result);
  };

  const classes = useStyles();
  const { t } = useTranslation();

  const codelistSearch = (searchString: string, list: ICodelist[]) => {
    return list
      .map((cl) => {
        if (cl.title.toLowerCase().includes(searchString.toLowerCase())) {
          return cl;
        }

        const newCodes = cl.codes.filter((c) => {
          return c.title.toLowerCase().includes(searchString.toLowerCase());
        });
        return { ...cl, codes: newCodes };
      })
      .filter((cl) => {
        return cl.codes.length !== 0;
      });
  };

  return (
    <>
      <Box className={classes.codelistsContainer}>
        <Box className={classes.topContainer}>
          <Box className={classes.searchBarContainer}>
            {' '}
            <DFOSearchBar
              list={project.codelist}
              label={t('search for codelist')}
              callback={searchFieldCallback}
              searchFunction={codelistSearch}
            />
          </Box>
          <Box className={classes.addCodeButtonContainer}>
            <Button
              className={classes.addCodeButton}
              variant="primary"
              onClick={() => {
                setShow(true);
              }}
            >
              {t('add new code')}
            </Button>
          </Box>
        </Box>

        <Box className={classes.codelists}>
          <CodeList list={codelist.length > 0 ? codelist : project.codelist} />
        </Box>

        <Dialog
          title={t('add new code')}
          isOpen={show}
          handleClose={() => setShow(false)}
          children={<NewCodeListForm handleClose={() => setShow(false)} />}
        />
      </Box>
    </>
  );
}
