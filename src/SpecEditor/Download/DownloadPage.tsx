import React, { ReactElement } from 'react';
import fileDownload from 'js-file-download';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RootState } from '../../store/store';

export default function SpecPage(): ReactElement {
  const { t } = useTranslation();
  const { spec } = useSelector((state: RootState) => state.specification);

  const onDownLoad = () => {
    fileDownload(JSON.stringify(spec), `${spec.title}-specfication.json`);
  };

  return (
    <Row className="justify-content-md-center">
      <Button type="submit" className="mt-4" onClick={onDownLoad}>
        {t('download specification')}
      </Button>
    </Row>
  );
}
