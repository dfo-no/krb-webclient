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
import { IAlert } from '../../models/IAlert';
import { AccordionContext } from '../../NestableHierarchy/AccordionContext';
import { INeed } from '../../Nexus/entities/INeed';
import { IProduct, PutProductSchema } from '../../Nexus/entities/IProduct';
import { IRequirement } from '../../Nexus/entities/IRequirement';
import { IVariant } from '../../Nexus/entities/IVariant';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addAlert } from '../../store/reducers/alert-reducer';
import {
  editProduct,
  putSelectedProjectThunk,
  removeProduct
} from '../../store/reducers/project-reducer';
import { selectProduct } from '../../store/reducers/selectedProduct-reducer';

interface IProps {
  element: IProduct;
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
  } = useForm<IProduct>({
    resolver: joiResolver(PutProductSchema),
    defaultValues: element
  });

  useEffect(() => {
    if (element) {
      reset(JSON.parse(JSON.stringify(element)));
    }
  }, [element, reset]);

  const onSubmit = (post: IProduct) => {
    const newProduct = { ...element };
    newProduct.title = post.title;
    newProduct.description = post.description;
    if (newProduct.children) {
      delete newProduct.children;
    }
    const alert: IAlert = {
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
    project.needs.forEach((need: INeed) => {
      need.requirements.forEach((requirement: IRequirement) => {
        requirement.variants.forEach((variant: IVariant) => {
          if (variant.products.includes(element.id)) {
            used = true;
          }
        });
      });
    });
    return used;
  };

  const deleteProduct = (product: IProduct) => {
    if (
      Utils.checkIfParent(project.products, element.id) ||
      checkProductConnection()
    ) {
      setModalShow(true);
    } else {
      dispatch(removeProduct(product));
      dispatch(putSelectedProjectThunk('dummy'));

      const alert: IAlert = {
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
      onSubmit={handleSubmit(onSubmit)}
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
