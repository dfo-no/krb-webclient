import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Parentable } from '../../../models/Parentable';
import NestableHierarcyWithAccordion from '../../Components/NestableHierarchy/NestableHierarcyWithAccordion';
import { INeed } from '../../../Nexus/entities/INeed';
import { Nestable } from '../../../models/Nestable';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  putSelectedProjectThunk,
  setNeeds
} from '../../../store/reducers/project-reducer';
import EditNeedForm from './EditNeedForm';
import NewNeedForm from './NewNeedForm';
import Utils from '../../../common/Utils';

/*
 * @deprecated
 **/
function NeedPage(): React.ReactElement {
  const { project } = useAppSelector((state) => state.project);
  const [needlist, setNeedlist] = useState<Nestable<INeed>[]>([]);

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    const nestedList = Utils.parentable2Nestable(project.needs);
    setNeedlist(nestedList);
  }, [project.needs]);

  const updateNeedList = (newNeedList: Parentable<INeed>[]) => {
    dispatch(setNeeds(newNeedList));
    dispatch(putSelectedProjectThunk('dummy'));
  };

  return (
    <>
      <h3 className="mt-3">{t('Needs')}</h3>

      <NewNeedForm />
      <NestableHierarcyWithAccordion
        dispatchfunc={(items: Parentable<INeed>[]) => updateNeedList(items)}
        inputlist={needlist}
        component={<EditNeedForm element={needlist[0]} />}
        depth={10}
      />
    </>
  );
}

export default NeedPage;
