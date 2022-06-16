import classnames from 'classnames';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';

import css from './HomePage.module.scss';
import Footer from '../../Footer/Footer';
import HomeDisplayList from './HomeDisplayList';
import HomeSearchBar from './HomeSearchBar';
import ProjectSelectionModal from './ProjectSelectionModal';
import {
  addProduct,
  setSpecification
} from '../../store/reducers/response-reducer';
import { httpPost } from '../../api/http';
import { IBank } from '../../Nexus/entities/IBank';
import { ISpecification } from '../../Nexus/entities/ISpecification';
import { ISpecificationProduct } from '../../models/ISpecificationProduct';
import { selectBank } from '../../store/reducers/selectedBank-reducer';
import { useAppDispatch } from '../../store/hooks';
import { useBankState } from '../../components/BankContext/BankContext';
import { useGetBanksQuery } from '../../store/api/bankApi';

const MAX_UPLOAD_SIZE = 10000000; // 10M

export default function HomePage(): React.ReactElement {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { t } = useTranslation();
  const { selectedBank } = useBankState();

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
      alert(disableUploadMessage);
      return;
    }

    httpPost<FormData, AxiosResponse>('/java/uploadPdf', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      responseType: 'json'
    })
      .then((response) => {
        const specification: ISpecification = response.data;
        dispatch(selectBank(specification.bank.id));
        dispatch(setSpecification(specification));
        specification.products.forEach((product: ISpecificationProduct) => {
          dispatch(
            addProduct({
              id: product.id,
              title: product.title,
              description: product.description,
              originProduct: product,
              price: 0,
              requirementAnswers: []
            })
          );
        });
        history.push(`/response/${response.data.bank.id}`);
        return response;
      })
      .catch((error: AxiosError) => {
        console.error(error);
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
    </div>
  );
}
