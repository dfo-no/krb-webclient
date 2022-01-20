import { Box, makeStyles } from '@material-ui/core';
import React from 'react';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import { BsArrowReturnRight, BsPencil } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Utils from '../../common/Utils';
import { Nestable } from '../../models/Nestable';
import { INeed } from '../../Nexus/entities/INeed';
import { IRequirement } from '../../Nexus/entities/IRequirement';
import { IVariant } from '../../Nexus/entities/IVariant';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectNeed } from '../../store/reducers/selectedNeed-reducer';
import { selectRequirement } from '../../store/reducers/selectedRequirement-reducer';
import theme from '../../theme';

const useStyles = makeStyles({
  editorContainer: {
    flex: '1',
    display: 'flex',
    flexDirection: 'row'
  },
  product: {
    flexGrow: 1
  },
  requirement: {
    flexGrow: 2
  },
  variant: {
    flexGrow: 4
  }
});

export default function Preview(): React.ReactElement {
  const dispatch = useAppDispatch();
  const { project } = useAppSelector((state) => state.project);
  const { product } = useAppSelector((state) => state.selectedProduct);
  const classes = useStyles();

  const [associatedRequirements, associatedNeeds, associatedVariants] =
    Utils.findAssociatedRequirements(product, project);

  const findRequirementText = (variants: IVariant[]) => {
    const texts = variants.map((variant: IVariant) => {
      if (associatedVariants.includes(variant)) {
        if (variant.requirementText.trim().length > 0)
          return { text: variant.requirementText };
      }
      return null;
    });

    const textFiltered = texts.filter((text) => text !== null);

    if (textFiltered.length === 1) {
      return texts[0]?.text;
    }
    let returnText = '';
    textFiltered.forEach((text, index) => {
      if (textFiltered.length - 1 !== index) returnText += `${text?.text}, `;
      else returnText += `${text?.text}`;
    });
    return returnText;
  };

  const requirementList = (requirements: IRequirement[], need: INeed) => {
    const reqList = requirements.map((element: IRequirement) => {
      return (
        <ListGroup.Item key={element.id + 1}>
          <Row className="d-flex justify-content-between mr-2">
            <p className="ml-2 mt-1">
              {element.title}
              <Badge
                className="ml-2"
                bg={
                  element.requirement_Type === 'requirement'
                    ? 'primary'
                    : 'info'
                }
              >
                {Utils.capitalizeFirstLetter(element.requirement_Type)}
              </Badge>
            </p>
            <Link
              to={`/workbench/${project.id}/requirement/${element.id}/edit`}
              onClick={() => {
                dispatch(selectRequirement(element.id));
                dispatch(selectNeed(need.id));
              }}
            >
              <BsPencil />
            </Link>
          </Row>
          <p>{findRequirementText(element.variants)}</p>
        </ListGroup.Item>
      );
    });
    return (
      <>
        <ListGroup className="ml-3 mt-3 mb-4">{reqList}</ListGroup>
      </>
    );
  };

  const childrenHierarchy = (listofneed: Nestable<INeed>[], level: number) => {
    let n = level;
    let children: JSX.Element[];
    const cssClass = `level${n}`;
    let requirements: IRequirement[] = [];
    return listofneed.map((element) => {
      if (element.children && element.children.length > 0) {
        n += 1;
        children = childrenHierarchy(element.children, n);
      }
      if (
        element.id in associatedRequirements &&
        associatedRequirements[element.id].length > 0
      )
        requirements = associatedRequirements[element.id];
      return (
        <div>
          <Row>
            <BsArrowReturnRight className="ml-2 mt-1 mr-2" />
            <p>{element.title}</p>
          </Row>
          {requirements.length > 0 && requirementList(requirements, element)}
          {element.children && element.children.length > 0 && children}
        </div>
      );
    });
  };

  const needHierarchy = (needsList: Nestable<INeed>[]) => {
    const newList = Utils.unflatten(needsList)[0];
    let children: JSX.Element[];
    let requirements: IRequirement[] = [];
    const hierarchy = newList.map((element) => {
      if (
        element.id in associatedRequirements &&
        associatedRequirements[element.id].length > 0
      )
        requirements = associatedRequirements[element.id];
      if (element.children && element.children.length > 0) {
        children = childrenHierarchy(element.children, 1);
      }
      return (
        <>
          <ListGroup.Item className="mt-2 ml-0 pl-0">
            <b>{element.title}</b>
            {requirements.length > 0 && requirementList(requirements, element)}
            {element.children && element.children.length > 0 && children}
          </ListGroup.Item>
        </>
      );
    });
    return (
      <ListGroup variant="flush" className="mt-4 ml-0 p-0">
        {hierarchy}
      </ListGroup>
    );
  };

  return (
    <>
      <Box className={classes.editorContainer}>
        <Box className={classes.product}>
          <h6>Produkt</h6>
        </Box>
        <Box className={classes.requirement}>
          <h6>Krav</h6>
        </Box>
        <Box className={classes.variant}>
          <h6>Variant</h6>
        </Box>
      </Box>
    </>
  );
}
