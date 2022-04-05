import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import Utils from '../../common/Utils';
import { Parentable } from '../../models/Parentable';
import { IProduct } from '../../Nexus/entities/IProduct';
import theme from '../../theme';
import { usePreviewState } from './PreviewContext';
interface IProps {
  parentableArray: Parentable<IProduct>[];
}

const useStyles = makeStyles({
  sideBar: {
    height: '100%',
    width: '100%',
    [theme.breakpoints.down('md')]: {
      paddingTop: 0
    }
  },
  sideBarList: {
    position: 'sticky',
    height: '100%',
    width: '100%',
    minWidth: 230,
    paddingTop: 60
  }
});

export default function Sidebar({
  parentableArray
}: IProps): React.ReactElement {
  const { setSelected } = usePreviewState();
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (
    value: Parentable<IProduct> | null,
    index: number
  ) => {
    setSelectedIndex(index);
    setSelected(value);
  };

  const renderProducts = (elements: Parentable<IProduct>[]) => {
    const displayNeeds = Utils.parentable2Levelable(elements);
    return displayNeeds.map((element, index) => {
      return (
        <ListItem key={`sidebar-${element.id}`}>
          <ListItemButton
            className="sidebar"
            selected={selectedIndex === index + 1}
            onClick={() => handleListItemClick(element, index + 1)}
          >
            <ListItemText>{element.title}</ListItemText>
          </ListItemButton>
        </ListItem>
      );
    });
  };

  return (
    <Box className={classes.sideBar}>
      <List className={classes.sideBarList}>
        <ListItem>
          <ListItemButton
            className="sidebar"
            selected={selectedIndex === 0}
            onClick={() => handleListItemClick(null, 0)}
          >
            <ListItemText>Generiske krav</ListItemText>
          </ListItemButton>
        </ListItem>
        {renderProducts(parentableArray)}
      </List>
    </Box>
  );
}
