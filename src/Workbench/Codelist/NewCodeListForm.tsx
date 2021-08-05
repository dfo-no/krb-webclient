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
import { Codelist } from '../../models/Codelist';
import ModelType from '../../models/ModelType';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  addCodelist,
  putProjectThunk
} from '../../store/reducers/project-reducer';

type FormValues = {
  title: string;
  description: string;
};
interface IProps {
  toggleShow: React.Dispatch<React.SetStateAction<boolean>>;
  toggleAlert: React.Dispatch<React.SetStateAction<boolean>>;
}

const codeListSchema = Joi.object().keys({
  title: Joi.string().required(),
  description: Joi.string().allow(null, '').required()
});

function NewCodeListForm({ toggleShow, toggleAlert }: IProps): ReactElement {
  const dispatch = useAppDispatch();
  const [validated] = useState(false);
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: joiResolver(codeListSchema)
  });

  const { id } = useAppSelector((state) => state.selectedProject);

  if (!id) {
    return <div>Loading Productform</div>;
  }

  const onNewCodeSubmit = (post: FormValues) => {
    const codeList: Codelist = {
      id: uuidv4(),
      title: post.title,
      description: post.description,
      codes: [],
      type: ModelType.codelist
    };
    dispatch(addCodelist({ id, codelist: codeList }));
    dispatch(putProjectThunk(id));
    reset();
    toggleShow(false);
    toggleAlert(true);
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <Form
          onSubmit={handleSubmit(onNewCodeSubmit)}
          autoComplete="off"
          noValidate
          validated={validated}
        >
          <InputRow
            control={control}
            name="title"
            errors={errors}
            label={t('Title')}
          />
          <InputRow
            control={control}
            name="description"
            errors={errors}
            label={t('Description')}
          />
          <Row>
            <Button className="mt-2  ml-3" type="submit">
              {t('save')}
            </Button>
            <Button
              className="mt-2 ml-3 btn-warning"
              onClick={() => toggleShow(false)}
            >
              {t('cancel')}
            </Button>
          </Row>
          <ErrorSummary errors={errors} />
        </Form>
      </Card.Body>
    </Card>
  );
}

export default NewCodeListForm;
