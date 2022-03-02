import { joiResolver } from '@hookform/resolvers/joi';
import React from 'react';
import { useForm } from 'react-hook-form';
import {
  BaseRequirementSchema,
  IRequirement
} from '../../Nexus/entities/IRequirement';

interface IProps {
  requirement: IRequirement;
}

const Requirement = ({ requirement }: IProps) => {
  const methods = useForm<IRequirement>({
    resolver: joiResolver(BaseRequirementSchema),
    defaultValues: requirement
  });

  const onSubmit = async (post: IRequirement) => {
    console.log(post);
  };

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>{requirement.title}</form>
  );
};

export default Requirement;
