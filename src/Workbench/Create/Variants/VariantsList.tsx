import Box from '@mui/material/Box';
import { IRequirement } from '../../../Nexus/entities/IRequirement';
import Variant from './Variant';
import DeleteVariant from './DeleteVariant';
import { useParams } from 'react-router-dom';
import { IRouteParams } from '../../Models/IRouteParams';
import { useGetProjectQuery } from '../../../store/api/bankApi';
import { useSelectState } from '../SelectContext';
import React from 'react';

interface IProps {
  requirement: IRequirement;
  requirementIndex: number;
}

const VariantsList = ({ requirement, requirementIndex }: IProps) => {
  const { projectId } = useParams<IRouteParams>();
  const { data: project } = useGetProjectQuery(projectId);
  const { needIndex, setDeleteMode } = useSelectState();

  if (!project || needIndex === null) {
    return <></>;
  }

  const variantDeleted = () => {
    setDeleteMode('');
  };

  return (
    <Box>
      {requirement.variants.map((variant, index) => {
        return (
          <DeleteVariant
            key={index}
            variant={variant}
            requirement={
              project.needs[needIndex].requirements[requirementIndex]
            }
            need={project.needs[needIndex]}
            handleClose={variantDeleted}
          >
            <Variant variant={variant} requirementIndex={requirementIndex} />
          </DeleteVariant>
        );
      })}
    </Box>
  );
};

export default VariantsList;
