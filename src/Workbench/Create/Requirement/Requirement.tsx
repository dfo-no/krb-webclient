import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import VariantsList from '../Variants/VariantsList';
import DeleteRequirement from './DeleteRequirement';
import makeStyles from '@mui/styles/makeStyles';
import theme from '../../../theme';
import { FormIconButton } from '../../Components/Form/FormIconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import EditRequirement from './EditRequirement';
import { useVariantState } from './VariantContext';
import { useSelectState } from '../SelectContext';
import NewVariant from '../Variants/NewVariant';
import { useParams } from 'react-router-dom';
import { IRouteParams } from '../../Models/IRouteParams';
import { useGetProjectQuery } from '../../../store/api/bankApi';

const useStyles = makeStyles({
  card: {
    backgroundColor: theme.palette.common.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    marginBottom: 32
  },
  active: {
    border: `2px solid ${theme.palette.purple.main}`,
    borderTop: `12px solid ${theme.palette.purple.main}`
  }
});

interface IProps {
  requirementIndex: number;
}

const Requirement = ({ requirementIndex }: IProps) => {
  const classes = useStyles();
  const { openVariants } = useVariantState();
  const { projectId } = useParams<IRouteParams>();
  const { data: project } = useGetProjectQuery(projectId);
  const { needIndex, setDeleteMode } = useSelectState();

  if (!project || needIndex === null) {
    return <></>;
  }

  const isActive = () => {
    return openVariants.length > 0;
  };

  const requirementDeleted = () => {
    setDeleteMode('');
  };

  const renderRequirement = () => {
    return (
      <Box className={`${classes.card} ${isActive() ? classes.active : ''}`}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '95%',
            margin: 2,
            borderBottom: `1px solid ${theme.palette.silver.main}`
          }}
        >
          <Typography
            variant={'mediumBold'}
            sx={{ alignSelf: 'center', paddingLeft: 1 }}
          >
            {project.needs[needIndex].requirements[requirementIndex].title}
          </Typography>
          <EditRequirement
            need={project.needs[needIndex]}
            requirement={
              project.needs[needIndex].requirements[requirementIndex]
            }
          />
          <FormIconButton
            hoverColor={theme.palette.dfoErrorRed.main}
            onClick={() =>
              setDeleteMode(
                project.needs[needIndex].requirements[requirementIndex].id
              )
            }
          >
            <DeleteIcon />
          </FormIconButton>
          <NewVariant
            need={project.needs[needIndex]}
            requirement={
              project.needs[needIndex].requirements[requirementIndex]
            }
          />
        </Box>
        <VariantsList
          requirement={project.needs[needIndex].requirements[requirementIndex]}
          requirementIndex={requirementIndex}
        />
      </Box>
    );
  };

  return (
    <DeleteRequirement
      children={renderRequirement()}
      need={project.needs[needIndex]}
      requirement={project.needs[needIndex].requirements[requirementIndex]}
      handleClose={requirementDeleted}
    />
  );
};

export default Requirement;
