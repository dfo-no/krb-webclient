import React, { useEffect } from 'react';
import { Route, useHistory, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { selectCodeList } from '../../../store/reducers/selectedCodelist-reducer';
import CodelistPage from './CodelistPage';

interface IRouteParams {
  projectId: string;
  id: string;
}

export default function CodelistGuard(): React.ReactElement {
  const dispatch = useAppDispatch();
  const { project } = useAppSelector((state) => state.project);
  const { codelist } = useAppSelector((state) => state.selectedCodeList);
  const { id } = useParams<IRouteParams>();
  const history = useHistory();

  useEffect(() => {
    if (id !== codelist.id) {
      const index = project.codelist.findIndex((element) => element.id === id);
      if (index !== -1) {
        dispatch(selectCodeList(project.codelist[index]));
      } else {
        history.push(`/workbench/${project.id}/admin/codelist`);
      }
    }
  }, [dispatch, id, project.codelist, codelist.id, history, project.id]);

  return (
    <Route exact path="/workbench/:projectId/admin/codelist/:id">
      <CodelistPage />
    </Route>
  );
}
