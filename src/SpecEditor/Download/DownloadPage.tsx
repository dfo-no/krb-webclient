import { AxiosResponse } from 'axios';
import React, { ReactElement } from 'react';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { httpPost } from '../../api/http';
import { Specification } from '../../models/Specification';
import { useAppSelector } from '../../store/hooks';

export default function SpecPage(): ReactElement {
  const { t } = useTranslation();
  const { spec } = useAppSelector((state) => state.specification);
  const onDownLoad = () => {
    httpPost<Specification, AxiosResponse<File>>(
      '/java/generateSpecification',
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
      link.setAttribute('download', 'specification.pdf');
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        window.URL.revokeObjectURL(link.toString());
      }, 200);
    });
  };

  return (
    <Button type="submit" className="mt-4" onClick={onDownLoad}>
      {t('download specification')}
    </Button>
  );
}
