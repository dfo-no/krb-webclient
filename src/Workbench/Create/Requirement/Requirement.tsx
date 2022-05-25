import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import VariantsList from '../Variants/VariantsList';
import DeleteRequirement from './DeleteRequirement';
import makeStyles from '@mui/styles/makeStyles';
import theme from '../../../theme';
import { FormIconButton } from '../../Components/Form/FormIconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditRequirement from './EditRequirement';
import { useVariantState } from '../../Components/VariantContext';
import { useSelectState } from '../SelectContext';
import { useParams } from 'react-router-dom';
import { IRouteParams } from '../../Models/IRouteParams';
import { useGetProjectQuery } from '../../../store/api/bankApi';
import AddIcon from '@mui/icons-material/Add';

const useStyles = makeStyles({
  card: {
    backgroundColor: theme.palette.common.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%'
  },
  active: {
    border: `0.2rem solid ${theme.palette.secondary.main}`,
    borderTop: `1.2rem solid ${theme.palette.secondary.main}`
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
            borderBottom: `0.1rem solid ${theme.palette.silver.main}`
          }}
        >
          <Typography variant="mdBold" sx={{ alignSelf: 'center' }}>
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
          >
            <DeleteIcon />
          </FormIconButton>
          <FormIconButton
            hoverColor={theme.palette.green.main}
            sx={{ marginLeft: 0, marginRight: -2 }}
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
