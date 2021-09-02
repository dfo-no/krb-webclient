import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { Need } from '../../models/Need';
import { Nestable } from '../../models/Nestable';
import NestableHierarcy from '../../NestableHierarchy/Nestable';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  putSelectedProjectThunk,
  setNeeds
} from '../../store/reducers/project-reducer';
import EditNeedForm from './EditNeedForm';
import NewNeedForm from './NewNeedForm';

function NeedPage(): ReactElement {
  const { project } = useAppSelector((state) => state.project);

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const newNeedList = (projectId: string, needs: Nestable<Need>[]) => {
    dispatch(setNeeds(needs));
    dispatch(putSelectedProjectThunk('dummy'));
  };

  return (
    <>
      <h3 className="mt-3">{t('Needs')}</h3>

      <NewNeedForm />
      <NestableHierarcy
        dispatchfunc={(projectId: string, items: Nestable<Need>[]) =>
          newNeedList(projectId, items)
        }
        inputlist={project.needs}
        projectId={project.id}
        component={<EditNeedForm element={project.needs[0]} />}
        depth={10}
      />
    </>
  );
}

export default NeedPage;
