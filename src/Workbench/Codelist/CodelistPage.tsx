import React, { ReactElement, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import { BsPencil } from 'react-icons/bs';

import { RootState } from '../../store/store';
import { Codelist } from '../../models/Codelist';
import { selectCodeList } from '../../store/reducers/selectedCodelist-reducer';
import Utils from '../../common/Utils';
import { Bank } from '../../models/Bank';
import NewCodeListForm from './NewCodeListForm';
import SuccessAlert from '../SuccessAlert';
import { getProjectsThunk } from '../../store/reducers/project-reducer';
import { selectProject } from '../../store/reducers/selectedProject-reducer';

interface RouteParams {
  projectId: string;
}

export default function CodelistPage(): ReactElement {
  const projectMatch = useRouteMatch<RouteParams>(
    '/workbench/:projectId/codelist'
  );
  const dispatch = useDispatch();

  if (projectMatch?.params.projectId) {
    dispatch(selectProject(projectMatch?.params.projectId));
  }

  const { list } = useSelector((state: RootState) => state.project);
  const { id } = useSelector((state: RootState) => state.selectedProject);
  const [toggleEditor, setToggleEditor] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  // TODO: make environment variable of 2000
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [showAlert]);

  useEffect(() => {
    async function fetchEverything() {
      setTimeout(async () => {
        await dispatch(getProjectsThunk());
      }, 10);
    }
    if (!list) {
      fetchEverything();
    }
  }, [dispatch, list]);

  if (list.length === 0 || !id) {
    return <p>Loading codelist Page...</p>;
  }

  const selectedProject = Utils.ensure(
    list.find((bank: Bank) => bank.id === id)
  );

  const setSelectedKodeliste = (selectedCodelistId: string) => () => {
    dispatch(selectCodeList(selectedCodelistId));
  };

  const renderCodelist = (codelist: Codelist[]) => {
    const sorted = codelist
      .slice()
      .sort((a, b) => (a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1));
    return sorted.map((element: Codelist) => {
      return (
        <Card className="bg-light mb-2" key={element.id}>
          <Card.Header className="pb-1 pt-1">
            <Row className="d-flex justify-content-between mr-2">
              <h6 className="ml-2">
                {Utils.capitalizeFirstLetter(element.title)}
              </h6>
              <Link
                onClick={setSelectedKodeliste(element.id)}
                to={`/workbench/${selectedProject.id}/codelist/${element.id}`}
              >
                <BsPencil />
              </Link>
            </Row>
            <Row>
              <p className="ml-2 p-0">{element.description}</p>
            </Row>
          </Card.Header>
        </Card>
      );
    });
  };

  function newCodeList(show: boolean) {
    if (show) {
      return (
        <NewCodeListForm
          toggleAlert={setShowAlert}
          toggleShow={setToggleEditor}
        />
      );
    }
    return <></>;
  }

  return (
    <>
      <h3 className="mt-3">Codelists</h3>
      <Button className="mb-4" onClick={() => setToggleEditor(true)}>
        New Codelist
      </Button>
      {showAlert && <SuccessAlert toggleShow={setShowAlert} type="codelist" />}
      {newCodeList(toggleEditor)}
      {renderCodelist(selectedProject.codelist)}
    </>
  );
}
