import React, { ReactElement } from 'react';
import fileDownload from 'js-file-download';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export default function ResponseDownLoad(): ReactElement {
  const { response } = useSelector((state: RootState) => state.response);

  const onDownLoad = () => {
    fileDownload(
      JSON.stringify(response),
      `${response.supplier}-response.json`
    );
  };

  return (
    <Row className="justify-content-md-center">
      <Button type="submit" className="mt-4" onClick={onDownLoad}>
        Download Response
      </Button>
    </Row>
  );
}
