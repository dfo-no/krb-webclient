import React from 'react';
import { Box } from '@mui/material/';
import { useParams } from 'react-router-dom';

import css from './Preview.module.scss';
import LoaderSpinner from '../../../common/LoaderSpinner';
import PreviewSideBar from './PreviewSideBar';
import ProductPreview from './ProductPreview';
import { IProduct } from '../../../Nexus/entities/IProduct';
import { IRouteProjectParams } from '../../../models/IRouteProjectParams';
import { useGetProjectQuery } from '../../../store/api/bankApi';

export default function Preview(): React.ReactElement {
  const { projectId } = useParams<IRouteProjectParams>();
  const { data: project } = useGetProjectQuery(projectId);

  if (!project) {
    return <LoaderSpinner />;
  }

  const nonDeletedProducts = (): IProduct[] => {
    return project.products.filter((product) => product.deletedDate === null);
  };

  return (
    <Box className={css.Preview}>
      <PreviewSideBar parentableArray={nonDeletedProducts()} />
      <ProductPreview />
    </Box>
  );
}
