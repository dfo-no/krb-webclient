import React, { ReactElement, useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { Link } from 'react-router-dom';
import { BsTrashFill } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';
import { AccordionContext } from '../../NestableHierarchy/AccordionContext';
import { Product } from '../../models/Product';

import {
  deleteProduct,
  editProduct,
  putProjectThunk
} from '../../store/reducers/project-reducer';
import { RootState } from '../../store/store';
import { selectProduct } from '../../store/reducers/selectedProduct-reducer';
import { Need } from '../../models/Need';
import { Requirement } from '../../models/Requirement';
import { IVariant } from '../../models/IVariant';
import Utils from '../../common/Utils';
import InputRow from '../../Form/InputRow';
import ErrorSummary from '../../Form/ErrorSummary';

interface IProps {
  element: Product;
}

type FormInput = {
  title: string;
  description: string;
};

const productSchema = Joi.object().keys({
  title: Joi.string().required(),
  description: Joi.string().allow(null, '').required()
});

export default function ProductForm({ element }: IProps): ReactElement {
  const { id } = useSelector((state: RootState) => state.selectedProject);
  const { list } = useSelector((state: RootState) => state.project);
  const dispatch = useDispatch();
  const { onOpenClose } = useContext(AccordionContext);
  const [validated] = useState(false);
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: joiResolver(productSchema),
    defaultValues: {
      title: element.title,
      description: element.description
    }
  });
  if (!id) {
    return <p>No project selected</p>;
  }

  const project = Utils.ensure(list.find((bank) => bank.id === id));

  const edit = (post: FormInput) => {
    const newProduct = { ...element };
    newProduct.title = post.title;
    newProduct.description = post.description;
    dispatch(
      editProduct({
        projectId: id,
        product: newProduct
      })
    );
    dispatch(putProjectThunk(id));
    onOpenClose('');
  };

  const checkProductConnection = () => {
    let used = false;
    project.needs.forEach((need: Need) => {
      need.requirements.forEach((requirement: Requirement) => {
        requirement.layouts.forEach((variant: IVariant) => {
          if (variant.products.includes(element.id)) {
            used = true;
          }
        });
      });
    });
    return used;
  };

  const removeProduct = () => () => {
    if (
      Utils.checkIfParent(project.products, element.id) ||
      checkProductConnection()
    ) {
      window.confirm(
        'This product is associated to one or more requirement variants, please remove the connection to be able to delete'
      );
    } else {
      dispatch(deleteProduct({ projectId: id, productId: element.id }));
      dispatch(putProjectThunk(id));
    }
    onOpenClose('');
  };

  return (
    <Form
      onSubmit={handleSubmit(edit)}
      autoComplete="off"
      noValidate
      validated={validated}
    >
      <InputRow control={control} name="title" errors={errors} label="Title" />
      <InputRow
        control={control}
        name="description"
        errors={errors}
        label="Description"
      />
      <Row>
        <Button className="mt-2  ml-3" type="submit">
          {t('save')}
        </Button>
        <Link
          to={`/workbench/${id}/${element.id}/product`}
          onClick={() => dispatch(selectProduct(element.id))}
        >
          <Button className="mt-2  ml-3">Preview</Button>
        </Link>
        <Button
          className="mt-2  ml-3"
          variant="warning"
          onClick={removeProduct()}
        >
          Delete <BsTrashFill />
        </Button>
      </Row>
      <ErrorSummary errors={errors} />
    </Form>
  );
}
