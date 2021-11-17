import React from 'react';
import { useTranslation } from 'react-i18next';
import { Parentable } from '../../models/Parentable';
import NestableHierarcy from '../../NestableHierarchy/NestableHierarcy';
import { INeed } from '../../Nexus/entities/INeed';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  putSelectedProjectThunk,
  setNeeds
} from '../../store/reducers/project-reducer';
import EditNeedForm from './EditNeedForm';
import NewNeedForm from './NewNeedForm';

function NeedPage(): React.ReactElement {
  const { project } = useAppSelector((state) => state.project);

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const newNeedList = (projectId: string, needs: Parentable<INeed>[]) => {
    dispatch(setNeeds(needs));
    dispatch(putSelectedProjectThunk('dummy'));
  };

  return (
    <>
      <h3 className="mt-3">{t('Needs')}</h3>

      <NewNeedForm />
      <NestableHierarcy
        dispatchfunc={(projectId: string, items: Parentable<INeed>[]) =>
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
