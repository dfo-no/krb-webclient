import React from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import css from './GuidanceText.module.scss';

export default function GuidanceText({ text }: { text: string }) {
  return (
    <div className={css.GuidanceText}>
      <InfoOutlinedIcon />
      {text}
    </div>
  );
}
