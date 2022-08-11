import React from 'react';

import css from '../Stylesheets/Editor.module.scss';
import PrefilledResponseSidebar from './SideBar/PrefilledResponseSidebar';
import AnswerProduct from './Answer/AnswerProduct';

export default function PrefilledResponseEditor(): React.ReactElement {
  return (
    <div className={css.Editor}>
      <PrefilledResponseSidebar />
      <div className={css.Content}>
        <AnswerProduct />
      </div>
    </div>
  );
}
