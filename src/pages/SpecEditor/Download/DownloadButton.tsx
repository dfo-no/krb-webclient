import React from 'react';
import { AxiosResponse } from 'axios';
import { useTranslation } from 'react-i18next';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';

import { httpPost } from '../../../api/http';
import { ISpecification } from '../../../Nexus/entities/ISpecification';
import { useSpecificationState } from '../SpecificationContext';
import ToolbarItem from '../../../components/UI/Toolbar/ToolbarItem';

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
          Accept: 'application/pdf',
        },
        responseType: 'blob',
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
    <ToolbarItem
      primaryText={t('Download specification')}
      icon={<SystemUpdateAltIcon />}
      handleClick={() => onDownLoad()}
    />
  );
}
