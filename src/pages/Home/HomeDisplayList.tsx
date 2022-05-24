import MenuBookIcon from '@mui/icons-material/MenuBook';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { IBank } from '../../Nexus/entities/IBank';
import { Box } from '@mui/material/';
import { useBankState } from '../../components/BankContext/BankContext';
import CardHeader from '@mui/material/CardHeader';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

interface IProps {
  title: string;
  list: IBank[];
  orderedByDate?: boolean;
}

export default function HomeDisplayList({
  title,
  list,
  orderedByDate = false
}: IProps): React.ReactElement {
  const { setSelectedBank } = useBankState();
  const { t } = useTranslation();

  const alfabeticOrderedList = (): IBank[] => {
    const alfabeticOrdered = [...list];
    alfabeticOrdered.sort((a, b) => (a.title > b.title ? 1 : -1));
    return alfabeticOrdered;
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

  const getList = (): IBank[] => {
    const orderedList = orderedByDate
      ? dateOrderedList()
      : alfabeticOrderedList();
    return orderedList.slice(0, 5);
  };

  const filteredElements = () => {
    return getList().map((bank: IBank) => {
      return (
        <div key={bank.id}>
          <ListItem>
            <ListItemIcon>
              <MenuBookIcon />
            </ListItemIcon>
            <Box
              sx={{ cursor: 'pointer' }}
              onClick={() => setSelectedBank(bank)}
            >
              {bank.title}
            </Box>
            {bank.publishedDate && (
              <Typography variant="subtitle1" sx={{ mx: 2 }}>
                {t('date.ago', { date: new Date(bank.publishedDate) })}
              </Typography>
            )}
          </ListItem>
          <Divider component="li" />
        </div>
      );
    });
  };

  return (
    <Box sx={{ flexBasis: '50%' }}>
      <Card>
        <CardHeader title={title} />
        <CardContent>
          <List>{filteredElements()}</List>
        </CardContent>
      </Card>
    </Box>
  );
}
