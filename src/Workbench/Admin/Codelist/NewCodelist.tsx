import { DevTool } from '@hookform/devtools';
import { joiResolver } from '@hookform/resolvers/joi';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import TextCtrl from '../../../FormProvider/TextCtrl';
import { IAlert } from '../../../models/IAlert';
import {
  ICodelist,
  PostCodelistSchema
} from '../../../Nexus/entities/ICodelist';
import Nexus from '../../../Nexus/Nexus';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { addAlert } from '../../../store/reducers/alert-reducer';
import {
  addCodelist,
  putSelectedProjectThunk
} from '../../../store/reducers/project-reducer';

function NewCodelist(): React.ReactElement {
  const dispatch = useAppDispatch();
  const [validated] = useState(false);
  const { project } = useAppSelector((state) => state.project);
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const nexus = Nexus.getInstance();

  const defaultValues: ICodelist =
    nexus.codelistService.generateDefaultCodelistValues(project.id);

  const methods = useForm<ICodelist>({
    resolver: joiResolver(PostCodelistSchema),
    defaultValues
  });

  const reset = () => {
    methods.reset();
    setShow(false);
  };

  const onNewCodeSubmit = (post: ICodelist) => {
    const newCodelist = nexus.codelistService.createCodelistWithId(post);
    dispatch(addCodelist(newCodelist));
    dispatch(putSelectedProjectThunk('dummy')).then(() => {
      const alert: IAlert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully added codelist'
      };
      dispatch(addAlert({ alert }));
      reset();
    });
  };

  return (
    <>
      <Button variant="primary" onClick={() => setShow(true)}>
        {t('new codelist')}
      </Button>
      {show && (
        <Card className="mb-4">
          <Card.Body>
            <FormProvider {...methods}>
              <Form
                onSubmit={methods.handleSubmit(onNewCodeSubmit)}
                autoComplete="off"
                noValidate
                validated={validated}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    width: 400
                  }}
                >
                  <TextCtrl name="title" label={t('Title')} />
                  <TextCtrl name="description" label={t('Description')} />
                </Box>
                <Button variant="primary" type="submit">
                  {t('save')}
                </Button>
                <Button variant="warning" onClick={() => reset()}>
                  {t('cancel')}
                </Button>
              </Form>
            </FormProvider>
          </Card.Body>
          {process.env.NODE_ENV === 'development' && (
            <DevTool control={methods.control} />
          )}
        </Card>
      )}
    </>
  );
}

export default NewCodelist;
