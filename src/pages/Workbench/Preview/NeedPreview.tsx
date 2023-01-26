import React from 'react';
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

import css from './Preview.module.scss';
import RequirementPreview from './RequirementPreview';
import Utils from '../../../common/Utils';
import { Need } from '../../../api/openapi-fetch';
import { IRouteProjectParams } from '../../../models/IRouteProjectParams';
import { useGetProjectQuery } from '../../../store/api/bankApi';
import { VariantProvider } from '../VariantContext';

interface IProps {
  need: Need;
}

export default function NeedPreview({ need }: IProps): React.ReactElement {
  const { projectId } = useParams<IRouteProjectParams>();
  const { data: project } = useGetProjectQuery(projectId);

  if (!project) {
    return <></>;
  }

  const parentTree: Need[] = Utils.findParentTree(need, [], project.needs);

  const getFullPath = () => {
    if (parentTree.length > 0) {
      return parentTree.map((n) => n.title).join(' / ') + ' / ';
    }
    return '';
  };

  return (
    <Box>
      <Box className={css.Need}>
        <Typography variant="sm">{getFullPath()}</Typography>
        <Typography variant="smBold">{need.title}</Typography>
      </Box>
      <Box className={css.Requirement}>
        {need.requirements.map((req) => {
          return (
            <VariantProvider key={req.id}>
              <RequirementPreview requirement={req} />
            </VariantProvider>
          );
        })}
      </Box>
    </Box>
  );
}
