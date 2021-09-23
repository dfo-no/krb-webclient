import { joiResolver } from '@hookform/resolvers/joi';
import React, { ReactElement, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import ErrorSummary from '../../Form/ErrorSummary';
import InputRow from '../../Form/InputRow';
import { Bank } from '../../models/Bank';
import { EditProjectSchema } from '../../models/Project';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { putProjectThunk } from '../../store/reducers/project-reducer';

interface IProps {
  toggleShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditProjectForm({ toggleShow }: IProps): ReactElement {
  const dispatch = useAppDispatch();
  const { project } = useAppSelector((state) => state.project);
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
    // TODO: Check if Omit still posts needs, and Joi catches the potensial error
  } = useForm<Omit<Bank, 'needs'>>({
    resolver: joiResolver(EditProjectSchema),
    defaultValues: project
  });

  // Spread object so RHF can register all properties
  useEffect(() => {
    if (project) {
      reset(JSON.parse(JSON.stringify(project)));
    }
  }, [project, reset]);

  const onEditProjectSubmit = (post: Bank) => {
    dispatch(putProjectThunk(post)).then(() => {
      toggleShow(false);
    });
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <Form onSubmit={handleSubmit(onEditProjectSubmit)}>
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
          <Button className="mt-2  ml-3" type="submit">
            {t('save')}
          </Button>
          <Button
            className="mt-2 ml-3 btn-warning"
            onClick={() => toggleShow(false)}
          >
            {t('cancel')}
          </Button>
          <ErrorSummary errors={errors} />
        </Form>
      </Card.Body>
    </Card>
  );
}
