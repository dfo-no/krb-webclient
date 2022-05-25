import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import React from 'react';
import { AxiosResponse } from 'axios';

import { httpPost } from '../../api/http';
import { IResponse } from '../../models/IResponse';
import { setResponses } from '../../store/reducers/evaluation-reducer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

export default function UploadResponses(): React.ReactElement {
  const { responses } = useAppSelector((state) => state.evaluation);
  const dispatch = useAppDispatch();

  const readFileContents = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return new Promise((resolve, reject) => {
      httpPost<FormData, AxiosResponse>('/java/uploadPdf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        responseType: 'json'
      })
        .then((response) => {
          return resolve(response.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const readAllFiles = async (AllFiles: File[]) => {
    const results = await Promise.all(
      AllFiles.map(async (file: File) => {
        const contents = await readFileContents(file).then((response) => {
          return response;
        });
        return contents;
      })
    );
    return results;
  };

  const handleResponseUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const allFiles: File[] = [];
    if (e.target.files) {
      for (let i = 0; i < e.target.files.length; i += 1) {
        const element: File = e.target.files[i];
        allFiles.push(element);
      }
      readAllFiles(allFiles)
        .then((result) => {
          const newResponses = [...responses, ...(result as IResponse[])];
          dispatch(setResponses(newResponses));
        })
        .catch((err) => {
          alert(err);
        });
    }
  };
  return (
    <Col>
      <h6>Upload Responses</h6>
      <InputGroup className="mb-5">
        <form>
          <input
            type="file"
            onChange={(e) => handleResponseUpload(e)}
            name="responseFiles"
            multiple
            accept=".pdf"
          />
        </form>
      </InputGroup>
    </Col>
  );
}
