import Button from '@mui/material/Button';
import React from 'react';
import { AxiosResponse } from 'axios';
import { useTranslation } from 'react-i18next';

import { httpPost } from '../../api/http';
import { IEvaluation } from '../../Nexus/entities/IEvaluation';
import { useEvaluationState } from './EvaluationContext';

export default function DownLoad(): React.ReactElement {
  const { t } = useTranslation();
  const { evaluations, specification } = useEvaluationState();

  const onDownLoad = (): void => {
    const evaluation: IEvaluation = {
      specification,
      responses: evaluations
    };

    httpPost<IEvaluation, AxiosResponse<File>>(
      '/java/generateResponse',
      evaluation,
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
      link.setAttribute('download', 'evaluation.pdf');
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        window.URL.revokeObjectURL(link.toString());
      }, 200);
    });
  };

  return (
    <Button variant={'save'} onClick={onDownLoad}>
      {t('Download evaluation')}
    </Button>
  );
}
