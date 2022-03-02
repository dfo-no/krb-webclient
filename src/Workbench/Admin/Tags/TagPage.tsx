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
import { StandardContainer } from '../../Components/StandardContainer';
import {
  NewButtonContainer,
  SearchContainer,
  SearchFieldContainer
} from '../../Components/SearchContainer';

const useStyles = makeStyles({
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
      <StandardContainer>
        <SearchContainer>
          <SearchFieldContainer>
            {' '}
            <DFOSearchBar
              list={project.tags}
              label={t('search for tag')}
              callback={searchFieldCallback}
              searchFunction={tagPageSearch}
            />
          </SearchFieldContainer>
          <NewButtonContainer>
            <Button
              variant="primary"
              onClick={() => {
                setShow(true);
              }}
            >
              {t('add new tag')}
            </Button>
          </NewButtonContainer>
        </SearchContainer>

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
      </StandardContainer>
    </>
  );
}
