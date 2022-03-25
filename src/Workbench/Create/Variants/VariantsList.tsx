import Box from '@mui/material/Box';
import { IRequirement } from '../../../Nexus/entities/IRequirement';
import Variant from './Variant';

interface IProps {
  requirement: IRequirement;
  requirementIndex: number;
}

const VariantsList = ({ requirement, requirementIndex }: IProps) => {
  return (
    <Box>
      {requirement.variants.map((variant, index) => {
        return (
          <Variant
            key={index}
            variant={variant}
            requirementIndex={requirementIndex}
          />
        );
      })}
    </Box>
  );
};

export default VariantsList;
