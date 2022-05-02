import Box from '@mui/material/Box/Box';
import Button from '@mui/material/Button/Button';
import { useState } from 'react';
import Dialog from '../../../components/DFODialog/DFODialog';
import { Parentable } from '../../../models/Parentable';
import { INeed } from '../../../Nexus/entities/INeed';
import NewRequirementForm from './NewRequirementForm';
import { useTranslation } from 'react-i18next';
import { useSelectState } from '../SelectContext';
interface IProps {
  need: Parentable<INeed>;
}

const NewRequirement = ({ need }: IProps) => {
  const { t } = useTranslation();
  const [isNewOpen, setNewOpen] = useState(false);
  const { setCreateVariant } = useSelectState();

  const onClose = (id: string) => {
    setNewOpen(false);
    setCreateVariant(id);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        m: 1,
        flexDirection: 'row-reverse',
        marginRight: 0
      }}
    >
      <Button variant="primary" onClick={() => setNewOpen(true)}>
        Legg til nytt krav
      </Button>
      <Dialog
        isOpen={isNewOpen}
        handleClose={() => setNewOpen(false)}
        children={<NewRequirementForm need={need} handleClose={onClose} />}
      />
    </Box>
  );
};

export default NewRequirement;
