import React from 'react';
import { Box, Typography } from '@mui/material';
import { INeed } from '../../Nexus/entities/INeed';
import { Parentable } from '../../models/Parentable';
import theme from '../../theme';
import { useParams } from 'react-router-dom';
import { IRouteParams } from '../Models/IRouteParams';
import { useGetProjectQuery } from '../../store/api/bankApi';
import RequirementPreview from './RequirementPreview';
import { VariantProvider } from '../Components/VariantContext';
import Utils from '../../common/Utils';

interface IProps {
  need: Parentable<INeed>;
}

export default function NeedPreview({ need }: IProps): React.ReactElement {
  const { projectId } = useParams<IRouteParams>();
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
          backgroundColor: theme.palette.dfoBlue.main,
          color: theme.palette.dfoWhite.main,
          padding: 0.5,
          paddingLeft: 4,
          margin: 4
        }}
      >
        <Typography variant={'small'}>{getFullPath()}</Typography>
        <Typography variant={'smallBold'}>{need.title}</Typography>
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
