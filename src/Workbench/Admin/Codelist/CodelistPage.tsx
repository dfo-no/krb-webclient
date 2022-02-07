import React, { useState } from 'react';
import { IProduct } from '../../../Nexus/entities/IProduct';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import CodeListSearchBar from './CodeListSearchBar';

import { Box } from '@mui/material/';
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import theme from '../../../theme';
import NewCodeListForm from './NewCodeListForm';
import Dialog from '../../../components/DFODialog/DFODialog';

const useStyles = makeStyles({
  codelistsContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 40,
    gap: 30,
    margin: 'auto',
    width: '60vw',
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 30
  },
  searchFieldButtonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    [theme.breakpoints.down('header')]: {
      flexDirection: 'column',
      gap: 20
    }
  },
  searchField: {
    width: '35vw',
    minWidth: 300,
    paddingRight: 10,
    [theme.breakpoints.down('xs')]: {
      alignSelf: 'center',
      minWidth: 400
    }
  },
  addCodelistButton: {
    alignContent: 'flex-end',
    backgroundColor: 'red',

    [theme.breakpoints.down('md')]: {
      alignSelf: 'center'
    }
  },
  codelists: {}
});

export default function CodeListPage(): React.ReactElement {
  const { project } = useAppSelector((state) => state.project);
  const dispatch = useAppDispatch();
  const [codelists, setCodelists] = useState<IProduct[]>([]);
  const [show, setShow] = useState(false);

  const searchFieldCallback = (result: IProduct[]) => {
    setCodelists(result);
  };

  const classes = useStyles();
  const { t } = useTranslation();

  console.log(codelists);

  return (
    <>
      <Box className={classes.codelistsContainer}>
        <Box className={classes.searchFieldButtonContainer}>
          <Box className={classes.searchField}>
            <CodeListSearchBar
              list={project.products}
              callback={searchFieldCallback}
            />
          </Box>
          <Box className={classes.addCodelistButton}>
            <Button
              variant="primary"
              onClick={() => {
                setShow(true);
              }}
            >
              {t('add new code')}
            </Button>
          </Box>
        </Box>

        <Dialog
          title={t('add new code')}
          isOpen={show}
          handleClose={() => setShow(false)}
          children={<NewCodeListForm handleClose={() => setShow(false)} />}
        />

        <Box className={classes.codelists}>{codelists}</Box>
      </Box>
    </>
  );
}
