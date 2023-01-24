import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import CheckboxCtrl from '../../../../FormProvider/CheckboxCtrl';
import css from '../QuestionContent.module.scss';
import HorizontalTextCtrl from '../../../../FormProvider/HorizontalTextCtrl';
import { DFOCheckbox } from '../../../../components/DFOCheckbox/DFOCheckbox';
import { ICode } from '../../../../Nexus/entities/ICode';
import { ICodelist } from '../../../../Nexus/entities/ICodelist';
import { ICodelistQuestion } from '../../../../Nexus/entities/ICodelistQuestion';
import { IRequirementAnswer } from '../../../../Nexus/entities/IRequirementAnswer';
import { useSpecificationState } from '../../SpecificationContext';
import MaximumDiscountsErrorMessage from '../../../../Form/MaximumDiscountsErrorMessage';

interface IProps {
  item: ICodelistQuestion;
  handleAwardCriteria: (value: boolean) => void;
}

const QuestionSpecificationCodelist = ({
  item,
  handleAwardCriteria,
}: IProps) => {
  const { t } = useTranslation();
  const [codesAwardCriteria, setCodesAwardCriteria] = useState(false);
  const { control, setValue, formState } = useFormContext<IRequirementAnswer>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'question.config.codes',
  });

  const { specification } = useSpecificationState();
  const codelist = specification.bank.codelist.find((cl: ICodelist) => {
    return cl.id === item.config.codelist;
  });

  const awardCriteriaCodesDiscount = useWatch({
    name: 'question.config.codes',
    control,
  });

  const codeChecked = (code: ICode): boolean => {
    return fields.some((elem) => elem.code === code.id);
  };

  const codeIndex = (code: ICode): number => {
    return fields.findIndex((elem) => elem.code === code.id);
  };

  useEffect(() => {
    const codes = () => {
      return awardCriteriaCodesDiscount?.find((code) => code.discount > 0);
    };
    if (awardCriteriaCodesDiscount?.length && !!codes()) {
      setCodesAwardCriteria(true);
      handleAwardCriteria(true);
    }
  }, [
    awardCriteriaCodesDiscount,
    awardCriteriaCodesDiscount?.length,
    handleAwardCriteria,
  ]);

  const mandatoryCodeList = () => {
    return awardCriteriaCodesDiscount?.filter((code) => code.mandatory);
  };

  if (!codelist) return <></>;

  const onSelect = (code: ICode): void => {
    const index = codeIndex(code);
    if (index === -1) {
      append({ code: code.id, mandatory: false, discount: 0 });
    } else {
      remove(index);
    }
  };

  const onCheckboxClick = (): void => {
    setCodesAwardCriteria((prev) => !prev);
    handleAwardCriteria(!codesAwardCriteria);
  };

  const handleMandatoryClick = (codesIndex: number): void => {
    if (fields.length) {
      setValue(`question.config.codes.${codesIndex}.discount`, 0);
    }
  };

  const discountDisabled = (codeId: string) => {
    return !!mandatoryCodeList()?.find((c) => c.code === codeId);
  };

  return (
    <div className={css.QuestionCodeList}>
      <span>{t('Enter the minimum and maximum optional alternatives')}</span>
      <div className={css.CodeCtrl}>
        <HorizontalTextCtrl
          name={'question.config.optionalCodeMinAmount'}
          placeholder={t('Minimum')}
          type={'number'}
          color={'var(--text-primary-color)'}
          adornment={t('Alternative')}
          defaultValue={0}
        />
        <HorizontalTextCtrl
          name={'question.config.optionalCodeMaxAmount'}
          placeholder={t('Maximum')}
          type={'number'}
          color={'var(--text-primary-color)'}
          adornment={t('Alternative')}
          defaultValue={1}
        />
      </div>
      <span className={css.GuidanceText}>{t('Codes hint text')}</span>
      <div onClick={onCheckboxClick}>
        <DFOCheckbox
          checked={codesAwardCriteria}
          _color={'var(--text-primary-color)'}
        />
        <Typography variant={'smBold'}>
          {t('Is the requirement an award criteria')}
        </Typography>
      </div>
      {codesAwardCriteria && (
        <>
          <HorizontalTextCtrl
            className={css.MaxDiscountAmount}
            label={t('Highest discount amount')}
            name={`question.config.discountSumMax`}
            hintText={t('Highest discount amount hint text')}
            placeholder={t('Discount sum')}
            defaultValue={0}
            type={'number'}
            color={'var(--text-primary-color)'}
            adornment={t('NOK')}
          />
          <MaximumDiscountsErrorMessage
            errors={formState.errors}
            path={'question.config.codes'}
          />
        </>
      )}
      <ul>
        {codelist.codes.map((code) => {
          return (
            <li key={code.id}>
              <div className={css.ItemTitleAndDescription}>
                <DFOCheckbox
                  className={css.Checkbox}
                  onClick={() => onSelect(code)}
                  checked={codeChecked(code)}
                  _color={'var(--text-primary-color)'}
                />
                <span className={css.Title}>{code.title}</span>
                <span className={css.Description}>{code.description}</span>
              </div>
              {codeChecked(code) && (
                <div key={code.id} className={css.Options}>
                  <div
                    className={css.Ctrl}
                    onClick={() => handleMandatoryClick(codeIndex(code))}
                  >
                    <CheckboxCtrl
                      name={`question.config.codes.${codeIndex(
                        code
                      )}.mandatory`}
                      color={'var(--text-primary-color)'}
                    />
                    <Typography variant={'sm'}>{t('Mandatory')}</Typography>
                  </div>
                  {codesAwardCriteria && (
                    <div
                      className={css.Ctrl}
                      data-disabled={discountDisabled(code.id)}
                    >
                      <Typography variant={'sm'}>{t('Discount')}</Typography>
                      <HorizontalTextCtrl
                        name={`question.config.codes.${codeIndex(
                          code
                        )}.discount`}
                        placeholder={t('Value')}
                        type={'number'}
                        defaultValue={`question.config.codes.${codeIndex(
                          code
                        )}.discount`}
                        size={'small'}
                        color={'var(--text-primary-color)'}
                        adornment={t('NOK')}
                        isDisabled={discountDisabled(code.id)}
                      />
                    </div>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default QuestionSpecificationCodelist;
