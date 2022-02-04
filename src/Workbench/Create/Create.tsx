import { Box, makeStyles } from '@material-ui/core';
import { Button } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Levelable } from '../../models/Levelable';
import { INeed } from '../../Nexus/entities/INeed';
import { IRequirement } from '../../Nexus/entities/IRequirement';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import theme from '../../theme';
import Requirements from './Requirements';
import VariantList from './VariantList';
import { Parentable } from '../../models/Parentable';
import {
  putSelectedProjectThunk,
  setNeeds
} from '../../store/reducers/project-reducer';
import NestableHierarcySideBar from '../Components/NestableHiarchySideBar';
import Utils from '../../common/Utils';
import Dialog from '../../components/DFODialog/DFODialog';
import NewNeedForm from './NewNeedForm';
import EditNeedForm from './EditNeedForm';

const useStyles = makeStyles({
  headerText: {
    margin: '0 0 0 30px',
    fontWeight: 'bold',
    color: theme.palette.primary.main
  },
  editorContainer: {
    flex: '1',
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: theme.palette.gray100.main
  },
  newButton: {
    display: 'flex',
    justifySelf: 'flex-end',
    paddingTop: '5%',
    paddingRight: '5%',
    marginLeft: 'auto'
  },
  needs: {
    display: 'flex',
    flexDirection: 'column',
    width: '30%'
  },
  requirements: {
    width: '25%'
  },
  variants: {
    width: '45%'
  }
});

export default function Create(): React.ReactElement {
  const { project } = useAppSelector((state) => state.project);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const classes = useStyles();

  const [isNewOpen, setNewOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const [selectedNeed, setSelectedNeed] = useState<null | Levelable<INeed>>(
    null
  );
  const [selectedRequirement, setSelectedRequirement] =
    useState<null | IRequirement>(null);

  const updateSelectedNeed = (item: Parentable<INeed>) => {
    const levelableNeeds = Utils.parentable2Levelable(project.needs);
    const levelableItem =
      levelableNeeds.find((need) => need.id === item.id) || null;
    setSelectedRequirement(null);
    setSelectedNeed(levelableItem);
  };

  const updateNeeds = (needs: Parentable<INeed>[]) => {
    dispatch(setNeeds(needs));
    dispatch(putSelectedProjectThunk('dummy'));
  };

  return (
    <Box className={classes.editorContainer}>
      <Box className={classes.needs}>
        <Box className={classes.newButton}>
          <Button variant={'primary'} onClick={() => setNewOpen(true)}>
            Legg til nytt behov
          </Button>
        </Box>
        <Box className={classes.newButton}>
          // TODO: Move this functionality to new component
          <Button
            variant={'primary'}
            onClick={() => {
              if (selectedNeed) {
                setEditOpen(true);
              }
            }}
          >
            Endre valgte behov
          </Button>
        </Box>
        <NestableHierarcySideBar
          listOrderFunc={(items: Parentable<INeed>[]) => updateNeeds(items)}
          selectFunc={(item: Parentable<INeed>) => updateSelectedNeed(item)}
          inputlist={project.needs}
          depth={10}
        />
      </Box>
      <Box className={classes.requirements}>
        <h6 className={classes.headerText}>Krav</h6>
        <Requirements
          selectedNeed={selectedNeed as Levelable<INeed> | null}
          updateSelectedFunction={setSelectedRequirement}
        />
      </Box>
      <Box className={classes.variants}>
        <h6 className={classes.headerText}>Variant</h6>
        <VariantList selectedRequirement={selectedRequirement} />
      </Box>
      <Dialog
        title="Nytt behov til kravet"
        isOpen={isNewOpen}
        handleClose={() => setNewOpen(false)}
        children={<NewNeedForm handleClose={() => setNewOpen(false)} />}
      />
      {selectedNeed && (
        <Dialog
          title="Rediger behov"
          isOpen={isEditOpen}
          handleClose={() => setEditOpen(false)}
          children={
            <EditNeedForm
              element={selectedNeed}
              handleClose={() => setEditOpen(false)}
            />
          }
        />
      )}
    </Box>
  );
}
