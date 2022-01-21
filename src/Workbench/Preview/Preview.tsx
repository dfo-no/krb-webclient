import { Box, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import { BsArrowReturnRight, BsPencil } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Utils from '../../common/Utils';
import { Levelable } from '../../models/Levelable';
import { Nestable } from '../../models/Nestable';
import { INeed } from '../../Nexus/entities/INeed';
import { IProduct } from '../../Nexus/entities/IProduct';
import { IRequirement } from '../../Nexus/entities/IRequirement';
import { IVariant } from '../../Nexus/entities/IVariant';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectNeed } from '../../store/reducers/selectedNeed-reducer';
import { selectRequirement } from '../../store/reducers/selectedRequirement-reducer';
import theme from '../../theme';
import ParentableSideBar from '../Components/ParentableSideBar';
import RequirementsPerNeed from './RequirementsPerNeed';

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

    flexDirection: 'row'
  },
  product: {
    flexGrow: 1
  },
  requirement: {
    flexGrow: 2
  },
  variant: {
    flexGrow: 4
  }
});

export default function Preview(): React.ReactElement {
  const dispatch = useAppDispatch();
  const { project } = useAppSelector((state) => state.project);
  const { product } = useAppSelector((state) => state.selectedProduct);
  const classes = useStyles();

  const [selectedProduct, setSelectedProduct] =
    useState<null | Levelable<IProduct>>(null);
  const [selectedRequirement, setSelectedRequirement] =
    useState<null | IRequirement>(null);

  return (
    <>
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
        </Box>
      </Box>
    </>
  );
}
