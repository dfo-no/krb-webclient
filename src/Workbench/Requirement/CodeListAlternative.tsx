import React, { ReactElement } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { InputProps } from '../../models/InputProps';
import { Bank } from '../../models/Bank';
import { Codelist } from '../../models/Codelist';

interface IProps extends InputProps {
  item: any;
  vIx: number;
  aIx: number;
  project: any;
}

export default function CodeListAlternative({
  register,
  errors,
  item,
  vIx,
  aIx,
  project
}: IProps): ReactElement {
  const selectOptions = (bank: Bank) => {
    return bank.codelist.map((element: any) => {
      return <option key={element.id}>{element.title}</option>;
    });
  };

  /* const editAlternative = (post: FormInput) => {
    const codelistIndex = project.codelist.findIndex(
      (element) => element.title === post.codelist
    );
    const newAlternative = { ...alternative };
    newAlternative.codelist = project.codelist[codelistIndex];
    const newLayout = { ...layout };
    const newLayoutList = [...requirement.layouts];
    const layoutindex = requirement.layouts.findIndex(
      (element) => element.id === layout.id
    );
    const alternativeIndex = layout.alternatives.findIndex(
      (element) => element.id === alternative.id
    );
    const newalternatives = [...layout.alternatives];
    newalternatives[alternativeIndex] = newAlternative;
    newLayout.alternatives = newalternatives;
    newLayoutList[layoutindex] = newLayout;
    const newRequirement = { ...requirement };
    newRequirement.layouts = newLayoutList;
    dispatch(
      editRequirementInNeed({
        projectId: project.id,
        needIndex: nIndex,
        requirement: newRequirement
      })
    );
    dispatch(putProjectThunk(project.id));
  }; */

  const selectChange = (e: any) => {
    console.log('selectChange');
    console.log(e);
  };

  return (
    <Card>
      <Card.Body>
        <Form.Control
          as="input"
          type="text"
          name={`layouts[${vIx}].alternatives[${aIx}].id`}
          ref={register}
          defaultValue={item.id}
          isInvalid={
            !!(
              errors.layouts &&
              errors.layouts[vIx] &&
              errors.layouts[vIx].alternatives &&
              errors.layouts[vIx].alternatives[aIx] &&
              errors.layouts[vIx].alternatives[aIx].id
            )
          }
        />
        <Form.Control
          as="input"
          type="text"
          name={`layouts[${vIx}].alternatives[${aIx}].type`}
          ref={register}
          defaultValue={item.type}
          isInvalid={
            !!(
              errors.layouts &&
              errors.layouts[vIx] &&
              errors.layouts[vIx].alternatives &&
              errors.layouts[vIx].alternatives[aIx] &&
              errors.layouts[vIx].alternatives[aIx].type
            )
          }
        />
        <Form.Group as={Row}>
          <Form.Label className="ml-2">Codelist</Form.Label>
          <Form.Control
            as="select"
            name={`layouts[${vIx}].alternatives[${aIx}].codelist.id`}
            defaultValue={item.codelist.id}
            onChange={(e) => selectChange(e.target.value)}
            ref={register}
          >
            {selectOptions(project)}
          </Form.Control>
        </Form.Group>
        <Form.Control
          readOnly
          name={`layouts[${vIx}].alternatives[${aIx}].codelist.title`}
          defaultValue={item.codelist.title}
          ref={register}
        />
        <Form.Control
          readOnly
          name={`layouts[${vIx}].alternatives[${aIx}].codelist.description`}
          defaultValue={item.codelist.description}
          ref={register}
        />
        <Form.Control
          readOnly
          name={`layouts[${vIx}].alternatives[${aIx}].codelist.type`}
          defaultValue={item.codelist.type}
          ref={register}
        />
        <Form.Control
          readOnly
          name={`layouts[${vIx}].alternatives[${aIx}].codelist.codes`}
          defaultValue={[...item.codelist.codes]}
          ref={register}
        />
        {/*         <input
          type="hidden"
          name={`layouts[${vIx}].alternatives[${aIx}].codelist`}
          ref={register}
          value={item.codelist}
        /> */}
        {/* <Form.Control
          name={`layouts[${vIx}].alternatives[${aIx}].codelist`}
          ref={register}
          defaultValue={item.codelist}
          isInvalid={
            !!(
              errors.layouts &&
              errors.layouts[vIx] &&
              errors.layouts[vIx].alternatives &&
              errors.layouts[vIx].alternatives[aIx] &&
              errors.layouts[vIx].alternatives[aIx].codelist
            )
          }
        /> */}
      </Card.Body>
    </Card>
  );
}
