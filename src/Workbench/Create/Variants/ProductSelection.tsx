import { Controller } from 'react-hook-form';
import { List, ListItem, Typography, Checkbox, Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import { useParams } from 'react-router-dom';
import { IRouteParams } from '../../Models/IRouteParams';
import { useGetProjectQuery } from '../../../store/api/bankApi';
import LoaderSpinner from '../../../common/LoaderSpinner';
import theme from '../../../theme';
import Utils from '../../../common/Utils';
import { Levelable } from '../../../models/Levelable';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { ScrollableContainer } from '../../Components/ScrollableContainer';
import { IProduct } from '../../../Nexus/entities/IProduct';

const useStyles = makeStyles({
  checkbox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '22px',
    height: '22px',
    marginRight: 32,
    marginLeft: 16,
    border: `2px solid`,
    '& .MuiSvgIcon-root': {
      color: theme.palette.white.main
    }
  },
  list: {
    border: `1px solid ${theme.palette.black.main}`,
    backgroundColor: theme.palette.gray100.main,
    maxHeight: 400,
    padding: 32
  },
  listItem: {
    display: 'flex',
    border: `1px solid ${theme.palette.silver.main}`,
    minHeight: 50,
    padding: 0,
    paddingTop: 8,
    paddingBottom: 8,
    cursor: 'pointer',
    '&:hover': {
      background: theme.palette.lightBlue.main,
      color: theme.palette.white.main,
      '& .MuiSvgIcon-root': {
        background: theme.palette.white.main,
        color: theme.palette.lightBlue.main
      }
    }
  },
  itemDescription: {
    marginLeft: 'auto',
    borderLeft: `1px solid ${theme.palette.silver.main}`,
    paddingLeft: 20,
    flex: '0 0 30vw'
  },
  itemTitle: {
    alignSelf: 'center',
    paddingLeft: 15,
    flex: '1 1 auto'
  }
});

const ProductSelection = (): React.ReactElement => {
  const { projectId } = useParams<IRouteParams>();
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
  ) => {
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

  const productChecked = (item: IProduct, selected: string[]) => {
    return selected.some((elem) => elem === item.id);
  };

  const deletedBackground = () => {
    return `repeating-linear-gradient(
              -55deg, 
              ${theme.palette.white.main}, 
              ${theme.palette.white.main} 10px, 
              ${theme.palette.gray100.main} 10px, 
              ${theme.palette.gray100.main} 20px
            )`;
  };

  return (
    <Controller
      render={({ field: { value: selected, onChange } }) => (
        <ScrollableContainer className={classes.list}>
          <List>
            {levelableItems.map((item) => {
              return (
                <ListItem
                  key={item.id}
                  className={classes.listItem}
                  sx={{
                    background: item.deletedDate
                      ? deletedBackground()
                      : theme.palette.white.main,
                    marginTop: item.level === 1 ? 2 : -0.125, // -0.125 is equal to 1px to prevent double border
                    marginLeft: `${(item.level - 1) * 2}%`,
                    width: `${100 - (item.level - 1) * 2}%`
                  }}
                  onClick={() => onClick(item, selected, onChange)}
                >
                  <Box
                    className={classes.checkbox}
                    sx={{
                      backgroundColor: productChecked(item, selected)
                        ? theme.palette.primary.main
                        : 'none'
                    }}
                  >
                    <Checkbox
                      icon={<></>}
                      checkedIcon={<CheckBoxIcon />}
                      checked={productChecked(item, selected)}
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
