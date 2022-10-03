import classnames from 'classnames';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import { AxiosResponse } from 'axios';
import { useTranslation } from 'react-i18next';

import css from './Evaluation.module.scss';
import DateUtils from '../../common/DateUtils';
import FileUpload from '../../components/FileUpload/FileUpload';
import Utils from '../../common/Utils';
import { FormIconButton } from '../../components/Form/FormIconButton';
import { httpPost } from '../../api/http';
import { IFile } from '../../models/IFile';
import { IResponse } from '../../Nexus/entities/IResponse';
import { useEvaluationState } from './EvaluationContext';

export default function UploadResponses(): React.ReactElement {
  const { t } = useTranslation();
  const {
    setEvaluations,
    files,
    specificationUpload,
    setFiles,
    responses,
    setResponses
  } = useEvaluationState();

  const formatDate = (time: number): string => {
    const date = new Date(time);
    return DateUtils.prettyFormat(date.toISOString());
  };

  const getSupplierNameForResponseWith = (index: number): string => {
    if (index < 0 || index >= responses.length) {
      return '...';
    }

    const response = responses[index];
    if (!response.specification || !response.requirementAnswers) {
      return t('FILE_ERROR_NOT_A_RESPONSE');
    }

    if (response.specification.id !== specificationUpload.specification.id) {
      return t('FILE_ERROR_NOT_MATCHING_SPEC');
    }

    return response.supplier !== ''
      ? response.supplier
      : t('EVAL_SUPPLIER_NAME_MISSING');
  };

  const hasSpecification = (): boolean => {
    return !!specificationUpload.specification.bank.id;
  };

  const isValidResponse = (index: number): boolean => {
    if (index < 0 || index >= responses.length) {
      return true;
    }

    return Utils.isValidResponse(
      responses[index],
      specificationUpload.specification
    );
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

  const readAllFiles = async (allFiles: FileList) => {
    const results = await Promise.all(
      Array.from(allFiles).map(async (file: File) => {
        const contents = await readFileContents(file).then((response) => {
          return response;
        });
        return contents;
      })
    );
    return results;
  };

  const removeFile = (index: number): void => {
    const newResponses = [...responses];
    const newFiles = [...files];
    newResponses.splice(index, 1);
    newFiles.splice(index, 1);
    setResponses(newResponses);
    setFiles(newFiles);
    setEvaluations([]);
  };

  const handleResponseUpload = (newFiles: FileList): void => {
    const allFiles = [
      ...files,
      ...Array.from(newFiles).map((file) => {
        return {
          name: file.name,
          lastModified: file.lastModified
        };
      })
    ];
    const prevFiles = [...files];

    setFiles(allFiles);

    readAllFiles(newFiles)
      .then((result) => {
        const newResponses = [...responses, ...(result as IResponse[])];
        setResponses(newResponses);
        setEvaluations([]);
      })
      .catch((err) => {
        setFiles(prevFiles);
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
        {files.length > 0 && (
          <ul className={css.Files}>
            {files.map((file: IFile, index) => (
              <li
                key={index}
                className={classnames(
                  css.File,
                  isValidResponse(index) ? null : css.Invalid
                )}
              >
                <div>
                  <div>{getSupplierNameForResponseWith(index)}</div>
                  <div className={css.Tools}>
                    <FormIconButton
                      color={'primary'}
                      hoverColor={'var(--error-color)'}
                      onClick={() => removeFile(index)}
                    >
                      <DeleteIcon />
                    </FormIconButton>
                  </div>
                </div>
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
      {!hasSpecification() && (
        <div className={css.Error}>{t('EVAL_SPEC_MISSING')}</div>
      )}
    </div>
  );
}
