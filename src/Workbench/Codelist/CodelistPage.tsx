import React, { ReactElement, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import { useTranslation } from 'react-i18next';
import { BsPencil } from 'react-icons/bs';
import { Link, useRouteMatch } from 'react-router-dom';
import Utils from '../../common/Utils';
import { Bank } from '../../models/Bank';
import { Codelist } from '../../models/Codelist';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getProjectsThunk } from '../../store/reducers/project-reducer';
import { selectCodeList } from '../../store/reducers/selectedCodelist-reducer';
import { selectProject } from '../../store/reducers/selectedProject-reducer';
import SuccessAlert from '../SuccessAlert';
import NewCodeListForm from './NewCodeListForm';

interface RouteParams {
  projectId: string;
}

export default function CodelistPage(): ReactElement {
  const projectMatch = useRouteMatch<RouteParams>(
    '/workbench/:projectId/codelist'
  );
  const dispatch = useAppDispatch();

  if (projectMatch?.params.projectId) {
    dispatch(selectProject(projectMatch?.params.projectId));
  }

  const { list } = useAppSelector((state) => state.project);
  const { id } = useAppSelector((state) => state.selectedProject);
  const [toggleEditor, setToggleEditor] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const { t } = useTranslation();

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
      <h3 className="mt-3">{t('Codelists')}</h3>
      <Button className="mb-4" onClick={() => setToggleEditor(true)}>
        {t('new codelist')}
      </Button>
      {showAlert && <SuccessAlert toggleShow={setShowAlert} type="codelist" />}
      {newCodeList(toggleEditor)}
      {renderCodelist(selectedProject.codelist)}
    </>
  );
}
