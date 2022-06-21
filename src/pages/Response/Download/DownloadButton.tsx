import React from 'react';
import { AxiosResponse } from 'axios';
import { Button } from '@mui/material/';
import { t } from 'i18next';

import { httpPost } from '../../../api/http';
import { IResponse } from '../../../models/IResponse';
import { useAppSelector } from '../../../store/hooks';

export default function DownloadButton(): React.ReactElement {
  const { response } = useAppSelector((state) => state.response);

  const onDownLoad = () => {
    httpPost<IResponse, AxiosResponse<File>>(
      '/java/generateResponse',
      response,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/pdf'
        },
        responseType: 'blob'
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
