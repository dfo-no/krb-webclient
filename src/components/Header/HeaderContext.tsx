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
