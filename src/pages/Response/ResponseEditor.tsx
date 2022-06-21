import React from 'react';
import { Box } from '@mui/material';

import AnswerProduct from './Answer/AnswerProduct';
import css from './ResponseEditor.module.scss';
import ResponseSideBar from './SideBar/ResponseSideBar';

export default function ResponseEditor(): React.ReactElement {
  return (
    <Box className={css.ResponseEditor}>
      <ResponseSideBar />
      <Box className={css.content}>
        <AnswerProduct />
      </Box>
    </Box>
  );
}
