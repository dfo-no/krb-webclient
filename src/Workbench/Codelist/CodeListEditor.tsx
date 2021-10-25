/* eslint-disable @typescript-eslint/no-shadow */
import React from 'react';
import { Code } from '../../models/Code';
import NestableHierarcy from '../../NestableHierarchy/NestableHierarcy';
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

  const newListofCodes = (pId: string, items: Code[]) => {
    dispatch(setCodes({ id: pId, codes: items, codelistId: codelist.id }));
    dispatch(setCodesToSelected(items));
    dispatch(putSelectedProjectThunk('dummy'));
  };

  return (
    <>
      <EditCodeListForm />
      <NewCodeForm />
      <NestableHierarcy
        dispatchfunc={(projectId: string, items: Code[]) =>
          newListofCodes(projectId, items)
        }
        inputlist={codelist.codes}
        projectId={project.id}
        component={<EditCodeForm element={codelist.codes[0]} />}
        depth={1}
      />
    </>
  );
}
