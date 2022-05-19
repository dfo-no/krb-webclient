import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

interface IProps {
  children: React.ReactElement;
}

const SpecificationGuard = ({ children }: IProps) => {
  const { spec } = useAppSelector((state) => state.specification);

  if (!spec || !spec.bank || !spec.bank.id) {
    return <Redirect to={{ pathname: '/' }} />;
  }

  return children;
};

export default SpecificationGuard;
