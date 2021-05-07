import React, { ReactElement, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useDispatch, useSelector } from 'react-redux';
import Joi from 'joi';
import { BsTrashFill } from 'react-icons/bs';

import { useHistory } from 'react-router-dom';
import {
  deleteCodelist,
  editCodelist,
  putProjectThunk
} from '../../store/reducers/project-reducer';
import { RootState } from '../../store/store';
import Utils from '../../common/Utils';
import { Need } from '../../models/Need';
import { Requirement } from '../../models/Requirement';
import { IVariant } from '../../models/IVariant';
import { ISelectable } from '../../models/ISelectable';
import { ICodelistAlternative } from '../../models/ICodelistAlternative';
import InputRow from '../../Form/InputRow';

type FormValues = {
  title: string;
  description: string;
};
interface IProps {
  toggleShow: React.Dispatch<React.SetStateAction<boolean>>;
  codelistId: string;
}

const codeListSchema = Joi.object().keys({
  title: Joi.string().required(),
  description: Joi.string().allow(null, '').required()
});

function EditCodeListForm({ toggleShow, codelistId }: IProps): ReactElement {
  const dispatch = useDispatch();
  const [validated] = useState(false);

  const { id } = useSelector((state: RootState) => state.selectedProject);
  const { list } = useSelector((state: RootState) => state.project);
  const history = useHistory();

  const project = Utils.ensure(list.find((bank) => bank.id === id));

  const codelist = Utils.ensure(
    project.codelist.find((clist) => clist.id === codelistId)
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: joiResolver(codeListSchema),
    defaultValues: {
      title: codelist.title,
      description: codelist.description
    }
  });

  if (!id) {
    return <div>Loading Productform</div>;
  }

  const onEditCodeSubmit = (post: FormValues) => {
    dispatch(
      editCodelist({
        projectId: id,
        codelistId,
        title: post.title,
        description: post.description
      })
    );
    dispatch(putProjectThunk(id));
    reset();
    toggleShow(false);
  };
  const checkCodelistConnection = () => {
    let used = false;
    project.needs.forEach((need: Need) => {
      need.requirements.forEach((requirement: Requirement) => {
        requirement.layouts.forEach((variant: IVariant) => {
          variant.alternatives.forEach((alternative: ISelectable) => {
            if (alternative.type === 'codelist') {
              const alt = alternative as ICodelistAlternative;
              if (alt.codelist === codelistId) used = true;
            }
          });
        });
      });
    });
    return used;
  };

  const removeCodelist = () => {
    if (checkCodelistConnection()) {
      window.confirm(
        'The codelist is associated to one or more requirement variant, please remove the connection to be able to delete'
      );
    } else {
      dispatch(deleteCodelist({ projectId: id, codelistId }));
      dispatch(putProjectThunk(id));
      history.push(`/workbench/${project.id}/codelist`);
    }
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <Form
          onSubmit={handleSubmit(onEditCodeSubmit)}
          autoComplete="off"
          noValidate
          validated={validated}
        >
          <InputRow
            control={control}
            name="title"
            errors={errors}
            label="Title"
          />
          <InputRow
            control={control}
            name="description"
            errors={errors}
            label="Description"
          />
          <Row>
            <Button className="mt-2  ml-3" type="submit">
              Save
            </Button>
            <Button
              className="mt-2 ml-3 btn-warning"
              onClick={() => toggleShow(false)}
            >
              Cancel
            </Button>
            <Button
              className="mt-2  ml-3"
              variant="warning"
              onClick={removeCodelist}
            >
              Delete <BsTrashFill />
            </Button>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default EditCodeListForm;
