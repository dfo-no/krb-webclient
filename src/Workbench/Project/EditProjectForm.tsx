import { joiResolver } from '@hookform/resolvers/joi';
import React, { ReactElement, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import ErrorSummary from '../../Form/ErrorSummary';
import InputRow from '../../Form/InputRow';
import { Bank, BaseBankSchema } from '../../models/Bank';
import { useAppDispatch } from '../../store/hooks';
import { putProjectThunk } from '../../store/reducers/project-reducer';

interface IProps {
  project: Bank;
  toggleShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditProjectForm({
  project,
  toggleShow
}: IProps): ReactElement {
  const dispatch = useAppDispatch();
  const [validated] = useState(false);
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<Bank>({
    resolver: joiResolver(BaseBankSchema),
    defaultValues: project
  });

  const onEditProjectSubmit = (post: Bank) => {
    dispatch(putProjectThunk(post)).then(() => {
      toggleShow(false);
    });
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <Form
          onSubmit={handleSubmit(onEditProjectSubmit)}
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
