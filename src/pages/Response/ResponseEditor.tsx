import React from 'react';
import { Box } from '@mui/material';

import css from './ResponseEditor.module.scss';
import AnswerProduct from './Answer/AnswerProduct';
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
