import classnames from 'classnames';
import { Box, Divider, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

import css from './Preview.module.scss';
import VariantPreview from './VariantPreview';
import { IRequirement } from '../../../Nexus/entities/IRequirement';
import { IRouteProjectParams } from '../../../models/IRouteProjectParams';
import { useGetProjectQuery } from '../../../store/api/bankApi';
import { useVariantState } from '../VariantContext';

interface IProps {
  requirement: IRequirement;
}

export default function RequirementPreview({
  requirement,
}: IProps): React.ReactElement {
  const { projectId } = useParams<IRouteProjectParams>();
  const { data: project } = useGetProjectQuery(projectId);
  const { openVariants } = useVariantState();

  const isActive = () => {
    return openVariants.length > 0;
  };

  if (!project) {
    return <></>;
  }

  return (
    <Box className={classnames(css.card, isActive() ? css.active : undefined)}>
      <Typography variant="lgBold">{requirement.title}</Typography>
      <Divider />
      {requirement.variants.map((variant) => {
        return <VariantPreview variant={variant} key={variant.id} />;
      })}
    </Box>
  );
}
