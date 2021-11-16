import React from 'react';
import { useTranslation } from 'react-i18next';
import { Parentable } from '../../models/Parentable';
import { Tag } from '../../models/Tag';
import NestableHierarcy2 from '../../NestableHierarchy/NestableHierarcy2';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  putSelectedProjectThunk,
  setTags
} from '../../store/reducers/project-reducer';
import EditTagForm from './EditTagForm';
import NewTagForm from './NewTagForm';

export default function TagPage(): React.ReactElement {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { project } = useAppSelector((state) => state.project);

  const newTagList = (items: Parentable<Tag>[]) => {
    dispatch(setTags(items));
    dispatch(putSelectedProjectThunk('dummy'));
  };

  return (
    <>
      <h3 className="mt-3">{t('Tags')}</h3>
      <NewTagForm />
      <NestableHierarcy2
        dispatchfunc={(items: Parentable<Tag>[]) => newTagList(items)}
        inputlist={project.tags}
        component={<EditTagForm element={project.tags[0]} />}
        depth={5}
      />
    </>
  );
}
