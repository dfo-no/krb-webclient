import React, { useState } from 'react';
import Dialog from '../../../components/DFODialog/DFODialog';
import { Parentable } from '../../../models/Parentable';
import { INeed } from '../../../Nexus/entities/INeed';
import { IRequirement } from '../../../Nexus/entities/IRequirement';
import { useSelectState } from '../SelectContext';
import Utils from '../../../common/Utils';
import { IVariant } from '../../../Nexus/entities/IVariant';
import AddIcon from '@mui/icons-material/Add';
import { FormIconButton } from '../../Components/Form/FormIconButton';
import NewVariantForm from './NewVariantForm';
import theme from '../../../theme';
import { useTranslation } from 'react-i18next';
interface IProps {
  need: Parentable<INeed>;
  requirement: IRequirement;
}

const NewVariant = ({ need, requirement }: IProps) => {
  const { t } = useTranslation();
  const [isNewOpen, setNewOpen] = useState(false);
  const { setNeed } = useSelectState();

  const onClose = (newVariant: IVariant | null) => {
    setNewOpen(false);
    if (newVariant) {
      const newVariantList = Utils.addElementToList(
        newVariant,
        requirement.variants
      );
      const newReqList = Utils.replaceElementInList(
        { ...requirement, variants: newVariantList },
        need.requirements
      );
      setNeed({ ...need, requirements: newReqList });
    }
  };

  return (
    <>
      <FormIconButton
        hoverColor={theme.palette.saveGreen.main}
        sx={{ marginLeft: 0, marginRight: -2 }}
        onClick={() => setNewOpen(true)}
      >
        <AddIcon />
      </FormIconButton>
      <Dialog
        title={t('create variant')}
        isOpen={isNewOpen}
        handleClose={() => setNewOpen(false)}
        children={
          <NewVariantForm
            need={need}
            requirement={requirement}
            handleClose={onClose}
          />
        }
      />
    </>
  );
};

export default NewVariant;
