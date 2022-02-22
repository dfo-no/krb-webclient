import { joiResolver } from '@hookform/resolvers/joi';
import Button from '@mui/material/Button';
import { get } from 'lodash';
import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { FieldError, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import ControlledTextInput from '../../../Form/ControlledTextInput';
import ErrorSummary from '../../../Form/ErrorSummary';
import { IAlert } from '../../../models/IAlert';
import { Parentable } from '../../../models/Parentable';
import { INeed, PostNeedSchema } from '../../../Nexus/entities/INeed';
import Nexus from '../../../Nexus/Nexus';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { addAlert } from '../../../store/reducers/alert-reducer';
import {
  addNeed,
  putSelectedProjectThunk
} from '../../../store/reducers/project-reducer';

/**
 * @deprecated use Admin/Create/NewNeedForm instead
 */
function NewNeedForm(): React.ReactElement {
  const dispatch = useAppDispatch();
  const { project } = useAppSelector((state) => state.project);
  const [show, setShow] = useState(false);
  const { t } = useTranslation();
  const nexus = Nexus.getInstance();

  const defaultValues: Parentable<INeed> =
    nexus.needService.generateDefaultNeedValues(project.id);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Parentable<INeed>>({
    resolver: joiResolver(PostNeedSchema),
    defaultValues
  });

  const onSubmit = (post: Parentable<INeed>) => {
    const need = nexus.needService.createNeedWithId(post);
    const alert: IAlert = {
      id: uuidv4(),
      style: 'success',
      text: 'Successfully added new need'
    };
    dispatch(addNeed(need));
    dispatch(putSelectedProjectThunk('dummy')).then(() => {
      dispatch(addAlert({ alert }));
      setShow(false);
      reset();
    });
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={() => {
          setShow(true);
        }}
      >
        {t('new need')}
      </Button>
      {show && (
        <Card className="mb-4">
          <Card.Body>
            <form
              onSubmit={handleSubmit(onSubmit)}
              autoComplete="off"
              noValidate
            >
              <ControlledTextInput
                control={control}
                name="title"
                label={t('Title')}
                error={get(errors, `title`) as FieldError}
              />
              <ControlledTextInput
                control={control}
                name="description"
                label={t('Description')}
                error={get(errors, `description`) as FieldError}
              />
              <Button variant="primary" type="submit">
                {t('save')}
              </Button>
              <Button variant="warning" onClick={() => setShow(false)}>
                Avbryt
              </Button>
              <ErrorSummary errors={errors} />
            </form>
          </Card.Body>
        </Card>
      )}
    </>
  );
}

export default NewNeedForm;
