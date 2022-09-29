import css from './HomePage.module.scss';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AxiosResponse } from 'axios';
import { v4 as uuidv4 } from 'uuid';

import ProjectSelectionModal from './ProjectSelectionModal';
import SpecificationSelectionModal from './SpecificationSelectionModal';
import ResponseSelectionModal from './ResponseSelectionModal';
import PrefilledResponseSelectionModal from './PrefilledResponseSelectionModal';
import FileUpload from '../../components/FileUpload/FileUpload';
import { IBank } from '../../Nexus/entities/IBank';
import { ISpecification } from '../../Nexus/entities/ISpecification';
import { IResponse } from '../../Nexus/entities/IResponse';
import { IPrefilledResponse } from '../../Nexus/entities/IPrefilledResponse';
import { IAlert } from '../../models/IAlert';
import { addAlert } from '../../store/reducers/alert-reducer';
import { httpPost } from '../../api/http';
import { useAppDispatch } from '../../store/hooks';
import { TemporarySpecFileService } from '../../Nexus/services/TemporarySpecFileService';

type Props = {
  selectedBank: IBank | null;
  setSelectedBank: Dispatch<SetStateAction<IBank | null>>;
};

export function HomePageUpload({ selectedBank, setSelectedBank }: Props) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [selectedSpecification, setSelectedSpecification] =
    useState<ISpecification | null>(null);
  const [selectedResponse, setSelectedResponse] = useState<IResponse | null>(
    null
  );
  const [selectedPrefilledResponse, setSelectedPrefilledResponse] =
    useState<IPrefilledResponse | null>(null);
  const specFileService = new TemporarySpecFileService();

  const onUpload = (files: FileList): void => {
    const MAX_UPLOAD_SIZE = 10000000; // 10M

    const formData = new FormData();
    let disableUploadMessage = '';
    for (let index = 0; index < files.length; index += 1) {
      const file = files[index];
      if (file.size > MAX_UPLOAD_SIZE) {
        disableUploadMessage = t('HOME_FILEUPL_TOO_LARGE');
        break;
      }
      if (file.type !== 'application/pdf') {
        disableUploadMessage = t('HOME_FILEUPL_WRONG_TYPE');
        break;
      }
      formData.append('file', file);
    }

    if (disableUploadMessage !== '') {
      const alert: IAlert = {
        id: uuidv4(),
        style: 'error',
        text: disableUploadMessage
      };
      dispatch(addAlert({ alert }));
      return;
    }

    httpPost<FormData, AxiosResponse>('/java/uploadPdf', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      responseType: 'json'
    })
      .then((httpResponse) => {
        if (httpResponse.data.title) {
          specFileService
            .storeSpecFile({
              name: files[0].name,
              lastModified: files[0].lastModified
            })
            .then(() => setSelectedSpecification(httpResponse.data));
        } else {
          if (!httpResponse.data.specification) {
            setSelectedPrefilledResponse(httpResponse.data);
          } else {
            setSelectedResponse(httpResponse.data);
          }
        }
      })
      .catch(() => {
        const alert: IAlert = {
          id: uuidv4(),
          style: 'error',
          text: t('HOME_FILEUPL_UPLOAD_ERROR')
        };
        dispatch(addAlert({ alert }));
      });
  };

  return (
    <>
      <FileUpload
        accept={'application/pdf'}
        className={css.Card}
        description={t('HOME_FILEUPL_DESCRIPTION')}
        label={t('HOME_FILEUPL_LABEL')}
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
