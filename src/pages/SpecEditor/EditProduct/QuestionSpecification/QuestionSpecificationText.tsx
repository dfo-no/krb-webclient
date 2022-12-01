import React, { ReactElement, useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useFieldArray, useFormContext } from 'react-hook-form';
import ClearIcon from '@mui/icons-material/Clear';
import { Button, Location, Variant } from '@dfo-no/components.button';
import { Symbols } from '@dfo-no/components.icon';

import { DFOCheckbox } from '../../../../components/DFOCheckbox/DFOCheckbox';
import css from '../QuestionContent.module.scss';
import HorizontalTextCtrl from '../../../../FormProvider/HorizontalTextCtrl';
import ArrayUniqueErrorMessage from '../../../../Form/ArrayUniqueErrorMessage';
import UuidService from '../../../../Nexus/services/UuidService';
import { IRequirementAnswer } from '../../../../Nexus/entities/IRequirementAnswer';
import ToolbarItem from '../../../../components/UI/Toolbar/ToolbarItem';

export default function QuestionSpecificationText(): ReactElement {
  const { t } = useTranslation();
  const { control, formState } = useFormContext<IRequirementAnswer>();
  const [awardCriteria, setAwardCriteria] = useState(false);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'question.config.discountValues',
  });

  useEffect(() => {
    if (fields.length > 0) {
      setAwardCriteria(true);
    }
  }, [fields]);

  const onCheckboxClick = (): void => {
    if (!fields.length) {
      append({
        id: new UuidService().generateId(),
        discount: 0,
      });
    }
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
          <Typography variant={'smBold'}>{t('Discount levels')}</Typography>
          <span>{t('Discount levels text')}</span>
          <div className={css.QuestionCriteria__wrapper}>
            <div className={css.QuestionCriteria__wrapper__CtrlContainer}>
              {fields.map((discountValues, index) => {
                return (
                  <div
                    key={discountValues.id}
                    className={css.QuestionCriteria__Ctrl}
                  >
                    <HorizontalTextCtrl
                      className={css.QuestionCriteria__Ctrl__inputCtrl}
                      label={index == 0 ? t('Discount') : ''}
                      name={`question.config.discountValues[${index}].discount`}
                      placeholder={t('Value')}
                      type={'number'}
                      adornment={t('NOK')}
                      color={'var(--text-primary-color)'}
                    />
                    {index == 0 && (
                      <Button
                        className={css.QuestionCriteria__Ctrl__action}
                        icon={Symbols.Plus}
                        iconLocation={Location.Before}
                        variant={Variant.Ghost}
                        onClick={(e: Event) => {
                          e.preventDefault();
                          append({
                            discount: 0,
                            id: new UuidService().generateId(),
                          });
                        }}
                      >
                        {t('Add row')}
                      </Button>
                    )}
                    {index > 0 && (
                      <ToolbarItem
                        secondaryText={t('Remove')}
                        icon={<ClearIcon />}
                        handleClick={() => remove(index)}
                        fontSize={'small'}
                      />
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
