import React, { ReactElement } from 'react';
import { useController } from 'react-hook-form';
import Utils from '../../common/Utils';
import { Codelist } from '../../models/Codelist';

export default function CodelistSelect(props: any): ReactElement {
  const { field } = useController(props);
  const renderOptions = () => {
    if (props.codelists) {
      return props.codelists.map((element: Codelist) => {
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
    <select
      onBlur={field.onBlur}
      name={field.name}
      ref={field.ref}
      defaultValue={field.value.id}
      onChange={(e) => {
        const codelist = Utils.ensure(
          props.codelists.find((add: Codelist) => add.id === e.target.value)
        );
        if (props.control?.setValue) {
          props.control.setValue(field.name, codelist);
        }
      }}
    >
      <option>None</option>
      {renderOptions()}
    </select>
  );
}
