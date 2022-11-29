import React, { ReactElement, useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Button, Location, Variant } from '@dfo-no/components.button';
import { Symbols } from '@dfo-no/components.icon';
import ClearIcon from '@mui/icons-material/Clear';

import { DFOCheckbox } from '../../../../components/DFOCheckbox/DFOCheckbox';
import css from '../QuestionContent.module.scss';
import HorizontalTextCtrl from '../../../../FormProvider/HorizontalTextCtrl';
import ArrayUniqueErrorMessage from '../../../../Form/ArrayUniqueErrorMessage';
import UuidService from '../../../../Nexus/services/UuidService';
import { IRequirementAnswer } from '../../../../Nexus/entities/IRequirementAnswer';
import ToolbarItem from '../../../../components/UI/Toolbar/ToolbarItem';
import Toolbar from '../../../../components/UI/Toolbar/ToolBar';

export default function QuestionSpecificationText(): ReactElement {
  const { t } = useTranslation();
  const { control, formState } = useFormContext<IRequirementAnswer>();
  const [awardCriteria, setAwardCriteria] = useState(false);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'question.config.discountValues',
  });

  useEffect(() => {
    if (!fields.length && awardCriteria) {
      append({
        id: new UuidService().generateId(),
        discount: 0,
      });
    }
  }, [awardCriteria, fields, append]);

  useEffect(() => {
    if (fields.length > 0) {
      setAwardCriteria(true);
    }
  }, [fields]);

  const onCheckboxClick = (): void => {
    setAwardCriteria((prev) => !prev);
  };

  return (
    <div className={css.QuestionFlex}>
      <Typography variant={'smBold'}>{t('No specification needed')}</Typography>
      <div onClick={onCheckboxClick}>
        <DFOCheckbox
          checked={awardCriteria}
          _color={'var(--text-primary-color)'}
        />
        <Typography className={css.CheckboxLabel} variant={'smBold'}>
          {t('Is the requirement an award criteria')}
        </Typography>
      </div>
      {awardCriteria && (
        <div className={css.QuestionCriteria}>
          <Typography variant={'smBold'}>{t('Deduction levels')}</Typography>
          <span>{t('Deduction levels text')}</span>
          <div className={css.QuestionCriteria__wrapper}>
            <div className={css.QuestionCriteria__wrapper__textCtrlContainer}>
              {fields.map((discountValues, index) => {
                return (
                  <div
                    key={discountValues.id}
                    className={css.QuestionCriteria__wrapper__textCtrl}
                  >
                    <HorizontalTextCtrl
                      className={
                        css.QuestionCriteria__wrapper__textCtrl__horizontalTextCtrl
                      }
                      label={index == 0 ? t('Deduction') : ''}
                      name={`question.config.discountValues[${index}].discount`}
                      placeholder={t('Value')}
                      type={'number'}
                      adornment={t('NOK')}
                      color={'var(--text-primary-color)'}
                    />
                    {index == 0 && (
                      <Button
                        className={
                          css.QuestionCriteria__wrapper__textCtrl__action
                        }
                        icon={Symbols.Plus}
                        iconLocation={Location.Before}
                        variant={Variant.Ghost}
                        onClick={() =>
                          append({
                            discount: 0,
                            id: new UuidService().generateId(),
                          })
                        }
                      >
                        {t('Add row')}
                      </Button>
                    )}
                    {index > 0 && (
                      <Toolbar>
                        <ToolbarItem
                          secondaryText={t('Remove')}
                          icon={<ClearIcon />}
                          handleClick={() => remove(index)}
                          fontSize={'small'}
                        />
                      </Toolbar>
                    )}
                  </div>
                );
              })}
              <div>
                <ArrayUniqueErrorMessage
                  errors={formState.errors}
                  path={'question.config.discountValues'}
                  length={fields.length}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
