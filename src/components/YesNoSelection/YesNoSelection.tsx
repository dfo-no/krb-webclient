import React, { ReactElement } from 'react';
import { t } from 'i18next';

import RadioCtrl from '../../FormProvider/RadioCtrl';

interface IProps {
  name: string;
}

const YesNoSelection = ({ name }: IProps): ReactElement => {
  return (
    <RadioCtrl
      name={name}
      options={[
        { value: 'true', label: t('Yes') },
        { value: 'false', label: t('No') }
      ]}
    />
  );
};

export default YesNoSelection;
