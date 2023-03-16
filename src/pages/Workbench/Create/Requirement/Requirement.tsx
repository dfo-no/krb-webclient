import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';

import DeleteRequirement from './DeleteRequirement';
import { EditRequirement } from './EditRequirement';
import theme from '../../../../theme';
import { VariantsList } from '../Variants/VariantsList';
import { FormIconButton } from '../../../../components/Form/FormIconButton';
import { useSelectState } from '../SelectContext';
import { useVariantState } from '../../VariantContext';
import { RequirementForm } from '../../../../api/nexus2';

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
  projectRef: string;
  needRef: string;
  requirement: RequirementForm | undefined;
}

const Requirement = ({ projectRef, needRef, requirement }: Props) => {
  const classes = useStyles();
  const { openVariants } = useVariantState();
  const { needIndex, setDeleteCandidateId, setCreateVariant } =
    useSelectState();

  if (needIndex === null) {
    return <></>;
  }

  const isActive = () => {
    return openVariants.length > 0;
  };

  const requirementDeleted = () => {
    setDeleteCandidateId('');
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
            {requirement.title}
          </Typography>
          <EditRequirement
            projectRef={projectRef}
            needRef={needRef}
            requirement={requirement}
          />
          <FormIconButton
            hoverColor={theme.palette.errorRed.main}
            onClick={() => setDeleteCandidateId(requirement.ref)}
            sx={{ alignSelf: 'baseline' }}
          >
            <DeleteIcon />
          </FormIconButton>
          <FormIconButton
            hoverColor={theme.palette.green.main}
            sx={{ alignSelf: 'baseline', marginLeft: 0, marginRight: -2 }}
            onClick={() => setCreateVariant(requirement.ref)}
          >
            <AddIcon />
          </FormIconButton>
        </Box>
        <VariantsList
          projectRef={projectRef}
          needRef={needRef}
          requirementRef={requirement.ref}
        />
      </Box>
    );
  };

  return (
    <DeleteRequirement
      children={renderRequirement()}
      projectRef={projectRef}
      needRef={needRef}
      requirementRef={requirement.ref}
      handleClose={requirementDeleted}
    />
  );
};

export default Requirement;
