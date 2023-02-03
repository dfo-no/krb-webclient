import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import { useParams } from 'react-router-dom';

import DeleteRequirement from './DeleteRequirement';
import EditRequirement from './EditRequirement';
import theme from '../../../../theme';
import VariantsList from '../Variants/VariantsList';
import { FormIconButton } from '../../../../components/Form/FormIconButton';
import { IRouteProjectParams } from '../../../../models/IRouteProjectParams';
import { useGetProjectQuery } from '../../../../store/api/bankApi';
import { useSelectState } from '../SelectContext';
import { useVariantState } from '../../VariantContext';

const useStyles = makeStyles({
  card: {
    backgroundColor: theme.palette.common.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
  },
  active: {
    border: `0.2rem solid ${theme.palette.secondary.main}`,
    borderTop: `1.2rem solid ${theme.palette.secondary.main}`,
    borderRadius: '0.5rem',
  },
});

interface Props {
  requirementIndex: number;
}

const Requirement = ({ requirementIndex }: Props) => {
  const classes = useStyles();
  const { openVariants } = useVariantState();
  const { projectId } = useParams<IRouteProjectParams>();
  const { data: project } = useGetProjectQuery(projectId);
  const { needIndex, setDeleteMode, setCreateVariant } = useSelectState();

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
            margin: 2,
            paddingRight: 1,
            paddingBottom: 1,
            borderBottom: `0.1rem solid ${theme.palette.silver.main}`,
          }}
        >
          <Typography
            variant="mdBold"
            sx={{ alignSelf: 'center', fontFamily: 'var(--header-font)' }}
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
            hoverColor={theme.palette.errorRed.main}
            onClick={() =>
              setDeleteMode(
                project.needs[needIndex].requirements[requirementIndex].id
              )
            }
            sx={{ alignSelf: 'baseline' }}
          >
            <DeleteIcon />
          </FormIconButton>
          <FormIconButton
            hoverColor={theme.palette.green.main}
            sx={{ alignSelf: 'baseline', marginLeft: 0, marginRight: -2 }}
            onClick={() =>
              setCreateVariant(
                project.needs[needIndex].requirements[requirementIndex].id
              )
            }
          >
            <AddIcon />
          </FormIconButton>
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
