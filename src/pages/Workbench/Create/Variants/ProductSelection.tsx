import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import { Controller } from 'react-hook-form';
import { List, ListItem, Typography, Box } from '@mui/material';
import { useParams } from 'react-router-dom';

import LoaderSpinner from '../../../../common/LoaderSpinner';
import theme from '../../../../theme';
import Utils from '../../../../common/Utils';
import { DFOCheckbox } from '../../../../components/DFOCheckbox/DFOCheckbox';
import { IProduct } from '../../../../Nexus/entities/IProduct';
import { IRouteProjectParams } from '../../../../models/IRouteProjectParams';
import { Levelable } from '../../../../models/Levelable';
import { ScrollableContainer } from '../../../../components/ScrollableContainer/ScrollableContainer';
import { useGetProjectQuery } from '../../../../store/api/bankApi';

const useStyles = makeStyles({
  checkbox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '2.2rem',
    height: '2.2rem',
    marginRight: 32,
    marginLeft: 16
  },
  list: {
    border: `0.1rem solid var(--primary-light-color)`,
    backgroundColor: theme.palette.gray100.main,
    maxHeight: 400,
    padding: 'var(--tiny-gap) var(--normal-gap) var(--small-gap)'
  },
  listItem: {
    display: 'flex',
    border: `0.1rem solid ${theme.palette.silver.main}`,
    minHeight: 50,
    padding: 0,
    paddingTop: 8,
    paddingBottom: 8,
    cursor: 'pointer',
    '&:hover': {
      background: theme.palette.lightBlue.main,
      color: theme.palette.white.main,
      '& .MuiSvgIcon-root': {
        background: 'transparent',
        color: theme.palette.white.main
      }
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

const ProductSelection = (): React.ReactElement => {
  const { projectId } = useParams<IRouteProjectParams>();
  const { data: project } = useGetProjectQuery(projectId);
  const classes = useStyles();

  if (!project) {
    return <LoaderSpinner />;
  }

  const levelableItems: Levelable<IProduct>[] = Utils.parentable2Levelable(
    project.products
  );

  const onClick = (
    item: IProduct,
    selected: string[],
    onChange: (value: string[]) => void
  ): void => {
    if (selected.some((elem) => elem === item.id)) {
      const selectedUpdated = [...selected];
      const index = selectedUpdated.findIndex((elem) => elem === item.id);
      if (index !== -1) {
        selectedUpdated.splice(index, 1);
      }
      onChange(selectedUpdated);
    } else {
      onChange([...selected, item.id]);
    }
  };

  const productChecked = (item: IProduct, selected: string[]): boolean => {
    return selected.some((elem) => elem === item.id);
  };

  const deletedBackground = (): string => {
    return `repeating-linear-gradient(
              -55deg, 
              ${theme.palette.white.main}, 
              ${theme.palette.white.main} 1rem, 
              ${theme.palette.gray100.main} 1rem, 
              ${theme.palette.gray100.main} 2rem
            )`;
  };

  const isDeletedAndUnused = (item: IProduct, selected: string[]): boolean => {
    return !!item.deletedDate && productChecked(item, selected);
  };

  const isDeleted = (item: IProduct, selected: string[]): boolean => {
    return !!item.deletedDate && !productChecked(item, selected);
  };

  return (
    <Controller
      render={({ field: { value: selected, onChange } }) => (
        <ScrollableContainer className={classes.list}>
          <List>
            {levelableItems
              .filter((item) => !isDeleted(item, selected))
              .map((item) => {
                return (
                  <ListItem
                    key={item.id}
                    className={classes.listItem}
                    sx={{
                      background: isDeletedAndUnused(item, selected)
                        ? deletedBackground()
                        : theme.palette.white.main,
                      marginTop: item.level === 1 ? '1.6rem' : '-0.1rem',
                      marginLeft: `${(item.level - 1) * 2}%`,
                      width: `${100 - (item.level - 1) * 2}%`
                    }}
                    onClick={() => onClick(item, selected, onChange)}
                  >
                    <Box className={classes.checkbox}>
                      <DFOCheckbox
                        checked={productChecked(item, selected)}
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
        </ScrollableContainer>
      )}
      name={'products'}
    />
  );
};

export default ProductSelection;
