import { AxiosResponse } from 'axios';
import React, { ReactElement } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { useSelector } from 'react-redux';
import { httpPost } from '../../api/http';
import { Response } from '../../models/Response';
import { RootState } from '../../store/store';

export default function ResponseDownLoad(): ReactElement {
  const { response } = useSelector((state: RootState) => state.response);

  const onDownLoad = () => {
    httpPost<Response, AxiosResponse<File>>(
      `${process.env.REACT_APP_JAVA_API_URL}/generatePdf`,
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
    <Row className="justify-content-md-center">
      <Button type="submit" className="mt-4" onClick={onDownLoad}>
        Download Response
      </Button>
    </Row>
  );
}
