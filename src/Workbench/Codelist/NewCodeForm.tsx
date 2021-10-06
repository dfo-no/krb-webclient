import { joiResolver } from '@hookform/resolvers/joi';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import ErrorSummary from '../../Form/ErrorSummary';
import InputRow from '../../Form/InputRow';
import { Alert } from '../../models/Alert';
import { Code, PostCodeSchema } from '../../models/Code';
import Nexus from '../../Nexus/Nexus';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addAlert } from '../../store/reducers/alert-reducer';
import {
  addCodeToCodelist,
  putSelectedProjectThunk
} from '../../store/reducers/project-reducer';
import { addCodeToSelected } from '../../store/reducers/selectedCodelist-reducer';

function NewCodeForm(): React.ReactElement {
  const { codelist } = useAppSelector((state) => state.selectedCodeList);
  const { project } = useAppSelector((state) => state.project);
  const dispatch = useAppDispatch();
  const [validated] = useState(false);
  const [show, setShow] = useState(false);
  const { t } = useTranslation();
  const nexus = Nexus.getInstance();
  const codelistService = nexus.getCodelistService();

  const defaultValues: Code = codelistService.generateDefaultCodeValues(
    project.id
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Code>({
    resolver: joiResolver(PostCodeSchema),
    defaultValues
  });

  const onSubmit = (post: Code) => {
    const alert: Alert = {
      id: uuidv4(),
      style: 'success',
      text: 'Successfully added code'
    };
    const code = codelistService.generateCode(post);
    dispatch(
      addCodeToCodelist({
        codelistId: codelist.id,
        code
      })
    );
    dispatch(addCodeToSelected(code));
    dispatch(putSelectedProjectThunk('dummy')).then(() => {
      dispatch(addAlert({ alert }));
      reset();
      setShow(false);
    });
  };

  return (
    <>
      <h5>Codes</h5>
      <Button onClick={() => setShow(true)} className="mb-4">
        New Code
      </Button>
      {show && (
        <Card className="mb-4">
          <Card.Body>
            <Form
              onSubmit={handleSubmit(onSubmit)}
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
              <Button className="mt-2  ml-3" type="submit">
                {t('save')}
              </Button>
              <Button
                className="mt-2 ml-3 btn-warning"
                onClick={() => setShow(false)}
              >
                {t('cancel')}
              </Button>
              <ErrorSummary errors={errors} />
            </Form>
          </Card.Body>
        </Card>
      )}
    </>
  );
}

export default NewCodeForm;
