import { makeStyles } from '@material-ui/core';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';
import { Levelable } from '../../models/Levelable';
import { INeed } from '../../Nexus/entities/INeed';
import { IRequirement } from '../../Nexus/entities/IRequirement';
import theme from '../../theme';

const useStyles = makeStyles({
  list: {
    backgroundColor: theme.palette.gray100.main
  },
  listItem: {
    cursor: 'pointer',
    borderBottom: `1px solid ${theme.palette.gray300.main}`
  },
  requirementButton: {
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'space-between',
    border: `1px solid ${theme.palette.lightBlue.main}`,
    '&:hover': {
      background: theme.palette.lightBlue.main,
      color: theme.palette.dfoWhite.main,

      '&$sideBarListItemText': {
        color: theme.palette.dfoWhite.main
      }
    },

    [theme.breakpoints.down('sm')]: {
      backgroundColor: theme.palette.gray100.main
    }
  }
});

interface IProps {
  selectedNeed: Levelable<INeed> | null;
  updateSelectedFunction: (item: IRequirement) => void;
}

export default function Requirements({
  selectedNeed,
  updateSelectedFunction
}: IProps): React.ReactElement {
  const classes = useStyles();

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };

  const requirements = selectedNeed !== null ? selectedNeed.requirements : [];

  return (
    <List className={classes.list}>
      {requirements.map((element, index) => (
        <ListItemButton
          selected={selectedIndex === index}
          onClick={(event) => {
            handleListItemClick(event, index);
            updateSelectedFunction(element);
          }}
          className={classes.listItem}
          key={element.id}
        >
          <ListItemText>{element.title}</ListItemText>
        </ListItemButton>
      ))}
      <ListItem>
        <ListItemButton>
          <i>Definer et nytt krav til behovet</i>
        </ListItemButton>
      </ListItem>
    </List>
  );
}
