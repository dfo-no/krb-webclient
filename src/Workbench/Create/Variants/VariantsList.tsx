import Box from '@mui/material/Box';
import { IRequirement } from '../../../Nexus/entities/IRequirement';
import { Parentable } from '../../../models/Parentable';
import { INeed } from '../../../Nexus/entities/INeed';
import Variant from './Variant';

interface IProps {
  need: Parentable<INeed>;
  requirement: IRequirement;
}

const VariantsList = ({ need, requirement }: IProps) => {
  return (
    <Box>
      {requirement.variants.map((variant, index) => {
        return (
          <Variant
            key={index}
            need={need}
            requirement={requirement}
            variant={variant}
          />
        );
      })}
    </Box>
  );
};

export default VariantsList;
