import { AxiosResponse } from 'axios';
import React, { ReactElement } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { httpPost } from '../../api/http';
import { PrefilledResponse } from '../../models/PrefilledResponse';
import { useAppSelector } from '../../store/hooks';

export default function PrefilledResponseDownLoad(): ReactElement {
  const { prefilledResponse } = useAppSelector(
    (state) => state.prefilledResponse
  );

  const onDownLoad = () => {
    httpPost<PrefilledResponse, AxiosResponse<File>>(
      '/java/generatePdf',
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
    <Row className="justify-content-md-center">
      <Button type="submit" className="mt-4" onClick={onDownLoad}>
        Download Prefilled Response
      </Button>
    </Row>
  );
}
