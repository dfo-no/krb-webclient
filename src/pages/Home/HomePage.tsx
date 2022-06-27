import classnames from 'classnames';
import React, { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';

import css from './HomePage.module.scss';
import FileUpload from '../../components/FileUpload/FileUpload';
import Footer from '../../Footer/Footer';
import HomeDisplayList from './HomeDisplayList';
import HomeSearchBar from './HomeSearchBar';
import ProjectSelectionModal from './ProjectSelectionModal';
import ResponseSelectionModal from './ResponseSelectionModal';
import SpecificationSelectionModal from './SpecificationSelectionModal';
import { addAlert } from '../../store/reducers/alert-reducer';
import { httpPost } from '../../api/http';
import { IAlert } from '../../models/IAlert';
import { IBank } from '../../Nexus/entities/IBank';
import { setEvaluations } from '../../store/reducers/evaluation-reducer';
import { useAppDispatch } from '../../store/hooks';
import { useGetBanksQuery } from '../../store/api/bankApi';
import { useHomeState } from './HomeContext';

const MAX_UPLOAD_SIZE = 10000000; // 10M

export default function HomePage(): React.ReactElement {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const {
    selectedBank,
    selectedSpecification,
    setSelectedSpecification,
    selectedResponse,
    setSelectedResponse
  } = useHomeState();

  const [latestPublishedProjects, setLatestPublishedProjects] = useState<
    IBank[]
  >([]);

  const { data: list } = useGetBanksQuery({
    pageSize: 500,
    page: 1,
    fieldName: 'title',
    order: 'DESC'
  });

  useEffect(() => {
    if (list) {
      const latestPublishedMap = new Map<string, IBank>();
      Object.values(list).forEach((bank) => {
        if (!bank.publishedDate || !bank.projectId) {
          return;
        }
        if (latestPublishedMap.has(bank.projectId)) {
          const oldValue = latestPublishedMap.get(bank.projectId);
          if (oldValue && oldValue.version < bank.version) {
            latestPublishedMap.set(bank.projectId, bank);
          }
        } else {
          latestPublishedMap.set(bank.projectId, bank);
        }
      });
      setLatestPublishedProjects(Array.from(latestPublishedMap.values()));
    }
  }, [list]);

  const onUpload = (files: FileList): void => {
    dispatch(setEvaluations([]));

    const formData = new FormData();
    let disableUploadMessage = '';
    for (let index = 0; index < files.length; index += 1) {
      const file = files[index];
      if (file.size > MAX_UPLOAD_SIZE) {
        disableUploadMessage = t('HOME_FILEUPL_TOO_LARGE');
        break;
      }
      if (file.type !== 'application/pdf') {
        disableUploadMessage = t('HOME_FILEUPL_WRONG_TYPE');
        break;
      }
      formData.append('file', file);
    }

    if (disableUploadMessage !== '') {
      const alert: IAlert = {
        id: uuidv4(),
        style: 'error',
        text: disableUploadMessage
      };
      dispatch(addAlert({ alert }));
      return;
    }

    httpPost<FormData, AxiosResponse>('/java/uploadPdf', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      responseType: 'json'
    })
      .then((httpResponse) => {
        if (httpResponse.data.title) {
          setSelectedSpecification(httpResponse.data);
        } else {
          setSelectedResponse(httpResponse.data);
        }
      })
      .catch(() => {
        const alert: IAlert = {
          id: uuidv4(),
          style: 'error',
          text: t('HOME_FILEUPL_UPLOAD_ERROR')
        };
        dispatch(addAlert({ alert }));
      });
  };

  return (
    <div className={css.HomePage}>
      <div className={css.Content}>
        <div className={css.Columns}>
          <div className={css.Column}>
            <HomeSearchBar list={latestPublishedProjects} />
          </div>
          <div className={classnames(css.Column, css.Cards)}>
            <div className={classnames(css.Card, css.Primary)}>
              <Link to={'/workbench'}>
                <label>{t('Workbench')}</label>
                <span>{t('Create projects')}</span>
              </Link>
            </div>
            <FileUpload
              accept={'application/pdf'}
              className={css.Card}
              description={t('HOME_FILEUPL_DESCRIPTION')}
              label={t('HOME_FILEUPL_LABEL')}
              onChange={onUpload}
              variant={'Tertiary'}
            />
          </div>
        </div>
        <div className={css.Columns}>
          <HomeDisplayList
            title={t('Newest banks')}
            list={latestPublishedProjects}
            orderedByDate={true}
          />
          <HomeDisplayList
            title={t('Alphabetically sorted')}
            list={latestPublishedProjects}
          />
        </div>
      </div>
      <Footer />
      {selectedBank && <ProjectSelectionModal selectedBank={selectedBank} />}
      {selectedSpecification && (
        <SpecificationSelectionModal
          selectedSpecification={selectedSpecification}
        />
      )}
      {selectedResponse && (
        <ResponseSelectionModal selectedResponse={selectedResponse} />
      )}
    </div>
  );
}
