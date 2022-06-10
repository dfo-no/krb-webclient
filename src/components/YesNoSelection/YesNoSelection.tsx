import React, { ReactElement } from 'react';
import { t } from 'i18next';

import RadioCtrl from '../../FormProvider/RadioCtrl';

interface IProps {
  name: string;
  recommendedAlternative?: boolean;
}

const YesNoSelection = ({
  name,
  recommendedAlternative
}: IProps): ReactElement => {
  const isRecommended = (alternative: boolean): boolean => {
    if (recommendedAlternative !== undefined) {
      return alternative === recommendedAlternative;
    }
    return false;
  };
  return (
    <RadioCtrl
      name={name}
      options={[
        { value: 'true', label: t('Yes'), recommended: isRecommended(true) },
        { value: 'false', label: t('No'), recommended: isRecommended(false) }
      ]}
    />
  );
};

export default YesNoSelection;
