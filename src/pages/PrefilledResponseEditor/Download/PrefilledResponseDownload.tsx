import Button from '@mui/material/Button';
import React from 'react';
import { AxiosResponse } from 'axios';

import { httpPost } from '../../../api/http';
import { IPrefilledResponse } from '../../../Nexus/entities/IPrefilledResponse';
import { useAppSelector } from '../../../store/hooks';

export default function PrefilledResponseDownLoad(): React.ReactElement {
  const { prefilledResponse } = useAppSelector(
    (state) => state.prefilledResponse
  );

  const onDownLoad = (): void => {
    httpPost<IPrefilledResponse, AxiosResponse<File>>(
      '/java/generatePrefilledResponse',
      prefilledResponse,
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
      link.setAttribute(
        'download',
        `prefilledesponse-${prefilledResponse.bank.title}.pdf`
      );
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        window.URL.revokeObjectURL(link.toString());
      }, 200);
    });
  };

  return (
    <Button type="button" onClick={onDownLoad}>
      Download Prefilled Response
    </Button>
  );
}
