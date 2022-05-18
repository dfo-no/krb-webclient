import { StandardContainer } from '../Components/StandardContainer';
import React from 'react';
import theme from '../../theme';
import { Box, Card, Typography } from '@mui/material';
import { DFOCardHeader } from '../../components/DFOCard/DFOCardHeader';
import { DFOHeaderContentBox } from '../../components/DFOCard/DFOHeaderContentBox';
import Utils from '../../common/Utils';
import { useParams } from 'react-router-dom';
import { IRouteParams } from '../Models/IRouteParams';
import { useGetProjectQuery } from '../../store/api/bankApi';
import { usePreviewState } from './PreviewContext';
import NeedPreview from './NeedPreview';
import { ScrollableContainer } from '../Components/ScrollableContainer';
import { useTranslation } from 'react-i18next';

export default function ProductPreview(): React.ReactElement {
  const { t } = useTranslation();
  const { projectId } = useParams<IRouteParams>();
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
    <StandardContainer sx={{ width: '90%', maxHeight: '100%' }}>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: theme.palette.gray200.main,
          height: '100%',
          paddingBottom: 2
        }}
      >
        <DFOCardHeader>
          <DFOHeaderContentBox>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                paddingBottom: 0.5,
                borderBottom: `1px solid ${theme.palette.silver.main}`
              }}
            >
              <Typography variant="lgBold">
                {selected ? selected.title : t('General requirement')}
              </Typography>
            </Box>
            <Typography variant="smBold" sx={{ paddingTop: 1 }}>
              {selected ? selected.description : ''}
            </Typography>
          </DFOHeaderContentBox>
        </DFOCardHeader>
        <ScrollableContainer>{renderNeeds()}</ScrollableContainer>
      </Card>
    </StandardContainer>
  );
}
