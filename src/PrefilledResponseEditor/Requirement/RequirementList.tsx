import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { getPaths } from '../../common/Tree';
import { INeed } from '../../models/INeed';
import { Levelable } from '../../models/Levelable';
import { useAppSelector } from '../../store/hooks';
import AnswerForm from './AnswerForm';

export default function RequirementList(): React.ReactElement {
  const { id } = useAppSelector((state) => state.selectedBank);
  const { prefilledResponse } = useAppSelector(
    (state) => state.prefilledResponse
  );

  if (!id) return <p>No selected bank</p>;

  const findNeedIdsForRequirements = (needArray: INeed[]) => {
    const result: string[] = [];
    needArray.forEach((need) => {
      need.requirements.forEach((req) => {
        req.variants.forEach((variant) => {
          if (variant.useSpesification) {
            result.push(need.id);
          }
        });
      });
    });
    return result;
  };

  const needIds = findNeedIdsForRequirements(prefilledResponse.bank.needs);

  const needs = getPaths(needIds, prefilledResponse.bank.needs);

  const checkIfNeedHasRenderedAnswer = (need: Levelable<INeed>) => {
    let used = false;
    need.requirements.forEach((req) => {
      req.variants.forEach((variant) => {
        if (variant.useSpesification && variant.questions.length > 0) {
          used = true;
        }
      });
    });
    return used;
  };

  const renderNeedsList = (list: Levelable<INeed>[]) => {
    return list.map((need) => {
      const margin = need.level === 1 ? '0rem' : `${need.level - 1}rem`;
      return (
        <Card style={{ marginLeft: margin }} key={need.id}>
          <Card.Header>{need.title}</Card.Header>
          {checkIfNeedHasRenderedAnswer(need) && (
            <Card.Body>
              <AnswerForm element={need} />
            </Card.Body>
          )}
        </Card>
      );
    });
  };

  return (
    <Container fluid>
      <Row className="mt-4">
        <h4>Requirements</h4>
      </Row>
      <Row className="m-4" />
      {renderNeedsList(needs)}
    </Container>
  );
}
