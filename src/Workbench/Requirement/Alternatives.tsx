import React, { ReactElement, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Utils from '../../common/Utils';
import { Bank } from '../../models/Bank';
import { Need } from '../../models/Need';
import { Requirement } from '../../models/Requirement';
import { RequirementLayout } from '../../models/RequirementLayout';
import { RootState } from '../../store/store';
import {
  CodelistAlternative,
  ValueAlternative
} from '../../models/Alternatives';
import CodeListAlternative from './CodeListAlternative';
import Value from './ValueAlternative';

interface IProps {
  alternatives: (CodelistAlternative | ValueAlternative)[];
}

export default function Alternatives({ alternatives }: IProps): ReactElement {
  const alternativeList = (
    alternativeElements: (CodelistAlternative | ValueAlternative)[]
  ) => {
    const list = alternativeElements.map(
      (element: CodelistAlternative | ValueAlternative) => {
        if (element.type === 'codelistAlternative') {
          return (
            <CodeListAlternative alternative={element as CodelistAlternative} />
          );
        }
        return <Value alternative={element as ValueAlternative} />;
      }
    );
    return <>{list}</>;
  };

  return (
    <Card>
      <Card.Body>
        <Button>New Alternative</Button>
        <p>{alternativeList(alternatives)}</p>
      </Card.Body>
    </Card>
  );
}
