import React, { ReactElement, useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import { useTranslation } from 'react-i18next';

import css from './Evaluation.module.scss';
import FileUpload from '../../components/FileUpload/FileUpload';
import { httpPost } from '../../api/http';
import { setEvaluationSpecification } from '../../store/reducers/evaluation-reducer';
import { useAppDispatch } from '../../store/hooks';

const EvaluationSpec = (): ReactElement => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [uploadError, setUploadError] = useState('');

  useEffect(() => {
    setUploadError('');
  }, []);

  const onUploadSpecification = (files: FileList): void => {
    setUploadError('');

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
      {!!uploadError && <div className={css.Error}>{uploadError}</div>}
    </div>
  );
};

export default EvaluationSpec;
