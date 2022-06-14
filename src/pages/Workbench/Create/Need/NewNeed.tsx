import Box from '@mui/material/Box/Box';
import Button from '@mui/material/Button';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import Dialog from '../../../../components/DFODialog/DFODialog';
import NewNeedForm from './NewNeedForm';
import { INeed } from '../../../../Nexus/entities/INeed';
import { IRouteProjectParams } from '../../../../models/IRouteProjectParams';
import { Parentable } from '../../../../models/Parentable';
import { useGetProjectQuery } from '../../../../store/api/bankApi';
import { useSelectState } from '../SelectContext';

interface IProps {
  buttonText: string;
}

const NewNeed = ({ buttonText }: IProps) => {
  const { projectId } = useParams<IRouteProjectParams>();
  const { data: project } = useGetProjectQuery(projectId);
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
        paddingBottom: 2
      }}
    >
      <Button variant="primary" onClick={() => setOpen(true)}>
        {buttonText}
      </Button>
      <Dialog
        isOpen={isOpen}
        handleClose={() => setOpen(false)}
        children={<NewNeedForm handleClose={onClose} />}
      />
    </Box>
  );
};

export default NewNeed;
