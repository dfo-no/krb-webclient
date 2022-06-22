import classnames from 'classnames';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';

import css from './HomePage.module.scss';
import Footer from '../../Footer/Footer';
import HomeDisplayList from './HomeDisplayList';
import HomeSearchBar from './HomeSearchBar';
import ProjectSelectionModal from './ProjectSelectionModal';
import SpecificationSelectionModal from './SpecificationSelectionModal';
import { addAlert } from '../../store/reducers/alert-reducer';
import { httpPost } from '../../api/http';
import { IAlert } from '../../models/IAlert';
import { IBank } from '../../Nexus/entities/IBank';
import { ISpecification } from '../../Nexus/entities/ISpecification';
import { useAppDispatch } from '../../store/hooks';
import { useHomeState } from './HomeContext';
import { useGetBanksQuery } from '../../store/api/bankApi';

const MAX_UPLOAD_SIZE = 10000000; // 10M

export default function HomePage(): React.ReactElement {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [inputKey, setInputKey] = useState(0);
  const { selectedBank, selectedSpecification, setSelectedSpecification } =
    useHomeState();

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

  const onUpload = (event: ChangeEvent<HTMLInputElement>): void => {
    setInputKey((key) => key + 1);
    const formData = new FormData();
    const files = event.target.files as FileList;
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
        const specification: ISpecification = httpResponse.data;
        setSelectedSpecification(specification);
        return;
      })
      .catch(() => {
        const alert: IAlert = {
          id: uuidv4(),
          style: 'error',
          text: t('HOME_FILEUPL_UPLOAD_ERROR')
        };
        dispatch(addAlert({ alert }));
        return;
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
            <div className={css.Card}>
              <Link to={'/workbench'}>
                <label>{t('Workbench')}</label>
                <span>{t('Create projects')}</span>
              </Link>
            </div>
            <div className={classnames(css.Card, css.Tertiary)}>
              <div>
                <label>{t('HOME_FILEUPL_LABEL')}</label>
                <input
                  key={inputKey}
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => onUpload(e)}
                />
                <span>{t('HOME_FILEUPL_DESCRIPTION')}</span>
              </div>
            </div>
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
    </div>
  );
}
