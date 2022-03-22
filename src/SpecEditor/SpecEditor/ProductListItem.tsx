import { Box, ListItem, ListItemText, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useState } from 'react';
import { DFORadioButton } from '../../components/DFORadioButton/DFORadioButton';
import theme from '../../theme';

export interface IProps {
  productListItem: any;
}

const useStyles = makeStyles({
  productListItem: {
    display: 'flex',
    backgroundColor: theme.palette.dfoWhite.main,
    borderBottom: `1px solid ${theme.palette.silver.main}`,
    height: '42px',
    cursor: 'pointer',
    '&:hover': {
      background: theme.palette.lightBlue.main,
      '& $productListItemText': {
        color: theme.palette.dfoWhite.main
      }
    }
  },
  productListItemRadioButton: {
    width: '40%',
    paddingRight: 10
  },
  productListItemText: {
    color: theme.palette.gray700.main
  },
  productListItemDescription: {
    display: 'flex',
    alignItems: 'center',
    borderLeft: `1px solid ${theme.palette.silver.main}`,
    paddingLeft: 10,
    width: '90%',
    height: '42px'
  }
});

export default function ProductListItem({
  productListItem
}: IProps): React.ReactElement {
  const [radioButtonColor, setRadioButtonColor] = useState(
    `${theme.palette.dfoLightBlue.main}`
  );
  const [checkboxState, setCheckboxState] = useState(false);

  const toggleCheckbox = () => {
    if (checkboxState) {
      setCheckboxState(false);
    } else {
      setCheckboxState(true);
    }
  };

  const listItemOnMouseEnter = () => {
    setRadioButtonColor(`${theme.palette.dfoWhite.main}`);
  };

  const listItemOnMouseLeave = () => {
    setRadioButtonColor(`${theme.palette.dfoLightBlue.main}`);
  };
  const classes = useStyles();

  return (
    <ListItem
      className={classes.productListItem}
      key={productListItem.title}
      onMouseEnter={listItemOnMouseEnter}
      onMouseLeave={listItemOnMouseLeave}
      onClick={toggleCheckbox}
    >
      <Box className={classes.productListItemRadioButton}>
        <DFORadioButton radioColor={radioButtonColor} checked={checkboxState} />
        <Typography
          className={classes.productListItemText}
          variant="smallGray"
          onClick={toggleCheckbox}
        >
          {productListItem.title}
        </Typography>
      </Box>
      <Box className={classes.productListItemDescription}>
        <ListItemText>
          <Typography
            variant="smallGray"
            className={classes.productListItemText}
          >
            {productListItem.description}
          </Typography>
        </ListItemText>
      </Box>
    </ListItem>
  );
}
