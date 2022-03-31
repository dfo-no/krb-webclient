import { AxiosResponse } from 'axios';
import React from 'react';
import Button from '@mui/material/Button';
import { httpPost } from '../api/http';
import { IEvaluation } from '../Nexus/entities/IEvaluation';
import { useAppSelector } from '../store/hooks';

export default function DownLoad(): React.ReactElement {
  const { specification, evaluations } = useAppSelector(
    (state) => state.evaluation
  );
  const onDownLoad = () => {
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
  return <Button onClick={() => onDownLoad()}>Download</Button>;
}
