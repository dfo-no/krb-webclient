import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import React, { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

import css from './HomePage.module.scss';
import DateUtils from '../../common/DateUtils';
import { IBank } from '../../Nexus/entities/IBank';

interface IProps {
  list: IBank[];
  orderedByDate?: boolean;
  title: string;
  setSelectedBank: Dispatch<SetStateAction<IBank | null>>;
}

const MILLISEC_PER_DAY = 86400000;

export default function HomeDisplayList({
  list,
  orderedByDate = false,
  title,
  setSelectedBank
}: IProps): React.ReactElement {
  const { t } = useTranslation();

  const alphabeticalOrderedList = (): IBank[] => {
    const alphabeticallyOrdered = [...list];
    alphabeticallyOrdered.sort((a, b) => (a.title > b.title ? 1 : -1));
    return alphabeticallyOrdered;
  };

  const dateOrderedList = (): IBank[] => {
    const dateOrdered = [...list];
    dateOrdered.sort((a, b) => {
      if (!a.publishedDate || !b.publishedDate) {
        return -1;
      }
      const aTime = new Date(a.publishedDate).getTime();
      const bTime = new Date(b.publishedDate).getTime();
      return bTime - aTime;
    });
    return dateOrdered;
  };

  const getDateChangeInfo = (bank: IBank): string => {
    if (!bank.publishedDate) {
      return '';
    }

    const now = new Date();
    const publishedDate = new Date(bank.publishedDate);
    if (now.getTime() - publishedDate.getTime() < 27 * MILLISEC_PER_DAY) {
      return t('date.ago', { date: publishedDate });
    }

    return DateUtils.prettyFormatDate(bank.publishedDate);
  };

  const getList = (): IBank[] => {
    const orderedList = orderedByDate
      ? dateOrderedList()
      : alphabeticalOrderedList();
    return orderedList.slice(0, 5);
  };

  const filteredElements = () => {
    return getList().map((bank: IBank) => (
      <li
        key={bank.id}
        className={css.item}
        onClick={() => setSelectedBank(bank)}
      >
        <MenuBookIcon />
        <div>{bank.title}</div>
        {bank.publishedDate && (
          <div className={css.Time}>{getDateChangeInfo(bank)}</div>
        )}
      </li>
    ));
  };

  return (
    <Card className={css.DisplayList}>
      <CardHeader title={title} className={css.Header} />
      <CardContent>
        <ul>{filteredElements()}</ul>
      </CardContent>
    </Card>
  );
}
