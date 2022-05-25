import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import makeStyles from '@mui/styles/makeStyles';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import React from 'react';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

import { IBank } from '../../Nexus/entities/IBank';
import { useBankState } from '../../components/BankContext/BankContext';

interface IProps {
  list: IBank[];
  orderedByDate?: boolean;
  title: string;
}

const useStyles = makeStyles({
  item: {
    display: 'grid',
    gridTemplateColumns: '3rem auto 8rem',
    justifyContent: 'initial',
    padding: '1.5rem 2rem',
    borderBottom: '0.1rem solid var(--secondary-color)',
    color: 'var(--primary-color)',
    cursor: 'pointer',
    transition: 'color 180ms ease-out',

    '& .MuiSvgIcon-root': {
      color: 'var(--primary-color)',
      transition: 'color 180ms ease-out'
    },

    '&:hover': {
      color: 'var(--link-hover-color)',

      '& .MuiSvgIcon-root': {
        color: 'var(--link-hover-color)'
      }
    },

    '&:first-child': {
      borderTop: '0.1rem solid var(--secondary-color)'
    }
  },
  time: {
    color: 'var(--disabled-color)',
    fontSize: '1.4rem',
    textAlign: 'right',
    whiteSpace: 'nowrap'
  }
});

export default function HomeDisplayList({
  list,
  orderedByDate = false,
  title
}: IProps): React.ReactElement {
  const { setSelectedBank } = useBankState();
  const { t } = useTranslation();
  const classes = useStyles();

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

  const getList = (): IBank[] => {
    const orderedList = orderedByDate
      ? dateOrderedList()
      : alphabeticalOrderedList();
    return orderedList.slice(0, 5);
  };

  const filteredElements = () => {
    return getList().map((bank: IBank) => {
      return (
        <ListItem
          key={bank.id}
          className={classes.item}
          onClick={() => setSelectedBank(bank)}
        >
          <ListItemIcon>
            <MenuBookIcon />
          </ListItemIcon>
          <Box>{bank.title}</Box>
          {bank.publishedDate && (
            <Typography className={classes.time} variant="subtitle2">
              {t('date.ago', { date: new Date(bank.publishedDate) })}
            </Typography>
          )}
        </ListItem>
      );
    });
  };

  return (
    <Card sx={{ flexBasis: '50%' }}>
      <CardHeader title={title} />
      <CardContent>
        <List>{filteredElements()}</List>
      </CardContent>
    </Card>
  );
}
