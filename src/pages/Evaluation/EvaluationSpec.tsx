import React, { ReactElement } from 'react';
import { AxiosResponse } from 'axios';
import { useTranslation } from 'react-i18next';

import css from './Evaluation.module.scss';
import FileUpload from '../../components/FileUpload/FileUpload';
import { httpPost } from '../../api/http';
import {
  setEvaluations,
  setEvaluationSpecification,
  setResponses
} from '../../store/reducers/evaluation-reducer';
import { useAppDispatch } from '../../store/hooks';

const EvaluationSpec = (): ReactElement => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const onUploadSpecification = (files: FileList): void => {
    dispatch(setEvaluations([]));
    dispatch(setResponses([]));

    const formData = new FormData();
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
    <div className={css.Content}>
      <div className={css.Card}>
        <FileUpload
          accept={'application/pdf'}
          description={t('EVAL_SPEC_FILE_UPL_DESCR')}
          label={t('EVAL_SPEC_FILE_UPL_LABEL')}
          onChange={onUploadSpecification}
          variant={'Tertiary'}
        />
      </div>
    </div>
  );
};

export default EvaluationSpec;
