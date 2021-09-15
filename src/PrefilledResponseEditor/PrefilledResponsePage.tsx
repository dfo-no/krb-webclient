import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';

export default function SpecPage(): React.ReactElement {
  const { id } = useAppSelector((state) => state.selectedBank);
  const { t } = useTranslation();

  if (!id) {
    return (
      <Row className="mt-4">
        <Col sm={3} />

        <Col sm={3}>
          <h4>Select Bank from Hub</h4>
          <Link to="/">
            <Button>Go to Hub</Button>
          </Link>
        </Col>
        <Col />

        <Col sm={3} />
      </Row>
    );
  }

  return (
    <Row className="mt-4">
      <Col sm={3} />
      <Col sm={3}>
        <Link to={`/prefilledresponse/${id}`}>
          <Button type="submit" className="mt-4">
            {t('create specification')}
          </Button>
        </Link>
      </Col>
    </Row>
  );
}
