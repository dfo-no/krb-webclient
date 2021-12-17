import React, { useEffect, useState } from 'react';
import { Route, useParams } from 'react-router-dom';
import LoaderSpinner from '../common/LoaderSpinner';
import { useAppDispatch } from '../store/hooks';
import { getBanksThunk } from '../store/reducers/bank-reducer';
import { selectBank } from '../store/reducers/selectedBank-reducer';
import SpecEditor from './SpecEditor/SpecEditor';

interface IRouteParams {
  id: string;
}

export default function SpecificationGuard(): React.ReactElement {
  const dispatch = useAppDispatch();

  const [isLoading, setLoading] = useState(false);

  const { id } = useParams<IRouteParams>();

  useEffect(() => {
    async function doAsyncWork() {
      if (id) {
        setLoading(true);
        dispatch(selectBank(id));
        dispatch(getBanksThunk()).then(() => {
          setLoading(false);
        });
      }
    }
    doAsyncWork();
  }, [dispatch, id]);

  if (isLoading) {
    return <LoaderSpinner variant="danger" />;
  }

  return (
    <>
      <Route exact path="/specification/:id">
        <SpecEditor />
      </Route>
    </>
  );
}
