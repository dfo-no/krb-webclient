import React, { Dispatch, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AxiosResponse } from 'axios';
import { v4 as uuidv4 } from 'uuid';
import produce from 'immer';

import css from './HomePage.module.scss';
import ProjectSelectionModal from './ProjectSelectionModal';
import SpecificationSelectionModal from './SpecificationSelectionModal';
import ResponseSelectionModal from './ResponseSelectionModal';
import PrefilledResponseSelectionModal from './PrefilledResponseSelectionModal';
import FileUpload from '../../components/FileUpload/FileUpload';
import { BANK_CUSTOMIZATION, IBank } from '../../Nexus/entities/IBank';
import {
  ISpecification,
  SPECIFICATION_CUSTOMIZATION,
} from '../../Nexus/entities/ISpecification';
import {
  IResponse,
  RESPONSE_CUSTOMIZATION,
} from '../../Nexus/entities/IResponse';
import {
  IPrefilledResponse,
  PREFILLED_RESPONSE_CUSTOMIZATION_V1_0,
} from '../../Nexus/entities/IPrefilledResponse';
import { IAlert } from '../../models/IAlert';
import { addAlert } from '../../store/reducers/alert-reducer';
import { httpPost } from '../../api/http';
import { useAppDispatch } from '../../store/hooks';
import { getDefaultSpecificationFile } from '../../Nexus/services/EvaluationSpecificationStoreService';
import { SpecificationFile } from '../../Nexus/entities/SpecificationFile';
import { RESPONSE } from '../../common/PathConstants';

type Props = {
  selectedBank: IBank | null;
  setSelectedBank: Dispatch<SetStateAction<IBank | null>>;
};

export function HomePageUpload({ selectedBank, setSelectedBank }: Props) {
  const dispatch = useAppDispatch();
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
      const alert: IAlert = {
        id: uuidv4(),
        style: 'error',
        text: disableUploadMessage,
      };
      dispatch(addAlert({ alert }));
      return;
    }

    httpPost<FormData, AxiosResponse>('/java/uploadPdf', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      responseType: 'json',
    })
      .then((httpResponse) => {
        if (
          httpResponse.data.customization === SPECIFICATION_CUSTOMIZATION ||
          httpResponse.data.title
        ) {
          const file = {
            name: files[0].name,
            lastModified: files[0].lastModified,
          };

          const rawSpecification: ISpecification = httpResponse.data;

          const specification = produce(rawSpecification, (draft) => {
            // eslint-disable-next-line @typescript-eslint/dot-notation
            if (draft['customization']) return; // This specification has already been upgraded
            draft.customization = SPECIFICATION_CUSTOMIZATION;
            draft.bank.customization = BANK_CUSTOMIZATION;
          });

          setSelectedSpecification(
            getDefaultSpecificationFile(file, specification)
          );
        } else {
          if (
            httpResponse.data.customization ===
              PREFILLED_RESPONSE_CUSTOMIZATION_V1_0 ||
            !httpResponse.data.specification
          ) {
            const rawPrefilledResponse: IPrefilledResponse = httpResponse.data;
            const prefilledResponse = produce(rawPrefilledResponse, (draft) => {
              // eslint-disable-next-line @typescript-eslint/dot-notation
              if (draft['customization']) return; // This prefilledResponse has already been upgraded
              draft.customization = PREFILLED_RESPONSE_CUSTOMIZATION_V1_0;
              draft.bank.customization = BANK_CUSTOMIZATION;
            });
            setSelectedPrefilledResponse(prefilledResponse);
          } else {
            const rawResponse: IResponse = httpResponse.data;
            const response = produce(rawResponse, (draft) => {
              // eslint-disable-next-line @typescript-eslint/dot-notation
              if (draft['customization']) return; // This response has already been upgraded
              draft.customization = RESPONSE_CUSTOMIZATION;
              draft.specification.customization = SPECIFICATION_CUSTOMIZATION;
              draft.specification.bank.customization = BANK_CUSTOMIZATION;
            });
            setSelectedResponse(response);
          }
        }
      })
      .catch(() => {
        const alert: IAlert = {
          id: uuidv4(),
          style: 'error',
          text: t('HomePage.File_upload_error'),
        };
        dispatch(addAlert({ alert }));
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
