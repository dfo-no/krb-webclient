import { joiResolver } from '@hookform/resolvers/joi';
import DeleteIcon from '@mui/icons-material/Delete';
import { get } from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FieldError, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import AlertModal from '../../../common/AlertModal';
import Utils from '../../../common/Utils';
import { AccordionContext } from '../../../components/DFOAccordion/AccordionContext';
import ControlledTextInput from '../../../Form/ControlledTextInput';
import ErrorSummary from '../../../Form/ErrorSummary';
import { IAlert } from '../../../models/IAlert';
import { Nestable } from '../../../models/Nestable';
import { Parentable } from '../../../models/Parentable';
import { INeed } from '../../../Nexus/entities/INeed';
import { IProduct, PutProductSchema } from '../../../Nexus/entities/IProduct';
import { IRequirement } from '../../../Nexus/entities/IRequirement';
import { IVariant } from '../../../Nexus/entities/IVariant';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { addAlert } from '../../../store/reducers/alert-reducer';
import {
  editProduct,
  putSelectedProjectThunk,
  removeProduct
} from '../../../store/reducers/project-reducer';
import { selectProduct } from '../../../store/reducers/selectedProduct-reducer';

interface IProps {
  element: Parentable<IProduct>;
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
  } = useForm<Parentable<IProduct>>({
    resolver: joiResolver(PutProductSchema),
    defaultValues: element
  });

  useEffect(() => {
    if (element) {
      reset(JSON.parse(JSON.stringify(element)));
    }
  }, [element, reset]);

  const onEditProductSubmit = (data: Nestable<IProduct>) => {
    const newProduct = { ...data };
    if (newProduct.children) {
      delete newProduct.children;
    }
    if (newProduct.level) {
      delete newProduct.level;
    }
    newProduct.title = data.title;
    newProduct.description = data.description;

    dispatch(editProduct(newProduct));
    dispatch(putSelectedProjectThunk('dummy')).then(() => {
      const alert: IAlert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully updated product'
      };
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
      onSubmit={handleSubmit((post) => onEditProductSubmit(post))}
      autoComplete="off"
      noValidate
      validated={validated}
    >
      <ControlledTextInput
        control={control}
        name="title"
        error={get(errors, `title`) as FieldError}
        label={t('Title')}
      />
      <ControlledTextInput
        control={control}
        name="description"
        error={get(errors, `description`) as FieldError}
        label={t('Description')}
      />
      <Button className="mt-2  ml-3" type="submit">
        {t('save')}
      </Button>
      <Link
        to={`/workbench/${project.id}/admin/${element.id}/product`}
        onClick={() => dispatch(selectProduct(element))}
      >
        <Button className="mt-2  ml-3">Preview</Button>
      </Link>
      <Button
        className="mt-2  ml-3"
        variant="warning"
        onClick={() => deleteProduct(element)}
      >
        {t('delete')} <DeleteIcon />
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
