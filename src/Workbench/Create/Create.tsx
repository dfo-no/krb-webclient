import { Box, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { Levelable } from '../../models/Levelable';
import { INeed } from '../../Nexus/entities/INeed';
import { IProduct } from '../../Nexus/entities/IProduct';
import { IRequirement } from '../../Nexus/entities/IRequirement';
import { useAppSelector } from '../../store/hooks';
import theme from '../../theme';
import ParentableSideBar from '../Components/ParentableSideBar';
import Requirements from './Requirements';
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
  needs: {
    width: '20%',
    border: `1px solid ${theme.palette.lightBlue.main}`
  },
  requirements: {
    width: '30%',
    border: `1px solid ${theme.palette.lightBlue.main}`
  },
  variants: {
    width: '50%',
    border: `1px solid ${theme.palette.lightBlue.main}`
  }
});

export default function Create(): React.ReactElement {
  const { project } = useAppSelector((state) => state.project);
  const classes = useStyles();

  const [selectedNeed, setSelectedNeed] = useState<null | Levelable<
    INeed | IProduct
  >>(null);
  const [selectedRequirement, setSelectedRequirement] =
    useState<null | IRequirement>(null);

  const updateSelectedNeed = (item: Levelable<INeed | IProduct>) => {
    setSelectedRequirement(null);
    setSelectedNeed(item);
  };

  return (
    <Box className={classes.editorContainer}>
      <Box className={classes.needs}>
        <h6 className={classes.headerText}>Behov</h6>
        <ParentableSideBar
          parentableArray={project.needs}
          updateSelectedFunction={updateSelectedNeed}
        />
      </Box>
      <Box className={classes.requirements}>
        <h6 className={classes.headerText}>Krav</h6>
        <Requirements
          selectedNeed={selectedNeed as Levelable<INeed> | null}
          updateSelectedFunction={setSelectedRequirement}
        />
      </Box>
      <Box className={classes.variants}>
        <h6 className={classes.headerText}>Variant</h6>
        <VariantList selectedRequirement={selectedRequirement} />
      </Box>
    </Box>
  );
}
