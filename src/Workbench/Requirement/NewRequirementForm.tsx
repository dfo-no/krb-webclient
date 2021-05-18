import React, { ReactElement, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useDispatch, useSelector } from 'react-redux';
import Joi from 'joi';

import { v4 as uuidv4 } from 'uuid';
import {
  putProjectThunk,
  setRequirementListToNeed
} from '../../store/reducers/project-reducer';
import { RootState } from '../../store/store';

import { Need } from '../../models/Need';
import { Requirement } from '../../models/Requirement';
import ModelType from '../../models/ModelType';
import RequirementType from '../../models/RequirementType';
import InputRow from '../../Form/InputRow';
import ErrorSummary from '../../Form/ErrorSummary';

type FormValues = {
  title: string;
  description: string;
};
interface IProps {
  toggleShow: React.Dispatch<React.SetStateAction<boolean>>;
  toggleAlert: React.Dispatch<React.SetStateAction<boolean>>;
  need: Need;
  needList: Need[];
  type: RequirementType;
}

const requirementSchema = Joi.object().keys({
  title: Joi.string().required(),
  description: Joi.string().required()
});

function NewRequirementForm({
  toggleShow,
  toggleAlert,
  need,
  needList,
  type
}: IProps): ReactElement {
  const dispatch = useDispatch();
  const [validated] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: joiResolver(requirementSchema)
  });

  const { id } = useSelector((state: RootState) => state.selectedProject);

  if (!id) {
    return <div>Loading Requirementform</div>;
  }

  const onNewRequirementSubmit = (post: FormValues) => {
    const requirement: Requirement = {
      id: uuidv4(),
      title: post.title,
      description: post.description,
      needId: need.id,
      variants: [],
      kind: 'yes/no',
      type: ModelType.requirement,
      requirement_Type: type
    };
    const reqList = [...need.requirements];
    reqList.push(requirement);
    const needIndex = needList.findIndex((element) => element.id === need.id);
    reset();
    dispatch(
      setRequirementListToNeed({
        projectId: id,
        needIndex,
        reqList
      })
    );
    dispatch(putProjectThunk(id));
    reset();
    toggleShow(false);
    toggleAlert(true);
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <Form
          onSubmit={handleSubmit(onNewRequirementSubmit)}
          autoComplete="off"
          noValidate
          validated={validated}
        >
          <InputRow
            name="title"
            control={control}
            label="Title"
            errors={errors}
          />
          <InputRow
            name="description"
            control={control}
            label="Description"
            errors={errors}
          />

          <Row>
            <Button className="mt-2  ml-3" type="submit">
              Save
            </Button>
            <Button
              className="mt-2 ml-3 btn-warning"
              onClick={() => toggleShow(false)}
            >
              Cancel
            </Button>
          </Row>
          <ErrorSummary errors={errors} />
        </Form>
      </Card.Body>
    </Card>
  );
}

export default NewRequirementForm;
