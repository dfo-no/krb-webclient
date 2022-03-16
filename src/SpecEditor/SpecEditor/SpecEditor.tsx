import { Box } from '@mui/material';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import SpecSideBar from '../SideBar/SpecSideBar';

export default function SpecEditor(): React.ReactElement {
  const { spec } = useAppSelector((state) => state.specification);
  const dispatch = useAppDispatch();
  const selectedBank = spec.bank;

  return (
    <Box>
      {' '}
      <SpecSideBar />
    </Box>
  );
}
