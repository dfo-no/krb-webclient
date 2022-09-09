import { IBank } from '../Nexus/entities/IBank';
import { useTranslation } from 'react-i18next';

type Props = {
  bank: IBank;
};

export const Version = ({ bank }: Props): JSX.Element => {
  const { t } = useTranslation();
  const isPublished = bank.publications.some((p) => !p.deletedDate);

  if (isPublished) {
    const publishedBanks = bank.publications.filter((p) => !p.deletedDate);
    return <>{publishedBanks[publishedBanks.length - 1].version}</>;
  }
  return <>{t('Not published')}</>;
};
