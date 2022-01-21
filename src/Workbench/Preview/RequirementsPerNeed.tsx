import { Box, Button, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import { BsArrowReturnRight, BsPencil } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Utils from '../../common/Utils';
import { Levelable } from '../../models/Levelable';
import { Nestable } from '../../models/Nestable';
import { INeed } from '../../Nexus/entities/INeed';
import { IProduct } from '../../Nexus/entities/IProduct';
import { IRequirement } from '../../Nexus/entities/IRequirement';
import { IVariant } from '../../Nexus/entities/IVariant';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectNeed } from '../../store/reducers/selectedNeed-reducer';
import { selectRequirement } from '../../store/reducers/selectedRequirement-reducer';
import theme from '../../theme';
import ParentableSideBar from '../Components/ParentableSideBar';

interface IProps {
  selectedProduct: Levelable<IProduct> | null;
  updateSelectedFunction: (item: IRequirement) => void;
}

export default function RequirementsPerNeed({
  selectedProduct,
  updateSelectedFunction
}: IProps): React.ReactElement {
  const { project } = useAppSelector((state) => state.project);

  const [associatedRequirements, associatedNeeds] =
    selectedProduct !== null
      ? Utils.findAssociatedRequirements(selectedProduct, project)
      : [{}, []];

  const requirementList = (requirements: IRequirement[], need: INeed) => {
    const reqList = requirements.map((element: IRequirement) => {
      return (
        <Button>
          {element.title}
          <Badge
            className="ml-2"
            bg={element.requirement_Type === 'requirement' ? 'primary' : 'info'}
          >
            {Utils.capitalizeFirstLetter(element.requirement_Type)}
          </Badge>
        </Button>
      );
    });
    return (
      <>
        <ListGroup className="ml-3 mt-3 mb-4">{reqList}</ListGroup>
      </>
    );
  };

  const needHierarchy = (needsList: Nestable<INeed>[]) => {
    let requirements: IRequirement[] = [];
    const hierarchy = needsList.map((element) => {
      if (
        element.id in associatedRequirements &&
        associatedRequirements[element.id].length > 0
      )
        requirements = associatedRequirements[element.id];

      return (
        <ListGroup.Item>
          <b>{element.title}</b>
          {requirements.length > 0 && requirementList(requirements, element)}
        </ListGroup.Item>
      );
    });
    return (
      <ListGroup variant="flush" className="mt-4 ml-0 p-0">
        {hierarchy}
      </ListGroup>
    );
  };

  return needHierarchy(associatedNeeds);
}
