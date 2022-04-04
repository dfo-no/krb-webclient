import { joiResolver } from '@hookform/resolvers/joi';
import Button from '@mui/material/Button';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { IAlert } from '../../../models/IAlert';
import { Parentable } from '../../../models/Parentable';
import { INeed } from '../../../Nexus/entities/INeed';
import { IVariant, PostVariantSchema } from '../../../Nexus/entities/IVariant';
import { useAppDispatch } from '../../../store/hooks';
import { addAlert } from '../../../store/reducers/alert-reducer';
import Nexus from '../../../Nexus/Nexus';
import useProjectMutations from '../../../store/api/ProjectMutations';
import { IRequirement } from '../../../Nexus/entities/IRequirement';
import { ModalBox, ModalButtonsBox } from '../../Components/ModalBox';
import VerticalTextCtrl from '../../../FormProvider/VerticalTextCtrl';

interface IProps {
  need: Parentable<INeed>;
  requirement: IRequirement;
  handleClose: () => void;
}

function NewVariantForm({
  need,
  requirement,
  handleClose
}: IProps): React.ReactElement {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const nexus = Nexus.getInstance();
  const { addVariant } = useProjectMutations();

  const defaultValues: IVariant =
    nexus.variantService.generateDefaultVariantValues();

  const methods = useForm<IVariant>({
    resolver: joiResolver(PostVariantSchema),
    defaultValues
  });

  const onSubmit = async (post: IVariant) => {
    const newVariant = nexus.variantService.createVariantWithId(post);
    await addVariant(newVariant, requirement, need).then(() => {
      const alert: IAlert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully created new variant'
      };
      dispatch(addAlert({ alert }));
      handleClose();
      methods.reset();
    });
  };

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          autoComplete="off"
          noValidate
        >
          <ModalBox>
            <VerticalTextCtrl
              name="requirementText"
              label={t('requirementText')}
              placeholder={''}
            />
            <VerticalTextCtrl
              name="instruction"
              label={t('instruction')}
              placeholder={''}
            />
            <ModalButtonsBox>
              <Button variant="primary" type="submit">
                {t('save')}
              </Button>
              <Button variant="warning" onClick={() => handleClose()}>
                {t('cancel')}
              </Button>
            </ModalButtonsBox>
          </ModalBox>
        </form>
      </FormProvider>
    </>
  );
}

export default NewVariantForm;
