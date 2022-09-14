import React, { useEffect, useState } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { Box, Button, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';

import DFODialog from '../../../components/DFODialog/DFODialog';
import EditProductForm from './EditProductForm';
import theme from '../../../theme';
import { DFOCardHeader } from '../../../components/DFOCard/DFOCardHeader';
import { DFOCardHeaderIconButton } from '../../../components/DFOCard/DFOCardHeaderIconButton';
import { DFOHeaderContentBox } from '../../../components/DFOCard/DFOHeaderContentBox';
import { useProductIndexState } from '../../../components/ProductIndexContext/ProductIndexContext';
import { useSelectState } from '../../Workbench/Create/SelectContext';
import { useSpecificationState } from '../SpecificationContext';
import Nexus from '../../../Nexus/Nexus';
import { IMark } from '../../../Nexus/entities/IMark';
import { ModelType, Weighting, WeightingStep } from '../../../Nexus/enums';
import SliderCtrl from '../../../FormProvider/SliderCtrl';
import { ISpecification } from '../../../Nexus/entities/ISpecification';

export default function ProductHeader(): React.ReactElement {
  const { t } = useTranslation();
  const { specification } = useSpecificationState();
  const { productIndex } = useProductIndexState();
  const [editingProduct, setEditingProduct] = useState(false);
  const [editingSpec, setEditingSpec] = useState(false);
  const { setDeleteMode } = useSelectState();
  const nexus = Nexus.getInstance();
  const [sliderMark, setSliderMark] = useState<IMark[]>([
    { value: Weighting.MEDIUM, label: t(Weighting[Weighting.MEDIUM]) }
  ]);

  const methods = useForm<ISpecification>({
    resolver: nexus.resolverService.resolver(ModelType.specification),
    defaultValues: specification
  });

  const useWeight = useWatch({ name: 'weight', control: methods.control });

  useEffect(() => {
    setSliderMark([{ value: useWeight, label: t(Weighting[useWeight]) }]);
  }, [t, useWeight]);

  return (
    <FormProvider {...methods}>
      <DFOCardHeader>
        <DFOHeaderContentBox>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              paddingBottom: 0.5,
              borderBottom: '0.1rem solid'
            }}
          >
            <Typography variant="lgBold">
              {specification.products[productIndex]?.title ??
                t('General requirement')}
            </Typography>
            {productIndex === -1 && (
              <DFOCardHeaderIconButton
                sx={{ marginLeft: 'auto', paddingRight: 2 }}
                onClick={() => setEditingSpec(true)}
              >
                <EditIcon />
              </DFOCardHeaderIconButton>
            )}
            {productIndex !== -1 && (
              <>
                <DFOCardHeaderIconButton
                  sx={{ marginLeft: 'auto', paddingRight: 2 }}
                  onClick={() => setEditingProduct(true)}
                >
                  <EditIcon />
                </DFOCardHeaderIconButton>
                <DFOCardHeaderIconButton
                  hoverColor={theme.palette.errorRed.main}
                  onClick={() =>
                    setDeleteMode(specification.products[productIndex].id)
                  }
                >
                  <DeleteIcon />
                </DFOCardHeaderIconButton>
              </>
            )}
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', paddingTop: 1 }}>
            <Typography variant="smBold">
              {specification.products[productIndex]?.description ?? ''}
            </Typography>

            {productIndex !== -1 &&
              specification.products[productIndex].originProduct && (
                <Typography
                  variant="smBold"
                  sx={{ marginLeft: 'auto', paddingRight: 2 }}
                >
                  {t('From product type')}
                  {': '}
                  <i>
                    {specification.products[productIndex].originProduct.title}
                  </i>
                </Typography>
              )}
          </Box>
          {editingProduct && (
            <DFODialog
              isOpen={true}
              handleClose={() => setEditingProduct(false)}
              children={
                <EditProductForm
                  handleClose={() => setEditingProduct(false)}
                  specificationProduct={specification.products[productIndex]}
                />
              }
            />
          )}
        </DFOHeaderContentBox>
      </DFOCardHeader>
      {editingSpec && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: theme.palette.common.white,
            paddingTop: 'var(--big-gap)',
            paddingBottom: 'var(--tiny-gap)',
            paddingRight: 'var(--small-gap)'
          }}
        >
          <Box
            sx={{
              marginRight: 'var(--large-gap)',
              marginLeft: 'var(--large-gap)'
            }}
          >
            <SliderCtrl
              label={`${t('Weighting')}:`}
              name={'weight'}
              min={Weighting.LOWEST}
              step={WeightingStep}
              max={Weighting.HIGHEST}
              showValue={false}
              marks={sliderMark}
            />
          </Box>
          <Button
            sx={{ marginTop: 'var(--small-gap)', marginLeft: 'auto' }}
            variant={'primary'}
            onClick={() => setEditingSpec(false)}
          >
            {t('Close')}
          </Button>
        </Box>
      )}
    </FormProvider>
  );
}
