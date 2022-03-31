import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSpecificationState } from './SpecificationContext';

interface IProps {
  children: React.ReactNode;
}

const SpecificationGuard = ({ children }: IProps) => {
  const { specification } = useSpecificationState();

  if (!specification) {
    return <Redirect to={{ pathname: '/specification' }} />;
  }

  return <>{children}</>;
};

export default SpecificationGuard;
