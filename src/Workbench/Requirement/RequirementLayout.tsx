import React, { ReactElement, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Utils from '../../common/Utils';
import { Bank } from '../../models/Bank';
import { Need } from '../../models/Need';
import { Requirement } from '../../models/Requirement';
import { RequirementLayout } from '../../models/RequirementLayout';
import { RootState } from '../../store/store';

interface IProps {
  layout: RequirementLayout;
  need: Need;
  project: Bank;
  requirement: Requirement;
}

type FormValues = {
  id: string;
  requirementText: string;
  instruction: string;
};

const layoutSchema = yup.object().shape({
  id: yup.number().required(),
  requirementText: yup.string().required(),
  instruction: yup.string().required()
});

export default function Layout({
  project,
  need,
  layout,
  requirement
}: IProps): ReactElement {
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      id: layout.id,
      requirementText: layout.requirementText,
      instruction: layout.instruction
    },
    resolver: yupResolver(layoutSchema)
  });
  const [validated] = useState(false);

  const onEditLayoutSubmit = (post: FormValues) => {
    const newLayout = {
      id: '',
      requirementText: post.requirementText,
      instruction: post.instruction,
      alternatives: []
    };
    const newLayoutList = [...requirement.layouts, newLayout];
    const newRequirement = { ...requirement };
    newRequirement.layouts = newLayoutList;
  };
  return (
  
  );
}
