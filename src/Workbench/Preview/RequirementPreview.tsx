import React from 'react';
import { Box, Typography } from '@mui/material';
import theme from '../../theme';
import { useParams } from 'react-router-dom';
import { IRouteParams } from '../Models/IRouteParams';
import { useGetProjectQuery } from '../../store/api/bankApi';
import { IRequirement } from '../../Nexus/entities/IRequirement';
import VariantPreview from './VariantPreview';
import { useVariantState } from '../Components/VariantContext';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles({
  card: {
    backgroundColor: theme.palette.white.main,
    display: 'flex',
    flexDirection: 'column',
    color: theme.palette.black.main,
    padding: 16,
    paddingLeft: 32,
    paddingRight: 32,
    margin: 32
  },
  active: {
    border: `2px solid ${theme.palette.secondary.main}`,
    borderTop: `12px solid ${theme.palette.secondary.main}`
  }
});

interface IProps {
  requirement: IRequirement;
}

export default function RequirementPreview({
  requirement
}: IProps): React.ReactElement {
  const { projectId } = useParams<IRouteParams>();
  const { data: project } = useGetProjectQuery(projectId);
  const { openVariants } = useVariantState();
  const classes = useStyles();

  const isActive = () => {
    return openVariants.length > 0;
  };

  if (!project) {
    return <></>;
  }

  return (
    <Box className={`${classes.card} ${isActive() ? classes.active : ''}`}>
      <Box sx={{ borderBottom: '1px solid' }}>
        <Typography variant="lgBold">{requirement.title}</Typography>
      </Box>
      {requirement.variants.map((variant) => {
        return <VariantPreview variant={variant} key={variant.id} />;
      })}
    </Box>
  );
}
