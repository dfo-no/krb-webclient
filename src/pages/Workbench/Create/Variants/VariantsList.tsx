import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';

import { IRequirement } from '../../../../Nexus/entities/IRequirement';
import Variant from './Variant';
import DeleteVariant from './DeleteVariant';
import { IRouteProjectParams } from '../../../../models/IRouteProjectParams';
import { useGetProjectQuery } from '../../../../store/api/bankApi';
import { useSelectState } from '../SelectContext';
import { useVariantState } from '../../VariantContext';
import NewVariantForm from './NewVariantForm';

interface Props {
  requirement: IRequirement;
  requirementIndex: number;
}

const VariantsList = ({ requirement, requirementIndex }: Props) => {
  const { projectId } = useParams<IRouteProjectParams>();
  const { data: project } = useGetProjectQuery(projectId);
  const { needIndex, setDeleteCandidateId, createVariant, setCreateVariant } =
    useSelectState();
  const { setOpenVariants } = useVariantState();

  if (!project || needIndex === null) {
    return <></>;
  }

  const variantDeleted = (variantId: string) => {
    setDeleteCandidateId('');
    setOpenVariants((ov) => {
      const tmp = [...ov];
      tmp.splice(tmp.indexOf(variantId), 1);
      return tmp;
    });
  };

  const variantCreated = () => {
    setCreateVariant('');
  };

  return (
    <Box>
      {createVariant === requirement.id && (
        <NewVariantForm
          need={project.needs[needIndex]}
          requirement={project.needs[needIndex].requirements[requirementIndex]}
          handleClose={() => variantCreated()}
        />
      )}
      {requirement.variants.map((variant, index) => {
        return (
          <DeleteVariant
            key={index}
            variant={variant}
            requirement={
              project.needs[needIndex].requirements[requirementIndex]
            }
            need={project.needs[needIndex]}
            handleClose={() => variantDeleted(variant.id)}
          >
            <Variant variant={variant} requirementIndex={requirementIndex} />
          </DeleteVariant>
        );
      })}
    </Box>
  );
};

export default VariantsList;
