import Box from '@mui/material/Box/Box';
import Button from '@mui/material/Button/Button';
import { t } from 'i18next';
import { useState } from 'react';

import Dialog from '../../../../components/DFODialog/DFODialog';
import { NewRequirementForm } from './NewRequirementForm';
import { useSelectState } from '../SelectContext';
import { NeedForm } from '../../../../api/nexus2';

interface Props {
  projectRef: string;
  needRef: string;
}

export const NewRequirement = ({ projectRef, needRef }: Props) => {
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
        marginRight: 0,
      }}
    >
      <Button variant="primary" onClick={() => setNewOpen(true)}>
        {t('Add new requirement')}
      </Button>
      <Dialog
        isOpen={isNewOpen}
        handleClose={() => setNewOpen(false)}
        children={
          <NewRequirementForm
            projectRef={projectRef}
            needRef={needRef}
            handleClose={onClose}
          />
        }
      />
    </Box>
  );
};
