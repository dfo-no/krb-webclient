import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import Toolbar from '../../../../components/UI/Toolbar/ToolBar';
import ToolbarItem from '../../../../components/UI/Toolbar/ToolbarItem';

interface IProps {
  orgName: string;
  caseNumber?: string;
  currencyUnit: string;
}

export default function SupplierInfoToolbar({
  orgName,
  caseNumber,
  currencyUnit,
}: IProps): ReactElement {
  const { t } = useTranslation();
  return (
    <Toolbar gapType={'md'}>
      <ToolbarItem primaryText={t('Organization')} secondaryText={orgName} />
      {caseNumber && (
        <ToolbarItem
          primaryText={t('Case number')}
          secondaryText={caseNumber}
        />
      )}
      <ToolbarItem
        primaryText={t('CURRENCY_UNIT')}
        secondaryText={t(`CURRENCY_UNIT_${currencyUnit}`)}
      />
    </Toolbar>
  );
}
