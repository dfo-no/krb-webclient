import Box from '@mui/material/Box/Box';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Dialog from '../../../components/DFODialog/DFODialog';
import NewNeedForm from './NewNeedForm';
import { useSelectState } from '../SelectContext';
import { Parentable } from '../../../models/Parentable';
import { INeed } from '../../../Nexus/entities/INeed';
import { useTranslation } from 'react-i18next';

interface IProps {
  buttonText: string;
}

const NewNeed = ({ buttonText }: IProps) => {
  const { t } = useTranslation();
  const [isOpen, setOpen] = useState(false);
  const { setNeed } = useSelectState();

  const onClose = (newNeed: Parentable<INeed> | null) => {
    setOpen(false);
    if (newNeed) {
      setNeed(newNeed);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        m: 1,
        flexDirection: 'row-reverse'
      }}
    >
      <Button variant="primary" onClick={() => setOpen(true)}>
        {buttonText}
      </Button>
      <Dialog
        title={t('create need')}
        isOpen={isOpen}
        handleClose={() => setOpen(false)}
        children={<NewNeedForm handleClose={onClose} />}
      />
    </Box>
  );
};

export default NewNeed;
