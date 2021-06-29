import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import React, { ReactElement, useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { BsTrashFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AlertModal from '../../common/AlertModal';
import Utils from '../../common/Utils';
import ErrorSummary from '../../Form/ErrorSummary';
import InputRow from '../../Form/InputRow';
import { IVariant } from '../../models/IVariant';
import { Need } from '../../models/Need';
import { Product } from '../../models/Product';
import { Requirement } from '../../models/Requirement';
import { AccordionContext } from '../../NestableHierarchy/AccordionContext';
import {
  deleteProduct,
  editProduct,
  putProjectThunk
} from '../../store/reducers/project-reducer';
import { selectProduct } from '../../store/reducers/selectedProduct-reducer';
import { RootState } from '../../store/store';

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
  const [modalShow, setModalShow] = useState(false);
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
        requirement.variants.forEach((variant: IVariant) => {
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
      setModalShow(true);
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
      <InputRow
        control={control}
        name="title"
        errors={errors}
        label={t('Title')}
      />
      <InputRow
        control={control}
        name="description"
        errors={errors}
        label={t('Description')}
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
          {t('delete')} <BsTrashFill />
        </Button>
        <AlertModal
          modalShow={modalShow}
          setModalShow={setModalShow}
          title="Attention"
          text="This product is associated to one or more requirement variants, please remove the connection to be able to delete"
        />
      </Row>
      <ErrorSummary errors={errors} />
    </Form>
  );
}
