import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import { BsPencilSquare } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Utils from '../../common/Utils';
import { ICodelist } from '../../models/ICodelist';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectCodeList } from '../../store/reducers/selectedCodelist-reducer';

function CodelistList(): React.ReactElement {
  const { project } = useAppSelector((state) => state.project);
  const dispatch = useAppDispatch();

  const renderList = () => {
    const sorted = project.codelist
      .slice()
      .sort((a, b) => (a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1));
    return sorted.map((element: ICodelist) => {
      return (
        <Card className="bg-light mb-2" key={element.id}>
          <Card.Header className="pb-1 pt-1">
            <Row className="d-flex justify-content-between mr-2">
              <h6 className="ml-2">
                {Utils.capitalizeFirstLetter(element.title)}
              </h6>
              {element.sourceRel === null && (
                <Link
                  onClick={() => dispatch(selectCodeList(element))}
                  to={`/workbench/${project.id}/codelist/${element.id}`}
                >
                  <BsPencilSquare />
                </Link>
              )}
            </Row>
            <Row>
              <p className="ml-2 p-0">{element.description}</p>
            </Row>
          </Card.Header>
        </Card>
      );
    });
  };

  return <>{renderList()}</>;
}

export default CodelistList;
