import React, { ReactElement, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useDispatch, useSelector } from 'react-redux';
import Joi from 'joi';

import { v4 as uuidv4 } from 'uuid';
import {
  addProduct,
  putProjectThunk
} from '../../store/reducers/project-reducer';
import { RootState } from '../../store/store';
import { Product } from '../../models/Product';
import ModelType from '../../models/ModelType';
import InputRow from '../../Form/InputRow';

type FormValues = {
  title: string;
  description: string;
};
interface IProps {
  toggleShow: React.Dispatch<React.SetStateAction<boolean>>;
  toggleAlert: React.Dispatch<React.SetStateAction<boolean>>;
}

const productSchema = Joi.object().keys({
  title: Joi.string().required(),
  description: Joi.string().allow(null, '').required()
});

function NewProductForm({ toggleShow, toggleAlert }: IProps): ReactElement {
  const dispatch = useDispatch();
  const [validated] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: joiResolver(productSchema)
  });

  const { id } = useSelector((state: RootState) => state.selectedProject);

  if (!id) {
    return <div>Loading Productform</div>;
  }

  const onNewProductSubmit = (post: FormValues) => {
    const product: Product = {
      // TODO: remove uuidv4, this should be CosmosDB's task (perhaps by reference)
      id: uuidv4(),
      title: post.title,
      description: post.description,
      parent: '',
      type: ModelType.product
    };
    dispatch(addProduct({ id, product }));
    dispatch(putProjectThunk(id));

    // reset the form
    reset();
    toggleShow(false);
    toggleAlert(true);
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <Form
          onSubmit={handleSubmit(onNewProductSubmit)}
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
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default NewProductForm;
