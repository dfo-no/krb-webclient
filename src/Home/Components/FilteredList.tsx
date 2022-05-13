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
import { useBankState } from './BankContext';

interface IFilteredListProps {
  list: Record<string, IBank>;
}

export default function FilteredList({
  list
}: IFilteredListProps): React.ReactElement {
  const { setSelectedBank } = useBankState();
  const { t } = useTranslation();

  // TODO: Discuss suitable amount of elements displayed
  const filteredElements = () => {
    return Object.values(list).map((bank: IBank) => {
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

  return <List>{filteredElements()}</List>;
}
