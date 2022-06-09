import React from 'react';
import { Box, Typography } from '@mui/material';
import theme from '../../../theme';
import { useParams } from 'react-router-dom';
import { IRouteProjectParams } from '../../../models/IRouteProjectParams';
import { useGetProjectQuery } from '../../../store/api/bankApi';
import { IRequirement } from '../../../Nexus/entities/IRequirement';
import VariantPreview from './VariantPreview';
import { useVariantState } from '../VariantContext';
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
    margin: 32,
    marginBottom: 0,
    border: `0.1rem solid ${theme.palette.silver.main}`
  },
  active: {
    border: `0.2rem solid ${theme.palette.secondary.main}`,
    borderTop: `1.2rem solid ${theme.palette.secondary.main}`
  }
});

interface IProps {
  requirement: IRequirement;
}

export default function RequirementPreview({
  requirement
}: IProps): React.ReactElement {
  const { projectId } = useParams<IRouteProjectParams>();
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
      <Box sx={{ borderBottom: '0.1rem solid' }}>
        <Typography variant="lgBold">{requirement.title}</Typography>
      </Box>
      {requirement.variants.map((variant) => {
        return <VariantPreview variant={variant} key={variant.id} />;
      })}
    </Box>
  );
}
