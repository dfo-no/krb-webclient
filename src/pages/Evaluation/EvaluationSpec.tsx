import React, { ReactElement, useEffect, useState } from 'react';

import css from './Evaluation.module.scss';
import { AxiosResponse } from 'axios';
import { httpPost } from '../../api/http';
import { setEvaluationSpecification } from '../../store/reducers/evaluation-reducer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useTranslation } from 'react-i18next';

const EvaluationSpec = (): ReactElement => {
  const dispatch = useAppDispatch();
  const { specification } = useAppSelector((state) => state.evaluation);
  const { t } = useTranslation();
  const [uploadError, setUploadError] = useState('');

  useEffect(() => {
    setUploadError('');
  }, []);

  const getSpecTitle = (): string => {
    return specification.bank.id
      ? t('EVAL_CURRENT_SPEC') + ': ' + specification.title
      : t('EVAL_UPLOAD_SPEC');
  };

  const onUploadSpecification = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setUploadError('');

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
    })
      .then((response) => {
        if (!response.data.bank) {
          setUploadError(t('EVAL_SPEC_ERROR_INVALID_FILE'));
          return response;
        }
        dispatch(setEvaluationSpecification(response.data));
        return response;
      })
      .catch((error) => {
        setUploadError(t('EVAL_SPEC_ERROR_UPLOADING'));
        console.error(error);
      });
  };

  return (
    <div className={css.Element}>
      <h1>{getSpecTitle()}</h1>
      <form>
        <input
          type="file"
          onChange={(e) => onUploadSpecification(e)}
          name="responseFiles"
          accept=".pdf"
        />
      </form>
      {!!uploadError && <div className={css.Error}>{uploadError}</div>}
    </div>
  );
};

export default EvaluationSpec;
