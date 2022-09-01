import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import css from '../QuestionContent.module.scss';
import VerticalTextCtrl from '../../../../FormProvider/VerticalTextCtrl';
const QuestionSpecificationConfirmation = (): ReactElement => {
  const { t } = useTranslation();
  return (
    <div className={css.QuestionFlex}>
      <div>
        <VerticalTextCtrl
          name={'question.config.pointsUnconfirmed'}
          label={t('Score for unconfirmed')}
          placeholder={''}
          type={'number'}
        />
      </div>
    </div>
  );
};

export default QuestionSpecificationConfirmation;
