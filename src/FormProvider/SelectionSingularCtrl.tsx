import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import { Controller } from 'react-hook-form';
import { List, ListItem, Typography, Box, Radio } from '@mui/material';

import LoaderSpinner from '../common/LoaderSpinner';
import theme from '../theme';
import Utils from '../common/Utils';
import { IBaseModelWithTitleAndDesc } from '../models/IBaseModelWithTitleAndDesc';
import { Levelable } from '../models/Levelable';
import { Parentable } from '../models/Parentable';
import { ScrollableContainer } from '../components/ScrollableContainer/ScrollableContainer';

const useStyles = makeStyles({
  checkbox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '2.2rem',
    height: '2.2rem',
    marginRight: 32,
    marginLeft: 16,
    '& .MuiSvgIcon-root': {
      color: theme.palette.primary.main
    }
  },
  list: {
    border: `0.1rem solid ${theme.palette.black.main}`,
    backgroundColor: theme.palette.gray100.main,
    maxHeight: 400,
    padding: 32
  },
  listItem: {
    display: 'flex',
    backgroundColor: theme.palette.white.main,
    border: `0.1rem solid ${theme.palette.silver.main}`,
    minHeight: 50,
    padding: 0,
    paddingTop: 8,
    paddingBottom: 8,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.lightBlue.main,
      color: theme.palette.white.main,
      '& .MuiSvgIcon-root': {
        color: theme.palette.white.main
      }
    }
  },
  itemDescription: {
    marginLeft: 'auto',
    borderLeft: `0.1rem solid ${theme.palette.silver.main}`,
    paddingLeft: 20,
    flex: '0 0 30vw'
  },
  itemTitle: {
    alignSelf: 'center',
    paddingLeft: 15,
    flex: '1 1 auto'
  }
});

interface IProps<T extends IBaseModelWithTitleAndDesc> {
  name: string;
  initValue: string | T;
  saveAsString: boolean;
  items?: T[];
  parentableItems?: Parentable<T>[];
  postChange?: (selection: T) => void;
}

const SelectionSingularCtrl = <T extends IBaseModelWithTitleAndDesc>({
  name,
  initValue,
  saveAsString,
  items,
  parentableItems,
  postChange = () => {}
}: IProps<T>): React.ReactElement => {
  const classes = useStyles();

  if (!items && !parentableItems) {
    return <LoaderSpinner />;
  }

  let levelableItems: Levelable<T>[];
  if (parentableItems) {
    levelableItems = Utils.parentable2Levelable(parentableItems);
  } else if (items) {
    levelableItems = Utils.parentable2Levelable(
      items?.map((item) => {
        return { ...item, parent: '' } as Parentable<T>;
      })
    );
  }

  const onClick = (
    item: Levelable<T>,
    selected: string,
    onChange: (value: string | T) => void
  ) => {
    if (saveAsString) {
      onChange(item.id);
    } else {
      onChange(Utils.levelable2Parentable(item));
    }
    postChange(item);
  };

  const itemChecked = (item: T, selected: string | T) => {
    if (saveAsString) {
      return selected === item.id;
    } else {
      return (selected as T).id === item.id;
    }
  };

  return (
    <Controller
      render={({ field: { value: selected = initValue, onChange } }) => (
        <ScrollableContainer className={classes.list}>
          <List>
            {levelableItems.map((item) => {
              return (
                <ListItem
                  key={item.id}
                  className={classes.listItem}
                  sx={{
                    marginTop: item.level === 1 ? '1.6rem' : '-0.1rem',
                    marginLeft: `${(item.level - 1) * 2}%`,
                    width: `${100 - (item.level - 1) * 2}%`
                  }}
                  onClick={() => onClick(item, selected, onChange)}
                >
                  <Box className={classes.checkbox}>
                    <Radio checked={itemChecked(item, selected)} />
                  </Box>
                  <Typography
                    className={classes.itemTitle}
                    variant={item.level === 1 ? 'smBold' : 'sm'}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    className={classes.itemDescription}
                    variant={'sm'}
                  >
                    {item.description}
                  </Typography>
                </ListItem>
              );
            })}
          </List>
        </ScrollableContainer>
      )}
      name={name}
    />
  );
};

export default SelectionSingularCtrl;
