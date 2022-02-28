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

export default function TagPage(): React.ReactElement {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { project } = useAppSelector((state) => state.project);
  const [taglist, setTaglist] = useState<Nestable<ITag>[]>([]);

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

  return (
    <>
      <h3 className="mt-3">{t('Tags')}</h3>
      <NewTagForm />
      <NestableHierarcyWithAccordion
        dispatchfunc={(item: Parentable<ITag>, index: number) =>
          setNewTagList(item, index)
        }
        inputlist={taglist}
        component={<EditTagForm element={taglist[0]} />}
        depth={5}
      />
    </>
  );
}
