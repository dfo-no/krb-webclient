import { Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useEffect, useState } from 'react';
import { Route, useParams } from 'react-router-dom';
import LoaderSpinner from '../common/LoaderSpinner';
import { useAppDispatch } from '../store/hooks';
import { getProjectThunk } from '../store/reducers/project-reducer';
import theme from '../theme';
import AdminGuard from './Admin/AdminGuard';
import Create from './Create/Create';
import { SelectProvider } from './Create/SelectContext';
import Preview from './Preview/Preview';

interface IRouteParams {
  projectId: string;
}

const useStyles = makeStyles({
  projectContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',

    [theme.breakpoints.down('md')]: {
      flexWrap: 'wrap'
    }
  },
  wrapperContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#80ADC8',
    height: '100%',

    [theme.breakpoints.down('md')]: {
      flexWrap: 'wrap'
    }
  }
});

export default function ProjectGuard(): React.ReactElement {
  const dispatch = useAppDispatch();

  const [isLoading, setLoading] = useState(false);
  const classes = useStyles();

  const { projectId } = useParams<IRouteParams>();

  useEffect(() => {
    async function doAsyncWork() {
      if (projectId) {
        setLoading(true);
        dispatch(getProjectThunk(projectId)).then(() => {
          setLoading(false);
        });
      }
    }
    doAsyncWork();
  }, [dispatch, projectId]);

  if (isLoading) {
    return <LoaderSpinner variant="danger" />;
  }

  return (
    <Box className={classes.projectContainer}>
      <Box className={classes.wrapperContainer}>
        <Route path="/workbench/:projectId/admin">
          <AdminGuard />
        </Route>
        <Route path="/workbench/:projectId/create">
          <SelectProvider>
            <Create />
          </SelectProvider>
        </Route>
        <Route path="/workbench/:projectId/preview">
          <Preview />
        </Route>
      </Box>
    </Box>
  );
}
