import React, { useState } from 'react';
import { Typography } from '@mui/material';
import { useFieldArray, useFormContext } from 'react-hook-form';
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
import { Parentable } from '../../../../models/Parentable';

interface IProps {
  item: ICodelistQuestion;
}

const QuestionSpecificationCodelist = ({ item }: IProps) => {
  const { t } = useTranslation();
  const [awardCriteria, setAwardCriteria] = useState(false);
  const [discountCriteria, setDiscountCriteria] = useState(false);
  const { control } = useFormContext<IRequirementAnswer>();
  const { fields, append, update, remove } = useFieldArray({
    control,
    name: 'question.config.codes',
  });

  const { specification } = useSpecificationState();
  const codelist = specification.bank.codelist.find((cl: ICodelist) => {
    return cl.id === item.config.codelist;
  });
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
    setAwardCriteria((prev) => !prev);
    if (fields.length) {
      remove();
    }
  };

  const handleMandatoryClick = (code: Parentable<ICode>): void => {
    setDiscountCriteria((prev) => !prev);
    if (fields.length) {
      const index = codeIndex(code);
      update(index, {
        code: code.id,
        mandatory: true,
        score: 0,
      });
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
        />
        <HorizontalTextCtrl
          name={'question.config.optionalCodeMaxAmount'}
          placeholder={t('Maximum')}
          type={'number'}
          color={'var(--text-primary-color)'}
          adornment={t('Alternative')}
        />
      </div>
      <span className={css.GuidanceText}>{t('Codes hint text')}</span>
      <div onClick={onCheckboxClick}>
        <DFOCheckbox
          checked={awardCriteria}
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
                <div className={css.Options}>
                  <div
                    className={css.Ctrl}
                    onClick={() => handleMandatoryClick(code)}
                  >
                    <CheckboxCtrl
                      name={`question.config.codes.${codeIndex(
                        code
                      )}.mandatory`}
                      color={'var(--text-primary-color)'}
                    />
                    <Typography variant={'sm'}>{t('Mandatory')}</Typography>
                  </div>
                  {awardCriteria && (
                    <div className={css.Ctrl} data-disabled={discountCriteria}>
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
                        isDisabled={discountCriteria}
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
