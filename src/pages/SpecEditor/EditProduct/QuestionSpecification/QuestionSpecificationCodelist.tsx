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
  const [disabledDiscountIndex, setDisabledDiscountIndex] = useState<
    number | null
  >(null);
  const { control, setValue } = useFormContext<IRequirementAnswer>();
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

  useEffect(() => {
    const codes = () => {
      return awardCriteriaCodesDiscount.find((code) => code.score > 0);
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

  if (!codelist) return <></>;

  const codeChecked = (code: ICode): boolean => {
    return fields.some((elem) => elem.code === code.id);
  };

  const codeIndex = (code: ICode): number => {
    return fields.findIndex((elem) => elem.code === code.id);
  };

  const onSelect = (code: ICode): void => {
    const index = codeIndex(code);
    if (index === -1) {
      append({ code: code.id, mandatory: false, score: 0 });
    } else {
      remove(index);
    }
  };

  const onCheckboxClick = (): void => {
    setCodesAwardCriteria((prev) => !prev);
    handleAwardCriteria(!codesAwardCriteria);
  };

  const handleMandatoryClick = (index: number): void => {
    if (fields.length) {
      setValue(`question.config.codes.${index}.score`, 0);
      setDisabledDiscountIndex(index);
    }
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
          defaultValue={0}
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
                      key={codeIndex(code)}
                      className={css.Ctrl}
                      data-disabled={disabledDiscountIndex == codeIndex(code)}
                    >
                      <Typography variant={'sm'}>{t('Discount')}</Typography>
                      <HorizontalTextCtrl
                        name={`question.config.codes.${codeIndex(code)}.score`}
                        placeholder={t('Value')}
                        type={'number'}
                        defaultValue={`question.config.codes.${codeIndex(
                          code
                        )}.score`}
                        size={'small'}
                        color={'var(--text-primary-color)'}
                        adornment={t('NOK')}
                        isDisabled={disabledDiscountIndex == codeIndex(code)}
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
