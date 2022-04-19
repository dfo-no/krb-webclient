import Box from '@mui/material/Box/Box';
import Button from '@mui/material/Button';
import React, { useState } from 'react';
import Dialog from '../../../components/DFODialog/DFODialog';
import NewNeedForm from './NewNeedForm';
import { useSelectState } from '../SelectContext';
import { Parentable } from '../../../models/Parentable';
import { INeed } from '../../../Nexus/entities/INeed';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { IRouteParams } from '../../Models/IRouteParams';
import { useGetProjectQuery } from '../../../store/api/bankApi';

interface IProps {
  buttonText: string;
}

const NewNeed = ({ buttonText }: IProps) => {
  const { projectId } = useParams<IRouteParams>();
  const { data: project } = useGetProjectQuery(projectId);
  const { t } = useTranslation();
  const [isOpen, setOpen] = useState(false);
  const { setNeedIndex, setNeedId } = useSelectState();

  if (!project) {
    return <></>;
  }

  const onClose = (newNeed: Parentable<INeed> | null) => {
    setOpen(false);
    if (newNeed) {
      setNeedIndex(project.needs.length);
      setNeedId(newNeed.id);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row-reverse',
        paddingTop: 2,
        paddingBottom: 2
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
