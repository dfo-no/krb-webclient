import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';
import Utils from '../../common/Utils';
import { Parentable } from '../../models/Parentable';
import { INeed } from '../../Nexus/entities/INeed';
import { useSelectState } from './SelectContext';

interface IProps {
  parentables: Parentable<INeed>[];
}

export default function NeedList({ parentables }: IProps): React.ReactElement {
  const { needIndex, setNeedIndex } = useSelectState();

  const renderLevels = (elements: Parentable<INeed>[]) => {
    const displayNeeds = Utils.parentable2Levelable(elements);

    return displayNeeds.map((element, index) => {
      return (
        <ListItem key={`${index}-${element.id}`}>
          <ListItemButton
            onClick={() => {
              setNeedIndex(index);
            }}
            selected={index === needIndex}
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

  return <List dense={true}>{renderLevels(parentables)}</List>;
}
