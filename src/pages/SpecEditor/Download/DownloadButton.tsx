import Button from '@mui/material/Button';
import React from 'react';
import { AxiosResponse } from 'axios';
import { useTranslation } from 'react-i18next';

import { httpPost } from '../../../api/http';
import { ISpecification } from '../../../Nexus/entities/ISpecification';
import { useSpecificationState } from '../SpecificationContext';

export default function DownloadButton(): React.ReactElement {
  const { t } = useTranslation();
  const { specification } = useSpecificationState();

  const onDownLoad = (): void => {
    httpPost<ISpecification, AxiosResponse<File>>(
      '/java/generateSpecification',
      specification,
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
    <Button variant="save" type="submit" onClick={onDownLoad}>
      {t('Download specification')}
    </Button>
  );
}
