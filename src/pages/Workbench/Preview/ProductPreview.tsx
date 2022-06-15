import React from 'react';
import { Box, Divider, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import css from './Preview.module.scss';
import NeedPreview from './NeedPreview';
import theme from '../../../theme';
import Utils from '../../../common/Utils';
import { DFOCardHeader } from '../../../components/DFOCard/DFOCardHeader';
import { DFOHeaderContentBox } from '../../../components/DFOCard/DFOHeaderContentBox';
import { IRouteProjectParams } from '../../../models/IRouteProjectParams';
import { useGetProjectQuery } from '../../../store/api/bankApi';
import { usePreviewState } from './PreviewContext';

export default function ProductPreview(): React.ReactElement {
  const { t } = useTranslation();
  const { projectId } = useParams<IRouteProjectParams>();
  const { data: project } = useGetProjectQuery(projectId);
  const { selected } = usePreviewState();

  if (!project) {
    return <></>;
  }

  const renderNeeds = () => {
    if (!selected) {
      const needs = Utils.findVariantsUsedBySpesification(project);

      return needs.map((need) => {
        return <NeedPreview need={need} key={need.id} />;
      });
    } else {
      const needs = Utils.findVariantsUsedByProduct(selected, project);
      return needs.map((need) => {
        return <NeedPreview need={need} key={need.id} />;
      });
    }
  };

  return (
    <Box className={css.MainContent}>
      <DFOCardHeader>
        <DFOHeaderContentBox>
          <Typography variant="lgBold" className={css.headerTitle}>
            {selected ? selected.title : t('General requirements')}
          </Typography>
          <Divider color={theme.palette.silver.main} />
          <Typography variant="smBold" className={css.headerDescription}>
            {selected ? selected.description : ''}
          </Typography>
        </DFOHeaderContentBox>
      </DFOCardHeader>
      {renderNeeds()}
    </Box>
  );
}
