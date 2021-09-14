import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import NewTagForm from './NewTagForm';
import TagList from './TagList';

export default function TagPage(): ReactElement {
  const { t } = useTranslation();

  return (
    <>
      <h3 className="mt-3">{t('Tags')}</h3>
      <NewTagForm />
      <TagList />
    </>
  );
}
