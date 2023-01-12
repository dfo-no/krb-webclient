import React from 'react';
import { AxiosResponse } from 'axios';
import { useTranslation } from 'react-i18next';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';

import { httpPost } from '../../../api/http';
import { IPrefilledResponse } from '../../../Nexus/entities/IPrefilledResponse';
import { PrefilledResponseContainer } from '../PrefilledResponseContext';
import ToolbarItem from '../../../components/UI/Toolbar/ToolbarItem';

export default function DownloadToolbarItem(): React.ReactElement {
  const { prefilledResponse } = PrefilledResponseContainer.useContainer();
  const { t } = useTranslation();

  const onDownLoad = (): void => {
    httpPost<IPrefilledResponse, AxiosResponse<File>>(
      '/java/generatePrefilledResponse',
      prefilledResponse,
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
    <ToolbarItem
      primaryText={t('Download prefilled response')}
      icon={<SystemUpdateAltIcon />}
      handleClick={() => onDownLoad()}
    />
  );
}
