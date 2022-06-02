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

const useStyles = makeStyles({
  checkbox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'baseline',
    width: '2.2rem',
    height: '2.2rem',
    marginRight: 0,
    marginLeft: 16,
    paddingTop: 8,
    '&:hover span': {
      background: 'transparent'
    },
    '& .MuiSvgIcon-root': {
      color: 'var(--primary-light-color)',
      transition: 'color 220ms ease-out'
    }
  },
  listItem: {
    display: 'flex',
    backgroundColor: theme.palette.white.main,
    border: `0.1rem solid ${theme.palette.silver.main}`,
    minHeight: 50,
    marginTop: 0,
    padding: 0,
    paddingTop: 8,
    paddingBottom: 8,
    cursor: 'pointer',
    transition: 'all 220ms ease-out',
    '&:hover': {
      backgroundColor: theme.palette.lightBlue.main,
      color: theme.palette.white.main,
      '& .MuiSvgIcon-root': {
        color: theme.palette.white.main
      }
    },
    '& + li': {
      marginTop: '-0.1rem'
    }
  },
  itemDescription: {
    marginLeft: 'auto',
    borderLeft: `0.1rem solid ${theme.palette.silver.main}`,
    paddingLeft: 20,
    flex: '0 0 15vw'
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
        <Box>
          <List>
            {levelableItems.map((item) => {
              return (
                <ListItem
                  key={item.id}
                  className={classes.listItem}
                  sx={{
                    marginTop:
                      item.level === 1 ? 'var(--small-gap)' : '-0.1rem',
                    marginLeft: `${(item.level - 1) * 2}%`,
                    width: `${100 - (item.level - 1) * 2}%`
                  }}
                  onClick={() => onClick(item, selected, onChange)}
                >
                  <Box className={classes.checkbox}>
                    <Radio
                      checked={itemChecked(item, selected)}
                      disableRipple={true}
                    />
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
        </Box>
      )}
      name={name}
    />
  );
};

export default SelectionSingularCtrl;
