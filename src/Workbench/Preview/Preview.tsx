import { Box, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { Levelable } from '../../models/Levelable';
import { IProduct } from '../../Nexus/entities/IProduct';
import { IRequirement } from '../../Nexus/entities/IRequirement';
import { useAppSelector } from '../../store/hooks';
import theme from '../../theme';
import PreviewSideBar from './PreviewSideBar';
import RequirementsPerNeed from './RequirementsPerNeed';
import VariantList from './VariantList';

const useStyles = makeStyles({
  headerText: {
    margin: '0 0 0 30px',
    fontWeight: 'bold',
    color: theme.palette.primary.main
  },
  editorContainer: {
    flex: '1',
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: theme.palette.gray100.main
  },
  product: {
    width: '30%'
  },
  requirement: {
    width: '25%'
  },
  variant: {
    width: '45%'
  }
});

export default function Preview(): React.ReactElement {
  const { project } = useAppSelector((state) => state.project);
  const classes = useStyles();

  const [isRequirement, setIsRequirement] = useState(false);

  const [selectedProduct, setSelectedProduct] =
    useState<null | Levelable<IProduct>>(null);
  const [selectedRequirement, setSelectedRequirement] =
    useState<null | IRequirement>(null);

  const updateSelected = (
    isRequirementUpdate: boolean,
    selectedRequirementUpdate: null | IRequirement,
    selectedProductUpdate: null | Levelable<IProduct>
  ) => {
    setIsRequirement(isRequirementUpdate);
    setSelectedRequirement(selectedRequirementUpdate);
    setSelectedProduct(selectedProductUpdate);
  };

  return (
    <Box className={classes.editorContainer}>
      <Box className={classes.product}>
        <PreviewSideBar
          parentableArray={project.products}
          updateSelectedFunction={updateSelected}
        />
      </Box>
      <Box className={classes.requirement}>
        <h6 className={classes.headerText}>Krav</h6>
        <RequirementsPerNeed
          selectedProduct={selectedProduct}
          updateSelectedFunction={setSelectedRequirement}
          isRequirement={isRequirement}
        />
      </Box>
      <Box className={classes.variant}>
        <h6 className={classes.headerText}>Variant</h6>
        <VariantList selectedRequirement={selectedRequirement} />
      </Box>
    </Box>
  );
}
