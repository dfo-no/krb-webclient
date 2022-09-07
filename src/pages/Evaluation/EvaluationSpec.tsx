import React, { ReactElement, useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import { useTranslation } from 'react-i18next';

import css from './Evaluation.module.scss';
import DateUtils from '../../common/DateUtils';
import FileUpload from '../../components/FileUpload/FileUpload';
import SpecificationService from '../../Nexus/services/SpecificationService';
import { httpPost } from '../../api/http';
import {
  setEvaluations,
  setEvaluationSpecification,
  setSpecFile
} from '../../store/reducers/evaluation-reducer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const EvaluationSpec = (): ReactElement => {
  const { specFile, specification } = useAppSelector(
    (state) => state.evaluation
  );
  const { t } = useTranslation();
  const [uploadError, setUploadError] = useState('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    setUploadError('');
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

    const formData = new FormData();
    if (fileList.length) {
      const file = fileList[0];
      dispatch(
        setSpecFile({
          name: file.name,
          lastModified: file.lastModified
        })
      );
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
          dispatch(
            setEvaluationSpecification(
              SpecificationService.defaultSpecification()
            )
          );
          return response;
        }
        dispatch(setEvaluationSpecification(response.data));
        return response;
      })
      .catch((error) => {
        dispatch(setSpecFile(null));
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
        {specFile !== null && (
          <ul className={css.Files}>
            <li className={css.File}>
              <div>{getSpecificationName()}</div>
              <div>
                <div>{specFile.name}</div>
                <div className={css.Date}>
                  {formatDate(specFile.lastModified)}
                </div>
              </div>
            </li>
          </ul>
        )}
      </div>
      {!!uploadError && <div className={css.Error}>{uploadError}</div>}
    </div>
  );
};

export default EvaluationSpec;
