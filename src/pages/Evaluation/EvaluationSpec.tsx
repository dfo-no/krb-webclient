import React, { ReactElement, useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import { useTranslation } from 'react-i18next';

import css from './Evaluation.module.scss';
import DateUtils from '../../common/DateUtils';
import FileUpload from '../../components/FileUpload/FileUpload';
import { httpPost } from '../../api/http';
import {
  setEvaluations,
  setEvaluationSpecification,
  setFiles,
  setResponses
} from '../../store/reducers/evaluation-reducer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const initialFiles: File[] = [];

const EvaluationSpec = (): ReactElement => {
  const { t } = useTranslation();
  const { specification } = useAppSelector((state) => state.evaluation);
  const [spec, setSpec] = useState(initialFiles);
  const [uploadError, setUploadError] = useState('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    setUploadError('');
    setSpec([]);
    dispatch(setFiles([]));
  }, [dispatch]);

  const formatDate = (time: number): string => {
    const date = new Date(time);
    return DateUtils.prettyFormat(date.toISOString());
  };

  const getSpecificationName = (): string => {
    if (specification.bank.id === '') {
      return '...';
    }

    return specification.title + ', ' + specification.organization;
  };

  const onUploadSpecification = (fileList: FileList): void => {
    setUploadError('');
    dispatch(setEvaluations([]));
    dispatch(setResponses([]));
    dispatch(setFiles([]));

    const formData = new FormData();
    for (let index = 0; index < fileList.length; index += 1) {
      const file = fileList[index];
      setSpec([file]);
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
        setSpec([]);
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
        {spec.length > 0 && (
          <ul className={css.Files}>
            {spec.map((file: File, index) => (
              <li key={index} className={css.File}>
                <div>{getSpecificationName()}</div>
                <div>
                  <div>{file.name}</div>
                  <div className={css.Date}>
                    {formatDate(file.lastModified)}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {!!uploadError && <div className={css.Error}>{uploadError}</div>}
    </div>
  );
};

export default EvaluationSpec;
