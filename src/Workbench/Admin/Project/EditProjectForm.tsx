import { joiResolver } from '@hookform/resolvers/joi';
import Button from '@mui/material/Button';
import { get } from 'lodash';
import React, { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { FieldError, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import ControlledTextInput from '../../../Form/ControlledTextInput';
import ErrorSummary from '../../../Form/ErrorSummary';
import { IAlert } from '../../../models/IAlert';
import { EditProjectSchema } from '../../../models/Project';
import { IBank } from '../../../Nexus/entities/IBank';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { addAlert } from '../../../store/reducers/alert-reducer';
import { putProjectThunk } from '../../../store/reducers/project-reducer';

interface IProps {
  toggleShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditProjectForm({
  toggleShow
}: IProps): React.ReactElement {
  const dispatch = useAppDispatch();
  const { project } = useAppSelector((state) => state.project);
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
    // TODO: Check if Omit still posts needs, and Joi catches the potensial error
  } = useForm<IBank>({
    resolver: joiResolver(EditProjectSchema),
    defaultValues: project
  });

  // Spread object so RHF can register all properties
  useEffect(() => {
    if (project) {
      reset(JSON.parse(JSON.stringify(project)));
    }
  }, [project, reset]);

  const onSubmit = (post: IBank) => {
    dispatch(putProjectThunk(post)).then(() => {
      const alert: IAlert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully updated projectt'
      };
      dispatch(addAlert({ alert }));
      toggleShow(false);
    });
  };

  const onReset = () => {
    reset();
    toggleShow(false);
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <ControlledTextInput
            control={control}
            name="title"
            error={get(errors, `title`) as FieldError}
            label={t('Title')}
          />
          <ControlledTextInput
            control={control}
            name="description"
            error={get(errors, `description`) as FieldError}
            label={t('Description')}
          />
          <Button variant="primary" type="submit">
            {t('save')}
          </Button>
          <Button variant="primary" onClick={() => onReset()}>
            {t('cancel')}
          </Button>
          <ErrorSummary errors={errors} />
        </Form>
      </Card.Body>
    </Card>
  );
}
