import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';
import { useSelectState } from './SelectContext';

export default function Requirements(): React.ReactElement {
  const { need, setRequirement } = useSelectState();

  return (
    <List>
      {need &&
        need.requirements.map((element, index) => (
          <ListItemButton
            onClick={(event) => {
              // handleListItemClick(event, index);
              // updateSelectedFunction(element);
              setRequirement(element);
            }}
            key={element.id}
          >
            <ListItemText>{element.title}</ListItemText>
          </ListItemButton>
        ))}
    </List>
  );
}
