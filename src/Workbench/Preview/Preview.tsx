import {
  Box,
  List,
  ListItem,
  ListItemText,
  makeStyles
} from '@material-ui/core';
import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import { Levelable } from '../../models/Levelable';
import { IProduct } from '../../Nexus/entities/IProduct';
import { IRequirement } from '../../Nexus/entities/IRequirement';
import { useAppSelector } from '../../store/hooks';
import theme from '../../theme';
import ParentableSideBar from '../Components/ParentableSideBar';
import GenericRequirementTile from './GenericRequirementTile';
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

  const [isRequirement, setIsRequirement] = useState(false);

  const [selectedProduct, setSelectedProduct] =
    useState<null | Levelable<IProduct>>(null);
  const [selectedRequirement, setSelectedRequirement] =
    useState<null | IRequirement>(null);

  const updateSelectedProduct = (item: Levelable<IProduct>) => {
    setIsRequirement(false);
    setSelectedRequirement(null);
    setSelectedProduct(item);
  };

  const updateRequirementSelected = () => {
    setIsRequirement(true);
    setSelectedRequirement(null);
    setSelectedProduct(null);
  };
  return (
    <Box className={classes.editorContainer}>
      <Box className={classes.product}>
        <h6 className={classes.headerText}>Produkt</h6>
        <GenericRequirementTile
          updateSelectedFunction={updateRequirementSelected}
        />
        <ParentableSideBar
          parentableArray={project.products}
          updateSelectedFunction={updateSelectedProduct}
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
