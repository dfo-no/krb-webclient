import { joiResolver } from '@hookform/resolvers/joi';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { BsPencil, BsTrashFill } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import AlertModal from '../../common/AlertModal';
import ErrorSummary from '../../Form/ErrorSummary';
import InputRow from '../../Form/InputRow';
import { IAlert } from '../../models/IAlert';
import { CodelistSchema, ICodelist } from '../../models/ICodelist';
import { ICodelistQuestion } from '../../models/ICodelistQuestion';
import { INeed } from '../../models/INeed';
import { IVariant } from '../../models/IVariant';
import { IAnswerBase, IConfigBase, IQuestionBase } from '../../models/Question';
import QuestionEnum from '../../models/QuestionEnum';
import { IRequirement } from '../../models/Requirement';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addAlert } from '../../store/reducers/alert-reducer';
import {
  deleteCodelist,
  editSelectedCodelist,
  putSelectedProjectThunk
} from '../../store/reducers/project-reducer';
import { editCodelist } from '../../store/reducers/selectedCodelist-reducer';

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
        <Button className="m-2" onClick={() => setEdit(true)}>
          <BsPencil />
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
                onClick={() => setEdit(false)}
              >
                {t('cancel')}
              </Button>
              <Button
                className="mt-2  ml-3"
                variant="warning"
                onClick={removeCodelist}
              >
                {t('delete')} <BsTrashFill />
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
