import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

interface IProps {
  children: React.ReactElement;
}

const SpecificationGuard = ({ children }: IProps) => {
  const { spec } = useAppSelector((state) => state.specification);

  if (!spec) {
    return <Redirect to={{ pathname: '/specification' }} />;
  }

  return children;
};

export default SpecificationGuard;
