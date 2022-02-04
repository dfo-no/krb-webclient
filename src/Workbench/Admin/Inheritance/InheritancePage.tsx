import { Box, makeStyles } from '@material-ui/core';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Utils from '../../../common/Utils';
import { IInheritedBank } from '../../../models/IInheritedBank';
import { useGetAllBanksQuery } from '../../../store/api/bankApi';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { putProjectThunk } from '../../../store/reducers/project-reducer';
import InheritanceSearch from './InheritanceSearch';

const useStyles = makeStyles({
  SearchResultHeader: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  searchWrapper: {
    width: '50%',
    marginLeft: '2%'
  }
});

export default function InheritancePage(): React.ReactElement {
  const { project } = useAppSelector((state) => state.project);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const classes = useStyles();

  const removeInheritance = (projectId: string, inheritedId: string) => {
    const updatedProject = Utils.removeInheritedBank(
      project,
      projectId,
      inheritedId
    );
    dispatch(putProjectThunk(updatedProject));
  };

  const renderInheritedBanks = (inheritanceList: IInheritedBank[]) => {
    inheritanceList
      .slice()
      .sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1));
    const projects = inheritanceList.map((element: IInheritedBank) => {
      return (
        <Box key={element.id}>
          <Box className={classes.SearchResultHeader}>
            <h5>{element.title}</h5>{' '}
            <Button
              variant="primary"
              onClick={() => removeInheritance(element.projectId, element.id)}
            >
              <DeleteIcon />
            </Button>
          </Box>

          <p>{element.description}</p>
        </Box>
      );
    });
    return <Box className=" mt-5">{projects}</Box>;
  };

  return (
    <Box className={classes.searchWrapper}>
      <Box>{<InheritanceSearch />}</Box>
      <Box>
        {project.inheritedBanks.length === 0 && <p>Ingen Avhengigheter</p>}
        {project.inheritedBanks.length > 0 && <p>Avhengigheter:</p>}
        {renderInheritedBanks(project.inheritedBanks)}
      </Box>
    </Box>
  );
}
