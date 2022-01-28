import { joiResolver } from '@hookform/resolvers/joi';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import { get } from 'lodash';
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { FieldError, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import AlertModal from '../../../common/AlertModal';
import ControlledTextInput from '../../../Form/ControlledTextInput';
import ErrorSummary from '../../../Form/ErrorSummary';
import { IAlert } from '../../../models/IAlert';
import QuestionEnum from '../../../models/QuestionEnum';
import { CodelistSchema, ICodelist } from '../../../Nexus/entities/ICodelist';
import { ICodelistQuestion } from '../../../Nexus/entities/ICodelistQuestion';
import { INeed } from '../../../Nexus/entities/INeed';
import {
  IAnswerBase,
  IConfigBase,
  IQuestionBase
} from '../../../Nexus/entities/IQuestionBase';
import { IRequirement } from '../../../Nexus/entities/IRequirement';
import { IVariant } from '../../../Nexus/entities/IVariant';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { addAlert } from '../../../store/reducers/alert-reducer';
import {
  deleteCodelist,
  editSelectedCodelist,
  putSelectedProjectThunk
} from '../../../store/reducers/project-reducer';
import { editCodelist } from '../../../store/reducers/selectedCodelist-reducer';

function EditCodeListForm(): React.ReactElement {
  const dispatch = useAppDispatch();
  const [validated] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const { t } = useTranslation();

  const { project } = useAppSelector((state) => state.project);
  const history = useHistory();

  const { codelist } = useAppSelector((state) => state.selectedCodeList);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ICodelist>({
    resolver: joiResolver(CodelistSchema),
    defaultValues: codelist
  });

  const onEditCodeSubmit = (post: ICodelist) => {
    const alert: IAlert = {
      id: uuidv4(),
      style: 'success',
      text: 'Successfully edited codelist'
    };
    dispatch(editSelectedCodelist(post));
    dispatch(editCodelist(post));
    dispatch(putSelectedProjectThunk('dummy')).then(() => {
      dispatch(addAlert({ alert }));
      reset();
      setEdit(false);
    });
  };

  useEffect(() => {
    if (codelist) {
      reset(JSON.parse(JSON.stringify(codelist)));
    }
  }, [codelist, reset]);

  const checkCodelistConnection = () => {
    let used = false;
    project.needs.forEach((need: INeed) => {
      need.requirements.forEach((requirement: IRequirement) => {
        requirement.variants.forEach((variant: IVariant) => {
          variant.questions.forEach(
            (alternative: IQuestionBase<IAnswerBase, IConfigBase>) => {
              if (alternative.type === QuestionEnum.Q_CODELIST) {
                const alt = alternative as ICodelistQuestion;
                if (
                  alt.config &&
                  alt.config.codelist &&
                  alt.config.codelist === codelist.id
                )
                  used = true;
              }
            }
          );
        });
      });
    });
    return used;
  };

  const removeCodelist = () => {
    if (checkCodelistConnection()) {
      setModalShow(true);
    } else {
      dispatch(deleteCodelist(codelist));
      dispatch(putSelectedProjectThunk('dummy')).then(() => {
        history.push(`/workbench/${project.id}/codelist`);
      });
    }
  };

  return (
    <>
      <h3 className="m-2">
        Codelist: {codelist.title}
        <Button variant="primary" onClick={() => setEdit(true)}>
          <EditIcon />
        </Button>
      </h3>
      <p className="ml-1 mb-4">{codelist.description}</p>
      {edit && (
        <Card className="mb-4">
          <Card.Body>
            <Form
              onSubmit={handleSubmit(onEditCodeSubmit)}
              autoComplete="off"
              noValidate
              validated={validated}
            >
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
              <Button variant="warning" onClick={() => setEdit(false)}>
                {t('cancel')}
              </Button>
              <Button variant="warning" onClick={removeCodelist}>
                {t('delete')} <DeleteIcon />
              </Button>
              <AlertModal
                modalShow={modalShow}
                setModalShow={setModalShow}
                title="Attention"
                text="The codelist is associated to one or more requirement variant, please remove the connection to be able to delete"
              />

              <ErrorSummary errors={errors} />
            </Form>
          </Card.Body>
        </Card>
      )}
    </>
  );
}

export default EditCodeListForm;
