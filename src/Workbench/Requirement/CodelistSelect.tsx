import React, { ReactElement } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useController } from 'react-hook-form';
import { Codelist } from '../../models/Codelist';

interface IProps {
  control: any;
  name: string;
  codelists: Codelist[];
  defaultValue: Codelist;
}

export default function CodelistSelect({
  name,
  control,
  codelists,
  defaultValue
}: IProps): ReactElement {
  const { field } = useController({ name, control, defaultValue });
  const renderOptions = () => {
    if (codelists) {
      return codelists.map((element: Codelist) => {
        return (
          <option key={element.id} value={element.id}>
            {element.title}
          </option>
        );
      });
    }
    return null;
  };

  return (
    <Form.Group as={Row}>
      <Form.Label column sm="2">
        Custom select
      </Form.Label>
      <Col sm="10">
        <Form.Control
          as="select"
          custom
          onBlur={field.onBlur}
          name={field.name}
          ref={field.ref}
          defaultValue={field.value.id}
          onChange={(e) => {
            /* String or number is the only valid attributes for the options value field.
             But this select will select an *object*, not a string or number. The form itself
             allows objects of course, so to do this, we use id as the value, and then sets
             the selects's value to the object explicit.
            */
            if (e.target.value) {
              const codelist = codelists.find(
                (add: Codelist) => add.id === e.target.value
              );
              if (codelist && control?.setValue) {
                control.setValue(field.name, codelist);
              }
            }
          }}
        >
          {renderOptions()}
        </Form.Control>
      </Col>
    </Form.Group>
  );
}
