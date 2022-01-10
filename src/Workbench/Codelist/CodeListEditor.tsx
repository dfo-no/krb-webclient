import React from 'react';
import { Parentable } from '../../models/Parentable';
import NestableHierarcy from '../../NestableHierarchy/NestableHierarcy';
import { ICode } from '../../Nexus/entities/ICode';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  putSelectedProjectThunk,
  setCodes
} from '../../store/reducers/project-reducer';
import { setCodesToSelected } from '../../store/reducers/selectedCodelist-reducer';
import EditCodeForm from './EditCodeForm';
import EditCodeListForm from './EditCodeListForm';
import NewCodeForm from './NewCodeForm';

export default function CodeListEditor(): React.ReactElement {
  const dispatch = useAppDispatch();
  const { project } = useAppSelector((state) => state.project);
  const { codelist } = useAppSelector((state) => state.selectedCodeList);

  const newListofCodes = (items: Parentable<ICode>[]) => {
    dispatch(
      setCodes({ id: project.id, codes: items, codelistId: codelist.id })
    );
    dispatch(setCodesToSelected(items));
    dispatch(putSelectedProjectThunk('dummy'));
  };

  return (
    <>
      <EditCodeListForm />
      <NewCodeForm />
      <NestableHierarcy
        dispatchfunc={(items: Parentable<ICode>[]) => newListofCodes(items)}
        inputlist={codelist.codes}
        component={<EditCodeForm element={codelist.codes[0]} />}
        depth={1}
      />
    </>
  );
}
