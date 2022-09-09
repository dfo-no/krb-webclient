import { IBank } from '../Nexus/entities/IBank';
import { useTranslation } from 'react-i18next';

export const useVersion = (
  bank: IBank
): { isPublished: boolean; version: string } => {
  const { t } = useTranslation();
  const isPublished = bank.publications.some((p) => !p.deletedDate);

  if (isPublished) {
    const publishedBanks = bank
      ? bank.publications.filter((p) => !p.deletedDate)
      : [];
    // return t('Version') + publishedBanks[publishedBanks.length - 1].version;
    return {
      isPublished,
      version: `${publishedBanks[publishedBanks.length - 1].version}`
    };
  }
  return {
    isPublished,
    version: t('Not published')
  };
};
