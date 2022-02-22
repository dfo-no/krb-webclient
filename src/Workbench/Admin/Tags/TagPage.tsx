import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Parentable } from '../../../models/Parentable';
import NestableHierarcyWithAccordion from '../../../NestableHierarchy/NestableHierarcyWithAccordion';
import { ITag } from '../../../Nexus/entities/ITag';
import { Nestable } from '../../../models/Nestable';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  putSelectedProjectThunk,
  setTags
} from '../../../store/reducers/project-reducer';
import EditTagForm from './EditTagForm';
import NewTagForm from './NewTagForm';
import Utils from '../../../common/Utils';
import { Box, Button } from '@mui/material';
import theme from '../../../theme';
import DFOSearchBar from '../../../components/DFOSearchBar/DFOSearchBar';
import Dialog from '../../../components/DFODialog/DFODialog';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  tagListContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 40,
    gap: 30,
    margin: 'auto',
    width: '55.5vw',
    paddingBottom: 40
  },
  topContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    [theme.breakpoints.down('mddd')]: {
      flexDirection: 'column',
      gap: 15
    }
  },
  searchBarContainer: {
    flex: 1,
    minWidth: 300,
    alignSelf: 'center'
  },
  addTagButtonContainer: {
    flex: 1,
    alignSelf: 'center'
  },
  addTagButton: {
    float: 'right',
    alignSelf: 'center'
  },
  tags: {
    width: '100%',
    alignSelf: 'center',
    height: '100vh',
    [theme.breakpoints.down('sm')]: {
      width: 400
    }
  }
});

export default function TagPage(): React.ReactElement {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { project } = useAppSelector((state) => state.project);
  const [taglist, setTaglist] = useState<Nestable<ITag>[]>([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const nestedList = Utils.parentable2Nestable(project.tags);
    setTaglist(nestedList);
  }, [project.tags]);

  const setNewTagList = (movedItem: Parentable<ITag>, index: number) => {
    const newTagList = [...project.tags];
    const indexOfMoved = newTagList.findIndex(
      (oldItem) => oldItem.id === movedItem.id
    );
    newTagList.splice(indexOfMoved, 1);
    newTagList.splice(index, 0, movedItem);

    dispatch(setTags(newTagList));
    dispatch(putSelectedProjectThunk('dummy'));
  };

  const searchFieldCallback = () => {};
  const tagPageSearch = () => {};

  const classes = useStyles();

  return (
    <>
      <Box className={classes.tagListContainer}>
        <Box className={classes.topContainer}>
          <Box className={classes.searchBarContainer}>
            {' '}
            <DFOSearchBar
              list={project.tags}
              label={t('search for tag')}
              callback={searchFieldCallback}
              searchFunction={tagPageSearch}
            />
          </Box>
          <Box className={classes.addTagButtonContainer}>
            <Button
              className={classes.addTagButton}
              variant="primary"
              onClick={() => {
                setShow(true);
              }}
            >
              {t('add new tag')}
            </Button>
          </Box>
        </Box>

        <Box className={classes.tags}>
          <NestableHierarcyWithAccordion
            dispatchfunc={(item: Parentable<ITag>, index: number) =>
              setNewTagList(item, index)
            }
            inputlist={taglist}
            component={<EditTagForm element={taglist[0]} />}
            depth={5}
          />
        </Box>

        <Dialog
          title={t('add new tag')}
          isOpen={show}
          handleClose={() => setShow(false)}
          children={<NewTagForm handleClose={() => setShow(false)} />}
        />
      </Box>
    </>
  );
}
