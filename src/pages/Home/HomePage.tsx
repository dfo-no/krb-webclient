import classnames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import css from './HomePage.module.scss';
import HomeDisplayList from './HomeDisplayList';
import HomeSearchBar from './HomeSearchBar';
import { IBank } from '../../Nexus/entities/IBank';
import { useGetBanksQuery } from '../../store/api/bankApi';
import { HomePageUpload } from './HomePageUpload';
import { WORKBENCH } from '../../common/PathConstants';

export default function HomePage(): React.ReactElement {
  const { t } = useTranslation();
  const [selectedBank, setSelectedBank] = useState<IBank | null>(null);

  const [latestPublishedProjects, setLatestPublishedProjects] = useState<
    IBank[]
  >([]);

  const { data: listOfBanks } = useGetBanksQuery({
    pageSize: 500,
    page: 1,
    fieldName: 'title',
    order: 'DESC',
  });

  useEffect(() => {
    if (listOfBanks) {
      const latestPublishedMap = new Map<string, IBank>();
      Object.values(listOfBanks).forEach((bank) => {
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
  }, [listOfBanks]);

  return (
    <div className={css.HomePage}>
      <div className={css.Content}>
        <div className={css.Columns}>
          <div className={css.Column}>
            <HomeSearchBar
              list={latestPublishedProjects}
              setSelectedBank={setSelectedBank}
            />
          </div>
          <div className={classnames(css.Column, css.Cards)}>
            <div className={classnames(css.Card, css.Primary)}>
              <Link to={`/${WORKBENCH}`}>
                <label>{t('common.Workbench')}</label>
                <span>{t('HomePage.Create projects')}</span>
              </Link>
            </div>
            <HomePageUpload
              selectedBank={selectedBank}
              setSelectedBank={setSelectedBank}
            />
          </div>
        </div>
        <div className={css.Columns}>
          <HomeDisplayList
            dataCy={'newest-banks-container'}
            title={t('HomePage.Newest banks')}
            list={latestPublishedProjects}
            orderedByDate={true}
            setSelectedBank={setSelectedBank}
          />
          <HomeDisplayList
            title={t('HomePage.Alphabetically sorted')}
            list={latestPublishedProjects}
            setSelectedBank={setSelectedBank}
          />
        </div>
      </div>
    </div>
  );
}
