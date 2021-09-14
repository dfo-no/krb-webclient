import { joiResolver } from '@hookform/resolvers/joi';
import React, { ReactElement, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { BsPencil, BsTrashFill } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';
import AlertModal from '../../common/AlertModal';
import ErrorSummary from '../../Form/ErrorSummary';
import InputRow from '../../Form/InputRow';
import { Codelist, CodelistSchema } from '../../models/Codelist';
import { ICodelistQuestion } from '../../models/ICodelistQuestion';
import { IVariant } from '../../models/IVariant';
import { Need } from '../../models/Need';
import { IAnswerBase, IConfigBase, IQuestionBase } from '../../models/Question';
import QuestionEnum from '../../models/QuestionEnum';
import { Requirement } from '../../models/Requirement';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  deleteCodelist,
  editSelectedCodelist,
  putSelectedProjectThunk
} from '../../store/reducers/project-reducer';
import { editCodelist } from '../../store/reducers/selectedCodelist-reducer';

function EditCodeListForm(): ReactElement {
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
  } = useForm<Codelist>({
    resolver: joiResolver(CodelistSchema),
    defaultValues: codelist
  });

  const onEditCodeSubmit = (post: Codelist) => {
    dispatch(editSelectedCodelist(post));
    dispatch(editCodelist(post));
    dispatch(putSelectedProjectThunk('dummy')).then(() => {
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
    project.needs.forEach((need: Need) => {
      need.requirements.forEach((requirement: Requirement) => {
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
      <Row className="m-1">
        <h3>Codelist: {codelist.title}</h3>
        <Button className="ml-3" onClick={() => setEdit(true)}>
          <BsPencil />
        </Button>
      </Row>
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
              <Row>
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
              </Row>
              <ErrorSummary errors={errors} />
            </Form>
          </Card.Body>
        </Card>
      )}
    </>
  );
}

export default EditCodeListForm;
