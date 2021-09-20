import { AxiosResponse } from 'axios';
import React, { ReactElement } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { httpPost } from '../../api/http';
import { Response } from '../../models/Response';
import { useAppSelector } from '../../store/hooks';

export default function ResponseDownLoad(): ReactElement {
  const { response } = useAppSelector((state) => state.response);

  const onDownLoad = () => {
    httpPost<Response, AxiosResponse<File>>(
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
    <Button type="submit" className="mt-4" onClick={onDownLoad}>
      Download Response
    </Button>
  );
}
