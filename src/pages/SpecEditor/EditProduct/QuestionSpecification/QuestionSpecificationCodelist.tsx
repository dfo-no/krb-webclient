import React from 'react';
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
import { useAppSelector } from '../../../../store/hooks';

interface IProps {
  item: ICodelistQuestion;
}

const QuestionSpecificationCodelist = ({ item }: IProps) => {
  const { t } = useTranslation();
  const { control } = useFormContext<IRequirementAnswer>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'question.config.codes'
  });

  const { spec } = useAppSelector((state) => state.specification);
  const codelist = spec.bank.codelist.find((cl: ICodelist) => {
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

  return (
    <div className={css.QuestionFlex}>
      <Typography variant={'smBold'}>{t('Minimum codes')}</Typography>
      <HorizontalTextCtrl
        name={'question.config.optionalCodeMinAmount'}
        placeholder={t('Minimum')}
        type={'number'}
      />
      <Typography className={css.TopMargin} variant={'smBold'}>
        {t('Maximum codes')}
      </Typography>
      <HorizontalTextCtrl
        name={'question.config.optionalCodeMaxAmount'}
        placeholder={t('Maximum')}
        type={'number'}
      />
      <Typography className={css.TopMargin} variant={'smBold'}>
        {t('Codes')}
      </Typography>
      <ul>
        {codelist.codes.map((code) => {
          return (
            <li key={code.id}>
              <DFOCheckbox
                className={css.Ctrl}
                onClick={() => onSelect(code)}
                checked={codeChecked(code)}
              />
              <Typography
                className={css.Title}
                variant={'smBold'}
                onClick={() => onSelect(code)}
              >
                {code.title}
              </Typography>
              <Typography
                className={css.Description}
                variant={'sm'}
                onClick={() => onSelect(code)}
              >
                {code.description}
              </Typography>
              {codeChecked(code) && (
                <>
                  <div className={css.Ctrl}>
                    <CheckboxCtrl
                      name={`question.config.codes.${codeIndex(
                        code
                      )}.mandatory`}
                    />
                    <Typography variant={'sm'}>{t('Mandatory')}</Typography>
                  </div>
                  <div className={css.Ctrl}>
                    <HorizontalTextCtrl
                      name={`question.config.codes.${codeIndex(code)}.score`}
                      placeholder={t('Score')}
                      type={'number'}
                      size={'small'}
                    />
                    <Typography variant={'sm'}>{t('Score')}</Typography>
                  </div>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default QuestionSpecificationCodelist;
