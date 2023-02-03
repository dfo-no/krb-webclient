import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';

import Variant from './Variant';
import { DeleteVariant } from './DeleteVariant';
import { useSelectState } from '../SelectContext';
import { useVariantState } from '../../VariantContext';
import { NewVariantForm } from './NewVariantForm';
import {
  findRequirementVariants,
  RequirementVariantForm,
} from '../../../../api/nexus2';

interface Props {
  projectRef: string;
  requirementRef: string;
}

export const VariantsList = ({ projectRef, requirementRef }: Props) => {
  const { needIndex, setDeleteMode, createVariant, setCreateVariant } =
    useSelectState();
  const { setOpenVariants } = useVariantState();

  const [variants, setVariants] = useState<RequirementVariantForm[]>([]);

  useEffect(() => {
    findRequirementVariants({
      projectRef,
      requirementRef,
    }).then((response) => {
      setVariants(response.data);
    });
  }, [projectRef, requirementRef]);

  if (needIndex === null) {
    return <></>;
  }

  const variantDeleted = (variantId: string) => {
    setDeleteMode('');
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
      {createVariant === requirementRef && (
        <NewVariantForm
          projectRef={projectRef}
          requirementRef={requirementRef}
          handleClose={() => variantCreated()}
        />
      )}
      {variants.map((variant, index) => {
        return (
          <DeleteVariant
            projectRef={projectRef}
            key={index}
            requirementRef={requirementRef}
            requirementVariantRef={variant.ref}
            handleClose={() => variantDeleted(variant.ref)}
          >
            <Variant
              projectRef={projectRef}
              requirementRef={requirementRef}
              variant={variant}
            />
          </DeleteVariant>
        );
      })}
    </Box>
  );
};
