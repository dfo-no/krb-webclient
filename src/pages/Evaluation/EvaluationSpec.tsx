import React, { ReactElement } from 'react';

import css from './Evaluation.module.scss';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import { httpPost } from '../../api/http';
import { AxiosResponse } from 'axios';
import { setEvaluationSpecification } from '../../store/reducers/evaluation-reducer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useTranslation } from 'react-i18next';

const EvaluationSpec = (): ReactElement => {
  const dispatch = useAppDispatch();
  const { specification } = useAppSelector((state) => state.evaluation);
  const { t } = useTranslation();

  const getSpecTitle = (): string => {
    return specification.bank.id
      ? t('EVAL_CURRENT_SPEC') + ': ' + specification.title
      : t('EVAL_UPLOAD_SPEC');
  };

  const onUploadSpecification = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const formData = new FormData();
    const files = event.target.files as FileList;
    for (let index = 0; index < files.length; index += 1) {
      const file = files[index];
      formData.append('file', file);
    }

    httpPost<FormData, AxiosResponse>('/java/uploadPdf', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      responseType: 'json'
    }).then((response) => {
      dispatch(setEvaluationSpecification(response.data));
      return response;
    });
  };

  return (
    <div className={css.Element}>
      <Col>
        <h1>{getSpecTitle()}</h1>
        <InputGroup className="mb-5">
          <form>
            <input
              type="file"
              onChange={(e) => onUploadSpecification(e)}
              name="responseFiles"
              accept=".pdf"
            />
          </form>
        </InputGroup>
      </Col>
    </div>
  );
};

export default EvaluationSpec;
