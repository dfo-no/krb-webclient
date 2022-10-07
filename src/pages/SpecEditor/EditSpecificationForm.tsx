import React from 'react';
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
  ModalButton
} from '../../components/ModalBox/ModalBox';
import { ModelType } from '../../Nexus/enums';
import { SPECIFICATION } from '../../common/PathConstants';
import css from '../Stylesheets/EditorFullPage.module.scss';
import Panel from '../../components/UI/Panel/Panel';
import SelectCtrl from '../../FormProvider/SelectCtrl';
import { IOption } from '../../Nexus/entities/IOption';
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

  const currencyUnitOptions: IOption[] = [
    {
      value: 'NOK',
      label: t('CURRENCY_UNIT_NOK'),
      recommended: true
    },
    {
      value: 'EUR',
      label: t('CURRENCY_UNIT_EUR'),
      recommended: false
    }
  ];

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
                {t('common.Version')} {specification.bank.version}
              </Typography>
            </Box>
            <ModalFieldsBox>
              <VerticalTextCtrl
                name="title"
                label={t('common.What will be the name of the procurement?')}
                placeholder={t('Name of specification')}
                autoFocus
                required={true}
              />
              <VerticalTextCtrl
                name="caseNumber"
                label={t('Procurement case number')}
                placeholder={t('Case number')}
              />
              <SelectCtrl
                name={'currencyUnit'}
                label={t('CURRENCY_UNIT')}
                options={currencyUnitOptions}
                required={true}
              />
              <VerticalTextCtrl
                name="organization"
                label={t('Name of your organization')}
                placeholder={t('Name')}
                required={true}
              />
              <VerticalTextCtrl
                name="organizationNumber"
                label={t('Organization number')}
                placeholder={t('Organization number')}
                required={true}
              />
            </ModalFieldsBox>
            <Panel
              panelColor={'white'}
              children={
                <>
                  <ModalButton variant="cancel" onClick={cancel}>
                    {t('Cancel')}
                  </ModalButton>
                  <ModalButton variant="save" type="submit">
                    {t('Save')}
                  </ModalButton>
                </>
              }
            />
          </ModalBox>
          <GeneralErrorMessage errors={methods.formState.errors} />
        </form>
      </FormProvider>
    </div>
  );
};

export default EditSpecificationForm;
