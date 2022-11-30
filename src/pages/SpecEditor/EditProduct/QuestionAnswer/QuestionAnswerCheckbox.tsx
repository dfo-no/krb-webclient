import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import css from '../QuestionContent.module.scss';
import YesNoSelection from '../../../../components/YesNoSelection/YesNoSelection';

const QuestionAnswerCheckbox = (): ReactElement => {
  const { t } = useTranslation();

  return (
    <div className={css.QuestionFlex}>
      <YesNoSelection
        name={'question.answer.value'}
        label={t('Answer')}
        color={'var(--text-primary-color)'}
      />
    </div>
  );
};

export default QuestionAnswerCheckbox;
