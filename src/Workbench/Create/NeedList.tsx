import { ListItemIcon } from '@material-ui/core';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton/ListItemButton';
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
  const { need, setNeed, setRequirement, setVariant } = useSelectState();

  const renderLevels = (elements: Parentable<INeed>[]) => {
    const displayNeeds = Utils.parentable2Levelable(elements);

    return displayNeeds.map((element, index) => {
      /* const cssClass = `level${element.level - 1}`; */
      return (
        <ListItemButton
          key={`${index}-${element.id}`}
          onClick={() => {
            if (!need || element.id !== need.id) {
              setNeed(element);
              setRequirement(null);
              setVariant(null);
            }
          }}
          selected={element.id === need?.id}
        >
          <ListItemText>{element.title}</ListItemText>
          <ListItemIcon>
            <ArrowForwardIcon />
          </ListItemIcon>
        </ListItemButton>
      );
    });
  };

  return <List dense={true}>{renderLevels(parentables)}</List>;
}
