import { useState } from 'react';
import { createContainer } from 'unstated-next';

const useHeader = () => {
  const [title, setTitle] = useState('');
  const [isProject, setIsProject] = useState(false);
  return {
    title,
    setTitle,
    isProject,
    setIsProject,
  };
};

export const HeaderContainer = createContainer(useHeader);
// import { ReactElement, useState } from 'react';
// import { createContainer } from 'unstated-next';

// const useHeader = () => {
//   type HeaderState = {
//     title: string;
//     // toolbar: ReactElement<ToolbarProps>;
//     toolbar?: ReactElement;
//   };
//   const [title, setTitle] = useState<HeaderState>({ title: '' });
//   const [isProject, setIsProject] = useState(false);
//   return {
//     title,
//     setTitle,
//     isProject,
//     setIsProject,
//   };
// };

// export const HeaderContainer = createContainer(useHeader);
