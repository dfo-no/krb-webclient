import Button from '@mui/material/Button';
import React from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';

import GeneralErrorMessage from '../../../../Form/GeneralErrorMessage';
import LoaderSpinner from '../../../../common/LoaderSpinner';
import Nexus from '../../../../Nexus/Nexus';
import useProjectMutations from '../../../../store/api/ProjectMutations';
import VariantFormContent from './VariantFormContent';
import { addAlert } from '../../../../store/reducers/alert-reducer';
import { IAlert } from '../../../../models/IAlert';
import { INeed } from '../../../../Nexus/entities/INeed';
import { IRequirement } from '../../../../Nexus/entities/IRequirement';
import { IRouteProjectParams } from '../../../../models/IRouteProjectParams';
import {
  IVariant,
  PostVariantSchema
} from '../../../../Nexus/entities/IVariant';
import { Parentable } from '../../../../models/Parentable';
import { useAppDispatch } from '../../../../store/hooks';
import { useGetProjectQuery } from '../../../../store/api/bankApi';

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
  const { projectId } = useParams<IRouteProjectParams>();
  const { data: project } = useGetProjectQuery(projectId);

  const defaultValues: IVariant =
    nexus.variantService.generateDefaultVariantValues();

  const methods = useForm<IVariant>({
    resolver: joiResolver(PostVariantSchema),
    defaultValues
  });

  if (!project) {
    return <LoaderSpinner />;
  }

  const closeAndReset = () => {
    handleClose();
    methods.reset();
  };

  const onSubmit = async (post: IVariant) => {
    const newVariant = nexus.variantService.createVariantWithId(post);
    await addVariant(newVariant, requirement, need).then(() => {
      const alert: IAlert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully created new variant'
      };
      dispatch(addAlert({ alert }));
      closeAndReset();
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
          <Box sx={{ display: 'flex', flexDirection: 'column', padding: 4 }}>
            <Typography>{t('Add variant')}</Typography>
            <VariantFormContent control={methods.control} />
            <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: 2 }}>
              <Button
                disableRipple={true}
                variant="cancel"
                onClick={() => closeAndReset()}
                sx={{ marginLeft: 'auto', marginRight: 2 }}
              >
                {t('Cancel')}
              </Button>
              <Button disableRipple={true} variant="save" type="submit">
                {t('Save')}
              </Button>
            </Box>
            <GeneralErrorMessage errors={methods.formState.errors} />
          </Box>
        </form>
      </FormProvider>
    </>
  );
}

export default NewVariantForm;
