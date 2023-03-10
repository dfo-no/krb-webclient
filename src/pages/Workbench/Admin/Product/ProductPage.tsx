import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import LoaderSpinner from '../../../../common/LoaderSpinner';
import SearchUtils from '../../../../common/SearchUtils';
import { DFOSearchBar } from '../../../../components/DFOSearchBar/DFOSearchBar';
import { useEditableState } from '../../../../components/EditableContext/EditableContext';
import NestableHierarcyEditableComponents from '../../../../components/NestableHierarchy/NestableHiarchyEditableComponents';
import {
  NewButtonContainer,
  SearchContainer,
  SearchFieldContainer,
} from '../../../../components/SearchContainer/SearchContainer';
import { StandardContainer } from '../../../../components/StandardContainer/StandardContainer';
import { IRouteProjectParams } from '../../../../models/IRouteProjectParams';
import DeleteProductForm from './DeleteProductForm';
import EditProductForm from './EditProductForm';
import NewProductForm from './NewProductForm';
import { ProductForm, useFindProducts } from '../../../../api/nexus2';
import { RefAndParentable } from '../../../../common/Utils';

export default function ProductPage(): React.ReactElement {
  const { projectId } = useParams<IRouteProjectParams>();

  const { products, isLoading, isError } = useFindProducts(projectId);

  const [productsWithParent, setProductsWithParent] = useState<
    RefAndParentable<ProductForm>[]
  >([]);

  const [searchProducts, setSearchProducts] = useState<
    RefAndParentable<ProductForm>[]
  >([]);

  const { setCurrentlyEditedItemId, setCreating, setDeleteCandidateId } =
    useEditableState();
  const { t } = useTranslation();

  // const { editProduct } = updateProduct(projectId, product.ref); // TODO rekkefølge

  useEffect(() => {
    // setCurrentlyEditedItemId('');
    setCreating(false);
    // setDeleteCandidateId('');
    if (products) {
      setProductsWithParent(
        products.map((product: ProductForm) => ({ ...product, parent: '' }))
      );
    }
  }, [products, setCreating]);

  if (isLoading) {
    console.log(`Is loading => ${isLoading}`);
    return <LoaderSpinner />;
  }

  if (isError) {
    console.log(`Is error => ${isError}`);
  }

  const updateProductsArrangement = (
    newProductList: RefAndParentable<ProductForm>[]
  ): void => {
    setProductsWithParent(newProductList);
    // editProduct(newProductList); // TODO
  };

  const searchFieldCallback = (
    result: RefAndParentable<ProductForm>[]
  ): void => {
    if (result.length > 0) {
      setSearchProducts(result);
    } else {
      setSearchProducts(products);
    }
  };

  const productsListSearch = (
    searchString: string,
    list: RefAndParentable<ProductForm>[]
  ): RefAndParentable<ProductForm>[] => {
    return SearchUtils.searchTitleAndDescription(
      list,
      searchString
    ) as RefAndParentable<ProductForm>[];
  };

  const afterDelete = (): void => {
    setDeleteCandidateId('');
    setProductsWithParent(productsWithParent);
  };

  return (
    <StandardContainer>
      <SearchContainer>
        <SearchFieldContainer>
          <DFOSearchBar
            list={productsWithParent}
            placeholder={t('Search for product')}
            callback={searchFieldCallback}
            searchFunction={productsListSearch}
          />
        </SearchFieldContainer>
        <NewButtonContainer>
          <Button variant="primary" onClick={() => setCreating(true)}>
            {t('Add new product')}
          </Button>
        </NewButtonContainer>
      </SearchContainer>

      <NestableHierarcyEditableComponents
        dispatchfunc={updateProductsArrangement}
        inputlist={
          searchProducts.length > 0 ? searchProducts : productsWithParent
        }
        CreateComponent={
          <NewProductForm
            projectRef={projectId}
            handleClose={() => setCreating(false)}
          />
        }
        EditComponent={(item: RefAndParentable<ProductForm>) => (
          <EditProductForm
            projectRef={projectId} // TODO name
            product={item}
            handleClose={() => setCurrentlyEditedItemId('')}
            handleCancel={() => setCurrentlyEditedItemId('')}
          />
        )}
        DeleteComponent={(
          item: RefAndParentable<ProductForm>,
          child: React.ReactElement
        ) => (
          <DeleteProductForm
            projectRef={projectId} // TODO name
            children={child}
            product={item}
            handleClose={afterDelete}
            handleCancel={() => {
              setDeleteCandidateId('');
            }}
          />
        )}
        depth={8}
      />
    </StandardContainer>
  );
}
