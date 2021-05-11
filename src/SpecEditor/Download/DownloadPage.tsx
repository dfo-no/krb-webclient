import React, { ReactElement } from 'react';
import fileDownload from 'js-file-download';
// import axios from 'axios';
// import { saveAs } from 'file-saver';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export default function SpecPage(): ReactElement {
  const { spec } = useSelector((state: RootState) => state.specification);

  const convertJSONToPdf = () => {
    /* axios
      .post(
        'https://krb-pdf.azurewebsites.net/api/jsonToPdf?code=KldgzqSh6itpBgIrabDhAePvkKX2INVJLERGalimHK3l1IJ1ZZp9ng==',
        {
          bankName: spec.title,
          responseType: 'arrayBuffer'
        }
      )
      .then(function (response) {
        const blob = new Blob([new Uint8Array(response.data.data)], {
          type: 'application/pdf'
        });
        return blob;
      })
      .then(function (blob) {
        saveAs(blob, 'foo.pdf');
      }); */
  };

  const onDownLoad = () => {
    convertJSONToPdf();
    fileDownload(JSON.stringify(spec), `${spec.title}-specfication.json`);
  };

  return (
    <Row className="justify-content-md-center">
      <Button type="submit" className="mt-4" onClick={onDownLoad}>
        Download Specification
      </Button>
    </Row>
  );
}
