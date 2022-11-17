import { useState } from 'react';
import { createContainer } from 'unstated-next';

const useHeader = () => {
  const [title, setTitle] = useState('');
  return { title, setTitle };
};

export const HeaderContainer = createContainer(useHeader);
