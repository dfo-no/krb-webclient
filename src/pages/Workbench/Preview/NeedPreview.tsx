import React from 'react';
import { Box, Typography } from '@mui/material';
import { INeed } from '../../../Nexus/entities/INeed';
import { Parentable } from '../../../models/Parentable';
import theme from '../../../theme';
import { useParams } from 'react-router-dom';
import { IRouteProjectParams } from '../../../models/IRouteProjectParams';
import { useGetProjectQuery } from '../../../store/api/bankApi';
import RequirementPreview from './RequirementPreview';
import { VariantProvider } from '../VariantContext';
import Utils from '../../../common/Utils';

interface IProps {
  need: Parentable<INeed>;
}

export default function NeedPreview({ need }: IProps): React.ReactElement {
  const { projectId } = useParams<IRouteProjectParams>();
  const { data: project } = useGetProjectQuery(projectId);

  if (!project) {
    return <></>;
  }

  const parentTree: Parentable<INeed>[] = Utils.findParentTree(
    need,
    [],
    project.needs
  );

  const getFullPath = () => {
    if (parentTree.length > 0) {
      return parentTree.map((n) => n.title).join(' / ') + ' / ';
    }
    return '';
  };

  return (
    <Box>
      <Box
        sx={{
          backgroundColor: theme.palette.darkBlue.main,
          color: theme.palette.white.main,
          padding: 0.5,
          paddingLeft: 4,
          margin: 4
        }}
      >
        <Typography variant="sm">{getFullPath()}</Typography>
        <Typography variant="smBold">{need.title}</Typography>
      </Box>
      {need.requirements.map((req) => {
        return (
          <VariantProvider key={req.id}>
            <RequirementPreview requirement={req} />
          </VariantProvider>
        );
      })}
    </Box>
  );
}
