import { joiResolver } from '@hookform/resolvers/joi';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Utils from '../../common/Utils';
import ErrorSummary from '../../Form/ErrorSummary';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import ModelType from '../../models/ModelType';
import { ICode } from '../../Nexus/entities/ICode';
import {
  CodelistQuestionSchema,
  ICodelistQuestion
} from '../../Nexus/entities/ICodelistQuestion';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  addAnswer,
  addProductAnswer
} from '../../store/reducers/spesification-reducer';

interface IProps {
  parentAnswer: IRequirementAnswer;
}

export default function CodelistForm({
  parentAnswer
}: IProps): React.ReactElement {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ICodelistQuestion>({
    resolver: joiResolver(CodelistQuestionSchema),
    defaultValues: {
      ...(parentAnswer.question as ICodelistQuestion)
    }
  });
  const { spec } = useAppSelector((state) => state.specification);
  const q = parentAnswer.question as ICodelistQuestion;
  const { selectedSpecificationProduct } = useAppSelector(
    (state) => state.selectedSpecProduct
  );
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const codelist = Utils.ensure(
    spec.bank.codelist.find((list) => list.id === q.config.codelist)
  );

  const [mandatoryCodeList, setMandatoryCode] = useState(
    q.config.mandatoryCodes.length > 0
  );

  const [optionalCodeList, setOptionalCode] = useState(
    q.config.optionalCodes.length > 0
  );

  const [selectionOfoptionalCodes, setSelectionOfOptionalCodes] = useState(
    codelist.codes.length - q.config.mandatoryCodes.length !==
      q.config.optionalCodes.length
  );

  const [allOptionalCodes, setAllOptional] = useState(
    !selectionOfoptionalCodes
  );

  if (!selectedSpecificationProduct && parentAnswer.type === 'product') {
    return <p>No product selected</p>;
  }

  const createOptionalCodelist = (mandatoryList: string[]) => {
    const nonMandatoryCodes: string[] = [];
    codelist.codes.forEach((element) => {
      if (!mandatoryList.includes(element.id)) {
        nonMandatoryCodes.push(element.id);
      }
    });
    return nonMandatoryCodes;
  };

  const checkListDoesNotContainSameCodes = (
    mandatory: string[],
    optional: string[]
  ) => {
    const newOptionalList = optional;
    mandatory.forEach((element) => {
      if (optional.includes(element)) {
        const index = newOptionalList.findIndex((e) => e === element);
        newOptionalList.splice(index, 1);
      }
    });
    return newOptionalList;
  };

  const saveValues = (post: ICodelistQuestion) => {
    let { optionalCodes } = post.config;
    let { mandatoryCodes } = post.config;

    if (!mandatoryCodeList) {
      mandatoryCodes = [];
    }

    if (allOptionalCodes && optionalCodeList) {
      optionalCodes = createOptionalCodelist(mandatoryCodes);
    }
    const newAnswer = {
      ...parentAnswer
    };
    const newAlt = { ...post };
    newAlt.config.mandatoryCodes = mandatoryCodes;
    newAlt.config.optionalCodes = checkListDoesNotContainSameCodes(
      mandatoryCodes,
      optionalCodes
    );

    newAnswer.question = newAlt;

    if (newAnswer.type === ModelType.requirement)
      dispatch(addAnswer({ answer: newAnswer }));
    if (newAnswer.type === ModelType.product && selectedSpecificationProduct)
      dispatch(
        addProductAnswer({
          answer: newAnswer,
          productId: selectedSpecificationProduct.id
        })
      );
  };

  const mandatoryCodeOptions = () => {
    return codelist.codes.map((element: ICode) => (
      <option key={element.id} value={element.id}>
        {element.title}
      </option>
    ));
  };

  const optionalCodeOptions = () => {
    return codelist.codes.map((element: ICode) => {
      if (!q.config.mandatoryCodes.includes(element.id)) {
        return (
          <option key={element.id} value={element.id}>
            {element.title}
          </option>
        );
      }
      return <></>;
    });
  };

  const onChangeOptional = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOptionalCode(e.target.checked);
    if (e.target.checked) {
      setSelectionOfOptionalCodes(false);
      setAllOptional(false);
    }
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <h6>Alternative: Codelist</h6>
        <Form onSubmit={handleSubmit(saveValues)}>
          <Row>
            <Col>
              <Row>
                <Form.Check
                  checked={mandatoryCodeList}
                  onChange={(e) => setMandatoryCode(e.target.checked)}
                  label="Bruk obligatoriske koder "
                />
              </Row>
              <Row>
                {mandatoryCodeList && (
                  <Form.Control
                    as="select"
                    {...register(`config.mandatoryCodes` as const)}
                    multiple
                  >
                    {mandatoryCodeOptions()}
                  </Form.Control>
                )}
              </Row>
            </Col>
            <Col>
              <Row>
                <Form.Check
                  checked={optionalCodeList}
                  onChange={(e) => onChangeOptional(e)}
                  label="Bruk valgfrie koder"
                />
              </Row>
              <Row>
                {optionalCodeList && (
                  <>
                    <Col className="p-0">
                      <Form.Check
                        checked={selectionOfoptionalCodes}
                        onChange={(e) => {
                          setSelectionOfOptionalCodes(e.target.checked);
                          setAllOptional(!e.target.checked);
                        }}
                        label="Utvalgte valgrie koder "
                      />
                    </Col>
                    <Col>
                      <Form.Check
                        checked={allOptionalCodes}
                        onChange={(e) => {
                          setAllOptional(e.target.checked);
                          setSelectionOfOptionalCodes(!e.target.checked);
                        }}
                        label="Alle koder "
                      />
                    </Col>

                    <Row>
                      <Col>
                        <Form.Label>Minimum</Form.Label>
                        <Form.Control
                          as="input"
                          {...register(`config.optionalCodeMinAmount` as const)}
                          type="number"
                        />
                      </Col>
                      <Col>
                        <Form.Label>Maksimum</Form.Label>
                        <Form.Control
                          as="input"
                          {...register(`config.optionalCodeMaxAmount` as const)}
                          type="number"
                        />
                      </Col>
                    </Row>
                  </>
                )}
              </Row>

              <Row>
                {selectionOfoptionalCodes && optionalCodeList && (
                  <>
                    <Row className="mt-3">
                      <Form.Control
                        as="select"
                        {...register(`config.optionalCodes` as const)}
                        multiple
                      >
                        {optionalCodeOptions()}
                      </Form.Control>
                    </Row>
                  </>
                )}
              </Row>
            </Col>
          </Row>
          <Button type="submit">{t('save')}</Button>
          <ErrorSummary errors={errors} />
        </Form>
      </Card.Body>
    </Card>
  );
}
