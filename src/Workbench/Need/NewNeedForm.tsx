import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import React, { ReactElement, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import ErrorSummary from '../../Form/ErrorSummary';
import InputRow from '../../Form/InputRow';
import ModelType from '../../models/ModelType';
import { Need } from '../../models/Need';
import { Nestable } from '../../models/Nestable';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addNeed, putProjectThunk } from '../../store/reducers/project-reducer';

type FormValues = {
  title: string;
  description: string;
};
interface IProps {
  toggleShow: React.Dispatch<React.SetStateAction<boolean>>;
  toggleAlert: React.Dispatch<React.SetStateAction<boolean>>;
}

const needSchema = Joi.object().keys({
  title: Joi.string().required(),
  description: Joi.string().allow(null, '').required()
});

function NewNeedForm({ toggleShow, toggleAlert }: IProps): ReactElement {
  const dispatch = useAppDispatch();
  const [validated] = useState(false);
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: joiResolver(needSchema)
  });

  const { id } = useAppSelector((state) => state.selectedProject);

  if (!id) {
    return <div>Loading NeedForm</div>;
  }

  const onNewNeedSubmit = (post: FormValues) => {
    const need: Nestable<Need> = {
      // TODO: remove uuidv4, this should be CosmosDB's task (perhaps by reference)
      id: uuidv4(),
      title: post.title,
      description: post.description,
      requirements: [],
      type: ModelType.need,
      parent: ''
    };
    dispatch(addNeed({ id, need }));
    dispatch(putProjectThunk(id));

    // reset the form
    reset();
    toggleShow(false);
    toggleAlert(true);
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <Form
          onSubmit={handleSubmit(onNewNeedSubmit)}
          autoComplete="off"
          noValidate
          validated={validated}
        >
          <InputRow
            control={control}
            name="title"
            label={t('Title')}
            errors={errors}
          />
          <InputRow
            control={control}
            name="description"
            label={t('Description')}
            errors={errors}
          />
          <Row>
            <Button className="mt-2  ml-3" type="submit">
              {t('save')}
            </Button>
            <Button
              className="mt-2 ml-3 btn-warning"
              onClick={() => toggleShow(false)}
            >
              Avbryt
            </Button>
          </Row>
          <ErrorSummary errors={errors} />
        </Form>
      </Card.Body>
    </Card>
  );
}

export default NewNeedForm;
