import React from 'react';
import { Code } from '../../models/Code';
import { Parentable } from '../../models/Parentable';
import NestableHierarcy2 from '../../NestableHierarchy/NestableHierarcy2';
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

  const newListofCodes = (items: Parentable<Code>[]) => {
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
      <NestableHierarcy2
        dispatchfunc={(items: Parentable<Code>[]) => newListofCodes(items)}
        inputlist={codelist.codes}
        component={<EditCodeForm element={codelist.codes[0]} />}
        depth={1}
      />
    </>
  );
}
