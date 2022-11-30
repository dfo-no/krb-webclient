import React, { ReactElement } from 'react';
import { t } from 'i18next';

import RadioCtrl from '../../FormProvider/RadioCtrl';

interface IProps {
  name: string;
  label?: string;
  color?: string;
  recommendedAlternative?: boolean;
}

const YesNoSelection = ({
  name,
  label,
  color,
  recommendedAlternative,
}: IProps): ReactElement => {
  const isRecommended = (alternative: boolean): boolean => {
    return (
      recommendedAlternative !== undefined &&
      alternative === recommendedAlternative
    );
  };
  return (
    <RadioCtrl
      name={name}
      label={label}
      color={color}
      options={[
        {
          value: 'true',
          label: t('common.Yes'),
          recommended: isRecommended(true),
        },
        {
          value: 'false',
          label: t('common.No'),
          recommended: isRecommended(false),
        },
      ]}
    />
  );
};

export default YesNoSelection;
