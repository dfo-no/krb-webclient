import React from 'react';
import { AxiosResponse } from 'axios';
import { useTranslation } from 'react-i18next';

import css from './Evaluation.module.scss';
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

  const isDisabled = (): boolean => {
    return !specification.bank.id;
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

  const handleResponseUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const allFiles: File[] = [];
    if (e.target.files) {
      for (let i = 0; i < e.target.files.length; i += 1) {
        const element: File = e.target.files[i];
        allFiles.push(element);
      }
      readAllFiles(allFiles)
        .then((result) => {
          const newResponses = [...responses, ...(result as IResponse[])];
          dispatch(setResponses(newResponses));
        })
        .catch((err) => {
          alert(err);
        });
    }
  };
  return (
    <div>
      <h1>{t('EVAL_UPLOAD_RESPS')}</h1>
      <form>
        <input
          type="file"
          onChange={(e) => handleResponseUpload(e)}
          name="responseFiles"
          disabled={isDisabled()}
          multiple
          accept=".pdf"
        />
      </form>
      {isDisabled() && (
        <div className={css.Error}>{t('EVAL_SPEC_MISSING')}</div>
      )}
    </div>
  );
}
