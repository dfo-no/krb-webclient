import { Box } from '@mui/material/';
import { Button } from '@mui/material/';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { RouteComponentProps, withRouter } from 'react-router';
import { useAppSelector } from '../../store/hooks';

const useStyles = makeStyles({
  specSideBar: {
    display: 'flex',
    width: '30vw',
    height: '100vh'
  },
  topContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    paddingTop: 20,
    paddingRight: 30
  }
});

function SpecSideBar({ match }: RouteComponentProps): React.ReactElement {
  const { t } = useTranslation();
  const { spec } = useAppSelector((state) => state.specification);

  const classes = useStyles();

  return (
    <Box className={classes.specSideBar}>
      <Box className={classes.topContainer}>
        <Button variant="primary">Lag et nytt produkt</Button>
      </Box>
    </Box>
  );
}

export default withRouter(SpecSideBar);
