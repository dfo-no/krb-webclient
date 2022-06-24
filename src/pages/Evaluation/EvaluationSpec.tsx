import React, { ReactElement } from 'react';
import { AxiosResponse } from 'axios';
import { useTranslation } from 'react-i18next';

import css from './Evaluation.module.scss';
import FileUpload from '../../components/FileUpload/FileUpload';
import { httpPost } from '../../api/http';
import { setEvaluationSpecification } from '../../store/reducers/evaluation-reducer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const EvaluationSpec = (): ReactElement => {
  const dispatch = useAppDispatch();
  const { specification } = useAppSelector((state) => state.evaluation);
  const { t } = useTranslation();

  const getSpecTitle = (): string => {
    return specification.bank.id
      ? t('EVAL_CURRENT_SPEC') + ': ' + specification.title
      : t('EVAL_UPLOAD_SPEC');
  };

  const onUploadSpecification = (files: FileList): void => {
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
    <div className={css.Element}>
      <h1>{getSpecTitle()}</h1>
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
