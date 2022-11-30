import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import css from '../QuestionContent.module.scss';
import TimeCtrl from '../../../../FormProvider/TimeCtrl';
import { ITimeQuestion } from '../../../../Nexus/entities/ITimeQuestion';

interface IProps {
  item: ITimeQuestion;
}

const QuestionAnswerTime = ({ item }: IProps): ReactElement => {
  const { t } = useTranslation();

  const fromTimeLabel = `${item.config.isPeriod ? t('From') : t('Time')}`;

  const toTimeLabel = t('To');

  return (
    <div className={css.QuestionDateAndTime}>
      <TimeCtrl
        label={fromTimeLabel}
        name={'question.answer.fromTime'}
        color={'var(--text-primary-color)'}
      />
      {item.config.isPeriod && (
        <TimeCtrl
          label={toTimeLabel}
          name={'question.answer.toTime'}
          color={'var(--text-primary-color)'}
        />
      )}
    </div>
  );
};

export default QuestionAnswerTime;
