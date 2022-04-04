import React, { useState } from 'react';
import Dialog from '../../../components/DFODialog/DFODialog';
import { Parentable } from '../../../models/Parentable';
import { INeed } from '../../../Nexus/entities/INeed';
import { IRequirement } from '../../../Nexus/entities/IRequirement';
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

  const onClose = () => {
    setNewOpen(false);
  };

  return (
    <>
      <FormIconButton
        hoverColor={theme.palette.green.main}
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
