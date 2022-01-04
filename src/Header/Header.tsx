import { makeStyles } from '@material-ui/core';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Link as RouterLink,
  useHistory,
  useRouteMatch
} from 'react-router-dom';
import ModelType from '../models/ModelType';
import SignedButton from '../SignedButton/SignedButton';
import { useAppDispatch } from '../store/hooks';
import { selectProject } from '../store/reducers/project-reducer';
import theme from '../theme';

const useStyles = makeStyles({
  logoBig: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  logoSmall: {
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  hideSignedButton: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  showSignedButton: {
    display: 'block'
  }
});

export default function Header(): React.ReactElement {
  const history = useHistory();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const match = useRouteMatch({
    path: '/workbench/:projectId',
    strict: false,
    sensitive: true
  });

  const classes = useStyles();

  const emptyProject = {
    id: '',
    title: '',
    description: '',
    needs: [],
    codelist: [],
    products: [],
    tags: [],
    publications: [],
    type: ModelType.bank,
    version: 0,
    inheritedBanks: [],
    publishedDate: null,
    sourceOriginal: null,
    sourceRel: null,
    projectId: null
  };

  return (
    <AppBar elevation={0}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Link
            className={classes.logoBig}
            component={RouterLink}
            to="/"
            onClick={() => {
              dispatch(selectProject(emptyProject));
            }}
          >
            <img
              src="/logo-blue.svg"
              alt="DFØ logo header big"
              width="263.06"
              height="38"
            />
          </Link>
          <Link
            className={classes.logoSmall}
            component={RouterLink}
            to="/"
            onClick={() => {
              dispatch(selectProject(emptyProject));
            }}
          >
            <img
              src="/logo-blue-small.svg"
              alt="DFØ logo header small"
              width="61.408165"
              height="30.729862"
            />
          </Link>
        </Box>

        {match && (
          <Box mx={1}>
            <Button
              variant="primary"
              onClick={() => {
                history.push('/workbench');
                dispatch(selectProject(emptyProject));
              }}
            >
              {t('all projects')}
            </Button>
          </Box>
        )}
        <Box
          className={`${
            match ? classes.hideSignedButton : classes.showSignedButton
          }`}
        >
          <SignedButton />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
