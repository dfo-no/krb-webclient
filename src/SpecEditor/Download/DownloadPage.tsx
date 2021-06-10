import React, { ReactElement } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { AxiosResponse } from 'axios';
import fileDownload from 'js-file-download';
import { RootState } from '../../store/store';
import { httpPost } from '../../api/http';
import { Specification } from '../../models/Specification';

export default function SpecPage(): ReactElement {
  const { t } = useTranslation();
  const { spec } = useSelector((state: RootState) => state.specification);

  const onDownLoad = () => {
    httpPost<Specification, AxiosResponse<File>>(
      `${process.env.REACT_APP_JAVA_API_URL}/generatePdf`,
      spec,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/pdf'
        },
        responseType: 'blob'
      }
    ).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
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

  // TODO remove after we have upload and read PDF attachment functionality
  const onDownLoadJSON = () => {
    fileDownload(JSON.stringify(spec), `${spec.title}-specfication.json`);
  };

  return (
    <Row className="justify-content-md-center">
      <Button type="submit" className="mt-4" onClick={onDownLoad}>
        {t('download specification')}
      </Button>

      <Button
        type="submit"
        variant="warning"
        className="mt-4"
        onClick={onDownLoadJSON}
      >
        Download Specification as JSON
      </Button>
    </Row>
  );
}
