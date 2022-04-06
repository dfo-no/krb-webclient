import Box from '@mui/material/Box';
import React from 'react';
import { useParams } from 'react-router-dom';
import LoaderSpinner from '../../common/LoaderSpinner';
import { useGetProjectQuery } from '../../store/api/bankApi';
import { IRouteParams } from '../Models/IRouteParams';
import Sidebar from './Sidebar';
import ProductPreview from './ProductPreview';
import theme from '../../theme';

export default function Preview(): React.ReactElement {
  const { projectId } = useParams<IRouteParams>();
  const { data: project } = useGetProjectQuery(projectId);

  if (!project) {
    return <LoaderSpinner />;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flex: '1',
        height: '100%',
        width: '100%',
        backgroundColor: theme.palette.gray100.main
      }}
    >
      <Box sx={{ width: '25%', height: '100%' }}>
        <Sidebar parentableArray={project.products} />
      </Box>
      <Box sx={{ height: '100%', flexGrow: 1, minWidth: 0 }}>
        <ProductPreview />
      </Box>
    </Box>
  );
}
