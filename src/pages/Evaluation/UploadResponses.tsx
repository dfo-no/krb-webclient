import React from 'react';
import { AxiosResponse } from 'axios';
import { useTranslation } from 'react-i18next';

import css from './Evaluation.module.scss';
import FileUpload from '../../components/FileUpload/FileUpload';
import { httpPost } from '../../api/http';
import { IResponse } from '../../models/IResponse';
import { setResponses } from '../../store/reducers/evaluation-reducer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

export default function UploadResponses(): React.ReactElement {
  const { responses, specification } = useAppSelector(
    (state) => state.evaluation
  );
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const hasSpecification = (): boolean => {
    return !!specification.bank.id;
  };

  const readFileContents = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return new Promise((resolve, reject) => {
      httpPost<FormData, AxiosResponse>('/java/uploadPdf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        responseType: 'json'
      })
        .then((response) => {
          return resolve(response.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const readAllFiles = async (AllFiles: File[]) => {
    const results = await Promise.all(
      AllFiles.map(async (file: File) => {
        const contents = await readFileContents(file).then((response) => {
          return response;
        });
        return contents;
      })
    );
    return results;
  };

  const handleResponseUpload = (files: FileList): void => {
    const allFiles: File[] = [];
    for (let i = 0; i < files.length; i += 1) {
      allFiles.push(files[i]);
    }

    readAllFiles(allFiles)
      .then((result) => {
        const newResponses = [...responses, ...(result as IResponse[])];
        dispatch(setResponses(newResponses));
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className={css.Content}>
      <div className={css.Card}>
        <FileUpload
          accept={'application/pdf'}
          description={t('EVAL_RESPS_FILE_UPL_DESCR')}
          disabled={!hasSpecification()}
          label={t('EVAL_RESPS_FILE_UPL_LABEL')}
          multiple={true}
          onChange={handleResponseUpload}
          variant={'Tertiary'}
        />
      </div>
      {!hasSpecification() && (
        <div className={css.Error}>{t('EVAL_SPEC_MISSING')}</div>
      )}
    </div>
  );
}
