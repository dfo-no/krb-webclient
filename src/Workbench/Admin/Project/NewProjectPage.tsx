import { joiResolver } from '@hookform/resolvers/joi';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import ControlledTextInput from '../../../Form/ControlledTextInput';
import ErrorSummary from '../../../Form/ErrorSummary';
import { IAlert } from '../../../models/IAlert';
import { PostProjectSchema } from '../../../models/Project';
import { IBank } from '../../../Nexus/entities/IBank';
import Nexus from '../../../Nexus/Nexus';
import { useAppDispatch } from '../../../store/hooks';
import { addAlert } from '../../../store/reducers/alert-reducer';
import {
  postProjectThunk,
  selectProject
} from '../../../store/reducers/project-reducer';

export default function NewProjectPage(): React.ReactElement {
  const dispatch = useAppDispatch();
  const [validated] = useState(false);
  const { t } = useTranslation();
  const history = useHistory();
  const nexus = Nexus.getInstance();

  const defaultValues: IBank =
    nexus.projectService.generateDefaultProjectValues();
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<IBank>({
    resolver: joiResolver(PostProjectSchema),
    defaultValues
  });

  const onSubmit = (post: IBank) => {
    dispatch(postProjectThunk(post)).then((response) => {
      const p = response.payload as IBank;
      dispatch(selectProject(p));
      const alert: IAlert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully  created project'
      };
      dispatch(addAlert({ alert }));
      history.push(`/workbench/${p.id}`);
    });
  };

  return (
    <Col sm={8}>
      <h4>Nytt prosjekt</h4>
      <ListGroup className="mt-3">
        <ListGroup.Item>
          <Form
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
            noValidate
            validated={validated}
          >
            <ControlledTextInput
              control={control}
              name="title"
              error={errors.title}
              label={t('Title')}
            />
            <ControlledTextInput
              control={control}
              name="description"
              error={errors.description}
              label={t('Description')}
            />
            <Button className="mt-2" type="submit">
              {t('save')}
            </Button>

            <ErrorSummary errors={errors} />
          </Form>
        </ListGroup.Item>
      </ListGroup>
    </Col>
  );
}
