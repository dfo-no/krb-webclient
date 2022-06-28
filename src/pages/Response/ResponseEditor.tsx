import React from 'react';

import AnswerProduct from './Answer/AnswerProduct';
import css from '../Stylesheets/Editor.module.scss';
import ResponseSideBar from './SideBar/ResponseSideBar';

export default function ResponseEditor(): React.ReactElement {
  return (
    <div className={css.Editor}>
      <ResponseSideBar />
      <div className={css.Content}>
        <AnswerProduct />
      </div>
    </div>
  );
}
