import { makeStyles } from '@material-ui/core';
import EditIcon from '@mui/icons-material/Edit';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton/ListItemButton';
import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Utils from '../../common/Utils';
import Dialog from '../../components/DFODialog/DFODialog';
import { Levelable } from '../../models/Levelable';
import { Parentable } from '../../models/Parentable';
import { INeed } from '../../Nexus/entities/INeed';
import theme from '../../theme';
import styles from '../Admin/Requirement/NeedSideBar/NeedSidebar.module.scss';
import EditNeedForm from './EditNeedForm';
import NewNeedForm from './NewNeedForm';

interface IProps {
  parentables: Parentable<INeed>[];
  updateSelectedFunction: (item: Levelable<INeed>) => void;
}

const useStyles = makeStyles({
  sideBarList: {
    backgroundColor: theme.palette.gray100.main,
    width: '17vw',
    minWidth: 250,
    minHeight: '100vh',
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
      width: '100vw',
      backgroundColor: theme.palette.dfoWhite.main
    }
  },
  sideBarListItem: {
    cursor: 'pointer',
    borderBottom: `1px solid ${theme.palette.gray300.main}`,
    '&:hover': {
      background: theme.palette.lightBlue.main,
      color: theme.palette.dfoWhite.main,

      '& $sideBarListItemText': {
        color: theme.palette.dfoWhite.main
      }
    },

    [theme.breakpoints.down('sm')]: {
      backgroundColor: theme.palette.gray100.main
    }
  },

  sideBarListItemText: {
    color: theme.palette.primary.main,
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center'
    }
  }
});

export default function NeedList({
  parentables,
  updateSelectedFunction
}: IProps): React.ReactElement {
  const classes = useStyles();

  const [isNewOpen, setNewOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const [selectedElement, setSelectedElement] =
    useState<Levelable<INeed> | null>(null);

  const renderLevels = (elements: Parentable<INeed>[]) => {
    const displayNeeds = Utils.parentable2Levelable(elements);

    return displayNeeds.map((element, index) => {
      const cssClass = `level${element.level - 1}`;
      return (
        <ListItem
          key={`${index}-${element.id}`}
          className={`${styles.sidebar__item} ${styles[cssClass]} ${classes.sideBarListItem}`}
        >
          <ListItemButton
            onClick={() => {
              setSelectedElement(element);
              updateSelectedFunction(element);
            }}
            className={classes.sideBarListItemText}
          >
            {element.title}
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              setSelectedElement(element);
              setEditOpen(true);
            }}
          >
            <EditIcon />
          </ListItemButton>
        </ListItem>
      );
    });
  };

  return (
    <Nav className={`sidebar flex-column p-0 ${styles.sidebar}`}>
      <span>{}</span>
      <List className={classes.sideBarList}>
        <ListItemButton onClick={() => setNewOpen(true)}>
          Definer et nytt behov
          <EditIcon />
        </ListItemButton>
        {renderLevels(parentables)}
      </List>
      <Dialog
        title="Nytt behov til kravet"
        isOpen={isNewOpen}
        handleClose={() => setNewOpen(false)}
        children={<NewNeedForm handleClose={() => setNewOpen(false)} />}
      />
      {selectedElement && (
        <Dialog
          title="Rediger behov"
          isOpen={isEditOpen}
          handleClose={() => setEditOpen(false)}
          children={
            <EditNeedForm
              element={selectedElement}
              handleClose={() => setEditOpen(false)}
            />
          }
        />
      )}
    </Nav>
  );
}
