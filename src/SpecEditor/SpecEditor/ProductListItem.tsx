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
    backgroundColor: theme.palette.white.main,
    borderBottom: `1px solid ${theme.palette.silver.main}`,
    cursor: 'pointer',
    '&:hover': {
      background: theme.palette.lightBlue.main,
      '& $productListItemText': {
        color: theme.palette.white.main
      }
    }
  },
  productListItemRadioButton: {
    flexBasis: '50%',
    paddingRight: 10
  },
  productListItemTitle: {
    color: theme.palette.gray700.main,
    fontWeight: 'bold',
    whiteSpace: 'nowrap'
  },
  productListItemDescription: {
    display: 'flex',
    flexBasis: '50%',
    borderLeft: `1px solid ${theme.palette.silver.main}`,
    paddingLeft: 20
  }
});

export default function ProductListItem({
  productListItem
}: IProps): React.ReactElement {
  const [radioButtonColor, setRadioButtonColor] = useState(
    `${theme.palette.lightBlue.main}`
  );
  const [radioButtonState, setRadioButtonState] = useState(false);

  const toggleRadioButton = () => {
    if (radioButtonState) {
      setRadioButtonState(false);
    } else {
      setRadioButtonState(true);
    }
  };

  const listItemOnMouseEnter = () => {
    setRadioButtonColor(`${theme.palette.white.main}`);
  };

  const listItemOnMouseLeave = () => {
    setRadioButtonColor(`${theme.palette.lightBlue.main}`);
  };

  const classes = useStyles();

  return (
    <ListItem
      className={classes.productListItem}
      key={productListItem.title}
      onMouseEnter={listItemOnMouseEnter}
      onMouseLeave={listItemOnMouseLeave}
      onClick={toggleRadioButton}
    >
      <Box className={classes.productListItemRadioButton}>
        <DFORadioButton
          radioColor={radioButtonColor}
          checked={radioButtonState}
        />
        <Typography
          className={classes.productListItemTitle}
          variant="sm"
          onClick={toggleRadioButton}
        >
          {productListItem.title}
        </Typography>
      </Box>

      {productListItem.description && (
        <Box className={classes.productListItemDescription}>
          <ListItemText>
            <Typography>{productListItem.description}</Typography>
          </ListItemText>
        </Box>
      )}
    </ListItem>
  );
}
