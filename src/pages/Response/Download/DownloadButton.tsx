import React from 'react';
import { AxiosResponse } from 'axios';
import { Button } from '@mui/material/';
import { useTranslation } from 'react-i18next';

import { httpPost } from '../../../api/http';
import { IResponse } from '../../../Nexus/entities/IResponse';
import { useResponseState } from '../ResponseContext';

export default function DownloadButton(): React.ReactElement {
  const { response } = useResponseState();
  const { t } = useTranslation();

  const onDownLoad = () => {
    httpPost<IResponse, AxiosResponse<File>>(
      '/java/generateResponse',
      response,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/pdf',
        },
        responseType: 'blob',
      }
    ).then((res: { data: BlobPart }) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'response.pdf');
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        window.URL.revokeObjectURL(link.toString());
      }, 200);
    });
  };

  return (
    <Button variant="save" type="submit" onClick={onDownLoad}>
      {t('Download response')}
    </Button>
  );
}
