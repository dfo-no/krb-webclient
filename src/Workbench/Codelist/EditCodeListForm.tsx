import React, { ReactElement, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useDispatch, useSelector } from 'react-redux';
import Joi from 'joi';
import { BsTrashFill } from 'react-icons/bs';

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
import AlertModal from '../../common/AlertModal';

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
  const [modalShow, setModalShow] = useState(false);

  const { register, handleSubmit, reset, errors } = useForm({
    resolver: joiResolver(codeListSchema)
  });

  const { id } = useSelector((state: RootState) => state.selectedProject);
  const { list } = useSelector((state: RootState) => state.project);

  if (!id) {
    return <div>Loading Productform</div>;
  }

  const project = Utils.ensure(list.find((bank) => bank.id === id));

  const codelist = Utils.ensure(
    project.codelist.find((clist) => clist.id === codelistId)
  );

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
              if (alt.codelist.id === codelistId) used = true;
            }
          });
        });
      });
    });
    return used;
  };

  const removeCodelist = () => {
    if (checkCodelistConnection()) {
      setModalShow(true);
    } else {
      dispatch(deleteCodelist({ projectId: id, codelistId }));
      dispatch(putProjectThunk(id));
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
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Title
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                name="title"
                ref={register}
                isInvalid={!!errors.title}
                defaultValue={codelist.title}
              />
              {errors.title && (
                <Form.Control.Feedback type="invalid">
                  {errors.title?.message}
                </Form.Control.Feedback>
              )}
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Description
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                name="description"
                ref={register}
                isInvalid={!!errors.description}
                defaultValue={codelist.description}
              />
              {errors.description && (
                <Form.Control.Feedback type="invalid">
                  {errors.description.message}
                </Form.Control.Feedback>
              )}
            </Col>
          </Form.Group>
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
            <AlertModal
              modalShow={modalShow}
              setModalShow={setModalShow}
              title="Attention"
              text="The codelist is associated to one or more requirement variant, please remove the connection to be able to delete"
            />
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default EditCodeListForm;
