import { Box, Typography } from '@mui/material/';
import { FormProvider, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import theme from '../../theme';
import GeneralErrorMessage from '../../Form/GeneralErrorMessage';
import Nexus from '../../Nexus/Nexus';
import VerticalTextCtrl from '../../FormProvider/VerticalTextCtrl';
import { ISpecification } from '../../Nexus/entities/ISpecification';
import {
  ModalBox,
  ModalFieldsBox,
  ModalButtonsBox,
  ModalButton
} from '../../components/ModalBox/ModalBox';
import { ModelType } from '../../Nexus/enums';
import { SPECIFICATION } from '../../common/PathConstants';
import css from '../Stylesheets/EditorFullPage.module.scss';
import React from 'react';
interface IProps {
  specification: ISpecification;
}
const EditSpecificationForm = ({ specification }: IProps) => {
  const { t } = useTranslation();
  const history = useHistory();
  const nexus = Nexus.getInstance();

  const methods = useForm<ISpecification>({
    resolver: nexus.resolverService.resolver(ModelType.specification),
    defaultValues: specification
  });

  const onSubmit = async (post: ISpecification) => {
    const specificationWithId = nexus.specificationService.withId(post);
    nexus.specificationService
      .setSpecification(specificationWithId)
      .then(() => history.push(`/${SPECIFICATION}/${specificationWithId.id}`));
  };
  const cancel = (): void => {
    history.push(`/${SPECIFICATION}/${specification.id}`);
  };

  return (
    <div className={css.editPage}>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          autoComplete="off"
          noValidate
        >
          <ModalBox>
            <Box>
              <Typography variant="lg" color={theme.palette.primary.main}>
                {specification.bank.title}
              </Typography>
              <Typography sx={{ marginLeft: 0.16 }}>
                {specification.bank.description}
              </Typography>
              <Typography sx={{ marginLeft: 0.16 }}>
                {t('Version')} {specification.bank.version}
              </Typography>
            </Box>
            <ModalFieldsBox>
              <VerticalTextCtrl
                name="title"
                label={t('What will be the name of the procurement?')}
                placeholder={t('Name of specification')}
                autoFocus
              />
              <VerticalTextCtrl
                name="organization"
                label={t('Name of your organization')}
                placeholder={t('Name')}
              />
              <VerticalTextCtrl
                name="organizationNumber"
                label={t('Organization number')}
                placeholder={t('Organization number')}
              />
            </ModalFieldsBox>
            <Box
              className={css.Button}
              sx={{
                display: 'flex',
                flexDirection: 'row-reverse'
              }}
            >
              <ModalButtonsBox>
                <ModalButton variant="cancel" onClick={cancel}>
                  {t('Cancel')}
                </ModalButton>
                <ModalButton variant="save" type="submit">
                  {t('Save')}
                </ModalButton>
              </ModalButtonsBox>
            </Box>
          </ModalBox>
          <GeneralErrorMessage errors={methods.formState.errors} />
        </form>
      </FormProvider>
    </div>
  );
};

export default EditSpecificationForm;
