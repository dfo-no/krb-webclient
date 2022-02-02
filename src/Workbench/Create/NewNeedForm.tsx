import { joiResolver } from '@hookform/resolvers/joi';
import Button from '@mui/material/Button';
import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import TextCtrl from '../../FormProvider/TextCtrl';
import { IAlert } from '../../models/IAlert';
import { Parentable } from '../../models/Parentable';
import { INeed, PostNeedSchema } from '../../Nexus/entities/INeed';
import Nexus from '../../Nexus/Nexus';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addAlert } from '../../store/reducers/alert-reducer';
import {
  addNeed,
  putSelectedProjectThunk
} from '../../store/reducers/project-reducer';

interface IProps {
  handleClose: () => void;
}

function NewNeedForm({ handleClose }: IProps): React.ReactElement {
  const dispatch = useAppDispatch();
  const { project } = useAppSelector((state) => state.project);
  const { t } = useTranslation();
  const nexus = Nexus.getInstance();

  const defaultValues: Parentable<INeed> =
    nexus.needService.generateDefaultNeedValues(project.id);

  const methods = useForm<Parentable<INeed>>({
    resolver: joiResolver(PostNeedSchema),
    defaultValues
  });

  const onSubmit = (post: Parentable<INeed>) => {
    const need = nexus.needService.createNeedWithId(post);
    dispatch(addNeed(need));
    dispatch(putSelectedProjectThunk('dummy')).then(() => {
      const alert: IAlert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully added new need'
      };
      dispatch(addAlert({ alert }));
      methods.reset();
      handleClose();
    });
  };

  return (
    <FormProvider {...methods}>
      <Card className="mb-4">
        <Card.Body>
          <Form
            onSubmit={methods.handleSubmit(onSubmit)}
            autoComplete="off"
            noValidate
          >
            <TextCtrl name="title" label={t('Title')} />
            <TextCtrl name="description" label={t('Description')} />
            <Button variant="primary" type="submit">
              {t('save')}
            </Button>
            <Button variant="warning" onClick={handleClose}>
              {t('cancel')}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </FormProvider>
  );
}

export default NewNeedForm;
