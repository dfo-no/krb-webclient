import { joiResolver } from '@hookform/resolvers/joi';
import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { BsTrashFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import AlertModal from '../../common/AlertModal';
import Utils from '../../common/Utils';
import ErrorSummary from '../../Form/ErrorSummary';
import InputRow from '../../Form/InputRow';
import { Alert } from '../../models/Alert';
import { IVariant } from '../../models/IVariant';
import { Need } from '../../models/Need';
import { Nestable } from '../../models/Nestable';
import { Parentable } from '../../models/Parentable';
import { Product, PutProductSchema } from '../../models/Product';
import { Requirement } from '../../models/Requirement';
import { AccordionContext } from '../../NestableHierarchy/AccordionContext';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addAlert } from '../../store/reducers/alert-reducer';
import {
  editProduct,
  putSelectedProjectThunk,
  removeProduct
} from '../../store/reducers/project-reducer';
import { selectProduct } from '../../store/reducers/selectedProduct-reducer';

interface IProps {
  element: Parentable<Product>;
}

export default function EditProductForm({
  element
}: IProps): React.ReactElement {
  const { project } = useAppSelector((state) => state.project);
  const dispatch = useAppDispatch();
  const { onOpenClose } = useContext(AccordionContext);
  const [validated] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Parentable<Product>>({
    resolver: joiResolver(PutProductSchema),
    defaultValues: element
  });

  useEffect(() => {
    if (element) {
      reset(JSON.parse(JSON.stringify(element)));
    }
  }, [element, reset]);

  const onEditProductSubmit = (data: Nestable<Product>) => {
    const newProduct = { ...data };
    if (newProduct.children) {
      delete newProduct.children;
    }
    if (newProduct.level) {
      delete newProduct.level;
    }
    newProduct.title = data.title;
    newProduct.description = data.description;

    const alert: Alert = {
      id: uuidv4(),
      style: 'success',
      text: 'Successfully updated product'
    };
    dispatch(editProduct(newProduct));
    dispatch(putSelectedProjectThunk('dummy')).then(() => {
      dispatch(addAlert({ alert }));
      onOpenClose('');
    });
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

  const deleteProduct = (product: Product) => {
    if (
      Utils.checkIfParent(project.products, element.id) ||
      checkProductConnection()
    ) {
      setModalShow(true);
    } else {
      dispatch(removeProduct(product));
      dispatch(putSelectedProjectThunk('dummy'));

      const alert: Alert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully deleted product'
      };
      dispatch(addAlert({ alert }));
    }
    onOpenClose('');
  };

  return (
    <Form
      onSubmit={handleSubmit((post) => onEditProductSubmit(post))}
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
      <Button className="mt-2  ml-3" type="submit">
        {t('save')}
      </Button>
      <Link
        to={`/workbench/${project.id}/${element.id}/product`}
        onClick={() => dispatch(selectProduct(element))}
      >
        <Button className="mt-2  ml-3">Preview</Button>
      </Link>
      <Button
        className="mt-2  ml-3"
        variant="warning"
        onClick={() => deleteProduct(element)}
      >
        {t('delete')} <BsTrashFill />
      </Button>
      <AlertModal
        modalShow={modalShow}
        setModalShow={setModalShow}
        title="Attention"
        text="This product is associated to one or more requirement variants, please remove the connection to be able to delete"
      />
      <ErrorSummary errors={errors} />
    </Form>
  );
}
