import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { Box, Typography } from '@mui/material';
import { DFOCardHeaderIconButton } from '../../../components/DFOCard/DFOCardHeaderIconButton';
import EditIcon from '@mui/icons-material/Edit';
import { DFOCardHeader } from '../../../components/DFOCard/DFOCardHeader';
import { useProjectEditingState } from './ProjectEditingContext';
import { useParams } from 'react-router-dom';
import { useGetProjectQuery } from '../../../store/api/bankApi';
import { IRouteParams } from '../../Models/IRouteParams';

const useStyles = makeStyles({
  headerContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: 15,
    paddingLeft: 70,
    paddingRight: 70
  }
});

function ProjectHeader(): React.ReactElement {
  const classes = useStyles();
  const { setEditing } = useProjectEditingState();
  const { projectId } = useParams<IRouteParams>();
  const { data: project } = useGetProjectQuery(projectId);

  if (!project) {
    return <></>;
  }

  return (
    <DFOCardHeader>
      <Box className={classes.headerContainer}>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Typography variant="big">{project.title}</Typography>
          <DFOCardHeaderIconButton
            sx={{ marginLeft: 'auto' }}
            onClick={() => setEditing(true)}
          >
            <EditIcon />
          </DFOCardHeaderIconButton>
        </Box>
        <Typography
          variant="small"
          sx={{ borderTop: '1px solid', paddingTop: 1 }}
        >
          {project.description}
        </Typography>
      </Box>
    </DFOCardHeader>
  );
}

export default ProjectHeader;
