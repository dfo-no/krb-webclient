import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';
import Utils from '../../common/Utils';
import { Parentable } from '../../models/Parentable';
import { INeed } from '../../Nexus/entities/INeed';
import { IProduct } from '../../Nexus/entities/IProduct';
import { usePreviewState } from './PreviewContext';
interface IProps {
  parentableArray: Parentable<INeed | IProduct>[];
}

export default function PreviewSideBar({
  parentableArray
}: IProps): React.ReactElement {
  const { setSelected } = usePreviewState();

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (value: string, index: number) => {
    setSelectedIndex(index);
    setSelected(value);
  };

  const renderProducts = (elements: Parentable<INeed | IProduct>[]) => {
    const displayNeeds = Utils.parentable2Levelable(elements);
    return displayNeeds.map((element, index) => {
      return (
        <ListItem key={`sidebar-${element.id}`} disablePadding>
          <ListItemButton
            className="sidebar"
            selected={selectedIndex === index + 1}
            onClick={() => handleListItemClick(element.id, index + 1)}
          >
            <ListItemText>{element.title}</ListItemText>
            <ListItemIcon>
              <ArrowForwardIcon />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
      );
    });
  };

  return (
    <List>
      <ListItem disablePadding>
        <ListItemButton
          className="sidebar"
          selected={selectedIndex === 0}
          onClick={() => handleListItemClick('', 0)}
        >
          <ListItemText>Generiske krav</ListItemText>
          <ListItemIcon>
            <ArrowForwardIcon />
          </ListItemIcon>
        </ListItemButton>
      </ListItem>
      {renderProducts(parentableArray)}
    </List>
  );
}
