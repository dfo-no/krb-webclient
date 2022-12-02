import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import css from '../QuestionContent.module.scss';
import { ISliderQuestion } from '../../../../Nexus/entities/ISliderQuestion';
import HorizontalTextCtrl from '../../../../FormProvider/HorizontalTextCtrl';

interface IProps {
  item: ISliderQuestion;
}

const QuestionAnswerSlider = ({ item }: IProps): ReactElement => {
  const { t } = useTranslation();

  const sliderLabel = `${t('Quantity')} ${item.config.unit}`;

  return (
    <div className={css.QuestionFlex}>
      <HorizontalTextCtrl
        className={css.QuestionFlex__textCtrl}
        name={'question.answer.value'}
        label={sliderLabel}
        placeholder={sliderLabel}
        type={'number'}
        adornment={item.config.unit}
        color={'var(--text-primary-color)'}
      />
    </div>
  );
};

export default QuestionAnswerSlider;
