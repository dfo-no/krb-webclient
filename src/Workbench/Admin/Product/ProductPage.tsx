import { Box, Button } from '@mui/material/';
import makeStyles from '@mui/styles/makeStyles';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SearchUtils from '../../../common/SearchUtils';
import Utils from '../../../common/Utils';
import DFOSearchBar from '../../../components/DFOSearchBar/DFOSearchBar';
import { Nestable } from '../../../models/Nestable';
import { Parentable } from '../../../models/Parentable';
import { IProduct } from '../../../Nexus/entities/IProduct';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  putSelectedProjectThunk,
  updateProductList
} from '../../../store/reducers/project-reducer';
import theme from '../../../theme';
import EditProductForm from './EditProductForm';
import NewProductForm from './NewProductForm';
import NestableHierarcyEditableComponent from '../../Components/NestableHiarchyEditableComponents';
import { useEditableState } from '../../Components/EditableContext';
import { StandardContainer } from '../../Components/StandardContainer';
import {
  NewButtonContainer,
  SearchContainer,
  SearchFieldContainer
} from '../../Components/SearchContainer';

const useStyles = makeStyles({
  products: {
    [theme.breakpoints.down('md')]: {
      alignSelf: 'center',
      width: 400
    }
  }
});

export default function ProductPage(): React.ReactElement {
  const { project } = useAppSelector((state) => state.project);
  const dispatch = useAppDispatch();

  const [allProducts, setAllProducts] = useState<Nestable<IProduct>[]>([]);
  const [products, setProducts] = useState<Nestable<IProduct>[]>([]);
  const { setEditMode, setCreating } = useEditableState();

  const classes = useStyles();
  const { t } = useTranslation();

  useEffect(() => {
    const nestedList = Utils.parentable2Nestable(project.products);
    setAllProducts(nestedList);
    setProducts(nestedList);
  }, [project.products]);

  const moveProduct = (movedItem: Parentable<IProduct>, index: number) => {
    const newProductList = [...project.products];
    const indexOfMoved = newProductList.findIndex(
      (oldItem) => oldItem.id === movedItem.id
    );
    newProductList.splice(indexOfMoved, 1);
    newProductList.splice(index, 0, movedItem);

    dispatch(updateProductList(newProductList));
    dispatch(putSelectedProjectThunk('dummy'));
  };

  const searchFieldCallback = (result: Nestable<IProduct>[]) => {
    setProducts(result);
  };

  const productsSearch = (searchString: string, list: Nestable<IProduct>[]) => {
    return SearchUtils.search(list, searchString);
  };

  return (
    <>
      <StandardContainer>
        <SearchContainer>
          <SearchFieldContainer>
            {' '}
            <DFOSearchBar
              list={allProducts}
              label={t('search for product')}
              callback={searchFieldCallback}
              searchFunction={productsSearch}
            />
          </SearchFieldContainer>
          <NewButtonContainer>
            <Button variant="primary" onClick={() => setCreating(true)}>
              {t('add new product')}
            </Button>
          </NewButtonContainer>
        </SearchContainer>

        <Box className={classes.products}>
          <NestableHierarcyEditableComponent
            dispatchfunc={(item: Parentable<IProduct>, index: number) =>
              moveProduct(item, index)
            }
            inputlist={products}
            CreateComponent={
              <NewProductForm handleClose={() => setCreating(false)} />
            }
            EditComponent={(item: Parentable<IProduct>) => (
              <EditProductForm
                element={item}
                handleClose={() => setEditMode('')}
              />
            )}
            depth={5}
          />
        </Box>
      </StandardContainer>
    </>
  );
}
