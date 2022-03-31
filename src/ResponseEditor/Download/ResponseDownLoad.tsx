import { AxiosResponse } from 'axios';
import React from 'react';
import Button from '@mui/material/Button';
import { httpPost } from '../../api/http';
import { IResponse } from '../../models/IResponse';
import { useAppSelector } from '../../store/hooks';

export default function ResponseDownLoad(): React.ReactElement {
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
    <Button type="submit" onClick={onDownLoad}>
      Download Response
    </Button>
  );
}
