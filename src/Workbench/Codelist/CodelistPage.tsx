import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import CodelistList from './CodelistList';
import NewCodelist from './NewCodelist';

export default function CodelistPage(): ReactElement {
  const { t } = useTranslation();

  return (
    <>
      <h3 className="mt-3">{t('Codelists')}</h3>
      <NewCodelist />
      <CodelistList />
    </>
  );
}
