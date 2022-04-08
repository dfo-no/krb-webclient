import { Controller } from 'react-hook-form';
import { List, ListItem, Typography, Box, Radio } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import LoaderSpinner from '../common/LoaderSpinner';
import theme from '../theme';
import Utils from '../common/Utils';
import { Levelable } from '../models/Levelable';
import { ScrollableContainer } from '../Workbench/Components/ScrollableContainer';
import { Parentable } from '../models/Parentable';
import { IBaseModelWithTitleAndDesc } from '../models/IBaseModelWithTitleAndDesc';

const useStyles = makeStyles({
  checkbox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '22px',
    height: '22px',
    marginRight: 32,
    marginLeft: 16,
    '& .MuiSvgIcon-root': {
      color: theme.palette.primary.main
    }
  },
  list: {
    border: `1px solid ${theme.palette.black.main}`,
    backgroundColor: theme.palette.gray100.main,
    maxHeight: 400,
    padding: 32
  },
  listItem: {
    backgroundColor: theme.palette.white.main,
    border: `1px solid ${theme.palette.silver.main}`,
    height: 50,
    padding: 0,
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
    borderLeft: `1px solid ${theme.palette.silver.main}`,
    paddingLeft: 20,
    width: '25vw'
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

const SelectionMultipleCtrl = <T extends IBaseModelWithTitleAndDesc>({
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
                    marginTop: item.level === 1 ? 2 : -0.125, // -0.125 is equal to 1px to prevent double border
                    marginLeft: `${(item.level - 1) * 4}%`,
                    width: `${100 - (item.level - 1) * 4}%`
                  }}
                  onClick={() => onClick(item, selected, onChange)}
                >
                  <Box className={classes.checkbox}>
                    <Radio checked={itemChecked(item, selected)} />
                  </Box>
                  <Typography variant={item.level === 1 ? 'smBold' : 'sm'}>
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

export default SelectionMultipleCtrl;
