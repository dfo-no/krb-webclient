import { Box, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { Levelable } from '../../models/Levelable';
import { IProduct } from '../../Nexus/entities/IProduct';
import { IRequirement } from '../../Nexus/entities/IRequirement';
import { useAppSelector } from '../../store/hooks';
import theme from '../../theme';
import ParentableSideBar from '../Components/ParentableSideBar';
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
    minHeight: '100vh'
  },
  product: {
    width: '20%'
  },
  requirement: {
    width: '30%'
  },
  variant: {
    width: '50%'
  }
});

export default function Preview(): React.ReactElement {
  const { project } = useAppSelector((state) => state.project);
  const classes = useStyles();

  const [selectedProduct, setSelectedProduct] =
    useState<null | Levelable<IProduct>>(null);
  const [selectedRequirement, setSelectedRequirement] =
    useState<null | IRequirement>(null);

  return (
    <Box className={classes.editorContainer}>
      <Box className={classes.product}>
        <h6 className={classes.headerText}>Produkt</h6>
        <ParentableSideBar
          parentableArray={project.products}
          updateSelectedFunction={setSelectedProduct}
        />
      </Box>
      <Box className={classes.requirement}>
        <h6 className={classes.headerText}>Krav</h6>
        <RequirementsPerNeed
          selectedProduct={selectedProduct}
          updateSelectedFunction={setSelectedRequirement}
        />
      </Box>
      <Box className={classes.variant}>
        <h6 className={classes.headerText}>Variant</h6>
        <VariantList selectedRequirement={selectedRequirement} />
      </Box>
    </Box>
  );
}
