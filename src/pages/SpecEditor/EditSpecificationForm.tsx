import React from 'react';
import { Typography } from '@mui/material/';
import { FormProvider, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import GeneralErrorMessage from '../../Form/GeneralErrorMessage';
import Nexus from '../../Nexus/Nexus';
import VerticalTextCtrl from '../../FormProvider/VerticalTextCtrl';
import { ISpecification } from '../../Nexus/entities/ISpecification';
import {
  ModalButton,
  ModalButtonsBox,
} from '../../components/ModalBox/ModalBox';
import { ModelType } from '../../Nexus/enums';
import { SPECIFICATION } from '../../common/PathConstants';
import SelectCtrl from '../../FormProvider/SelectCtrl';
import { IOption } from '../../Nexus/entities/IOption';
import { FormFieldsBox } from '../../components/Form/FormFieldsBox';
interface IProps {
  specification: ISpecification;
  handleCancel: () => void;
}
const EditSpecificationForm = ({ specification, handleCancel }: IProps) => {
  const { t } = useTranslation();
  const history = useHistory();
  const nexus = Nexus.getInstance();

  const methods = useForm<ISpecification>({
    resolver: nexus.resolverService.resolver(ModelType.specification),
    defaultValues: specification,
  });

  const currencyUnitOptions: IOption[] = [
    {
      value: 'NOK',
      label: t('CURRENCY_UNIT_NOK'),
      recommended: true,
    },
    {
      value: 'EUR',
      label: t('CURRENCY_UNIT_EUR'),
      recommended: false,
    },
  ];

  const onSubmit = async (post: ISpecification) => {
    const specificationWithId = nexus.specificationService.withId(post);
    nexus.specificationService
      .setSpecification(specificationWithId)
      .then(() => {
        history.push(`/${SPECIFICATION}/${specificationWithId.id}`);
        handleCancel();
      });
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        autoComplete="off"
        noValidate
      >
        <FormFieldsBox>
          <Typography variant="lgBold">{t('Edit specification')}</Typography>
          <VerticalTextCtrl
            name="title"
            label={t('What will be the name of the procurement?')}
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
          <ModalButtonsBox>
            <ModalButton variant="cancel" onClick={() => handleCancel()}>
              {t('common.Cancel')}
            </ModalButton>
            <ModalButton variant={'primary'} type="submit">
              {t('Save')}
            </ModalButton>
          </ModalButtonsBox>
        </FormFieldsBox>
        <GeneralErrorMessage errors={methods.formState.errors} />
      </form>
    </FormProvider>
  );
};

export default EditSpecificationForm;
