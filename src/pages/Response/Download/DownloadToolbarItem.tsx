import React from 'react';
import { AxiosResponse } from 'axios';
import { useTranslation } from 'react-i18next';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';

import { httpPost } from '../../../api/http';
import { IResponse } from '../../../Nexus/entities/IResponse';
import { useAppSelector } from '../../../store/hooks';
import ToolbarItem from '../../../components/UI/Toolbar/ToolbarItem';

export default function DownloadToolbarItem(): React.ReactElement {
  const { response } = useAppSelector((state) => state.response);
  const { t } = useTranslation();

  const onDownLoad = () => {
    httpPost<IResponse, AxiosResponse<File>>(
      '/java/generateResponse',
      response,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/pdf',
        },
        responseType: 'blob',
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
    <ToolbarItem
      primaryText={t('Download response')}
      icon={<SystemUpdateAltIcon />}
      handleClick={() => onDownLoad()}
    />
  );
}
