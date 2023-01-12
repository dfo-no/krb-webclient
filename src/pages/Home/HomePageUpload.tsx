import React, { Dispatch, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AxiosResponse } from 'axios';
import { v4 as uuidv4 } from 'uuid';

import css from './HomePage.module.scss';
import ProjectSelectionModal from './ProjectSelectionModal';
import SpecificationSelectionModal from './SpecificationSelectionModal';
import ResponseSelectionModal from './ResponseSelectionModal';
import PrefilledResponseSelectionModal from './PrefilledResponseSelectionModal';
import FileUpload from '../../components/FileUpload/FileUpload';
import { IBank } from '../../Nexus/entities/IBank';
import { ISpecification } from '../../Nexus/entities/ISpecification';
import { IResponse } from '../../Nexus/entities/IResponse';
import { IPrefilledResponse } from '../../Nexus/entities/IPrefilledResponse';
import { Alert } from '../../models/Alert';
import { httpPost } from '../../api/http';
import { getDefaultSpecificationFile } from '../../Nexus/services/EvaluationSpecificationStoreService';
import { SpecificationFile } from '../../Nexus/entities/SpecificationFile';
import { updateObject } from './UpdateFormatsTools';
import { AlertsContainer } from '../../components/Alert/AlertContext';

type Props = {
  selectedBank: IBank | null;
  setSelectedBank: Dispatch<SetStateAction<IBank | null>>;
};

export function HomePageUpload({ selectedBank, setSelectedBank }: Props) {
  const { addAlert } = AlertsContainer.useContainer();
  const { t } = useTranslation();

  const [selectedSpecification, setSelectedSpecification] =
    useState<SpecificationFile | null>(null);
  const [selectedResponse, setSelectedResponse] = useState<IResponse | null>(
    null
  );
  const [selectedPrefilledResponse, setSelectedPrefilledResponse] =
    useState<IPrefilledResponse | null>(null);

  const onUpload = (files: FileList): void => {
    const MAX_UPLOAD_SIZE = 10000000; // 10M

    const formData = new FormData();
    let disableUploadMessage = '';
    for (const file of files) {
      if (file.size > MAX_UPLOAD_SIZE) {
        disableUploadMessage = t('HomePage.File_upload_to_large');
        break;
      }
      if (file.type !== 'application/pdf') {
        disableUploadMessage = t('HomePage.File_upload_wrong_type');
        break;
      }
      formData.append('file', file);
    }

    if (disableUploadMessage !== '') {
      const alert: Alert = {
        id: uuidv4(),
        style: 'error',
        text: disableUploadMessage,
      };
      addAlert(alert);
      return;
    }

    httpPost<FormData, AxiosResponse>('/java/uploadPdf', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      responseType: 'json',
    })
      .then((httpResponse) => {
        const unwrappedDocument = updateObject(httpResponse.data);
        if (unwrappedDocument.title) {
          const file = {
            name: files[0].name,
            lastModified: files[0].lastModified,
          };

          const specification: ISpecification = unwrappedDocument;

          setSelectedSpecification(
            getDefaultSpecificationFile(file, specification)
          );
        } else {
          if (!unwrappedDocument.specification) {
            setSelectedPrefilledResponse(unwrappedDocument);
          } else {
            setSelectedResponse(unwrappedDocument);
          }
        }
      })
      .catch(() => {
        const alert: Alert = {
          id: uuidv4(),
          style: 'error',
          text: t('HomePage.File_upload_error'),
        };
        addAlert(alert);
      });
  };

  return (
    <>
      <FileUpload
        accept={'application/pdf'}
        className={css.Card}
        description={t('HomePage.File_upload_description')}
        label={t('HomePage.File_upload_label')}
        onChange={onUpload}
        variant={'Tertiary'}
      />
      {selectedBank && (
        <ProjectSelectionModal
          selectedBank={selectedBank}
          setSelectedBank={setSelectedBank}
        />
      )}
      {selectedSpecification && (
        <SpecificationSelectionModal
          selectedSpecification={selectedSpecification}
          setSelectedSpecification={setSelectedSpecification}
        />
      )}
      {selectedResponse && (
        <ResponseSelectionModal
          selectedResponse={selectedResponse}
          setSelectedResponse={setSelectedResponse}
        />
      )}
      {selectedPrefilledResponse && (
        <PrefilledResponseSelectionModal
          selectedPrefilledResponse={selectedPrefilledResponse}
          setSelectedPrefilledResponse={setSelectedPrefilledResponse}
        />
      )}
    </>
  );
}
