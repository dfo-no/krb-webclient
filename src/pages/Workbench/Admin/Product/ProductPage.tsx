import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { Product } from '../../../../api/openapi-fetch';
import LoaderSpinner from '../../../../common/LoaderSpinner';
import SearchUtils from '../../../../common/SearchUtils';
import Utils from '../../../../common/Utils';
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
import { useGetProjectQuery } from '../../../../store/api/bankApi';
import { useProjectMutationState } from '../../../../store/api/ProjectMutations';
import DeleteProductForm from './DeleteProductForm';
import EditProductForm from './EditProductForm';
import NewProductForm from './NewProductForm';

export default function ProductPage(): React.ReactElement {
  const [products, setProducts] = useState<Product[]>([]);
  const { setEditMode, setCreating, setDeleteMode } = useEditableState();
  const { t } = useTranslation();

  const { projectId } = useParams<IRouteProjectParams>();
  const { data: project, isLoading } = useGetProjectQuery(projectId);
  const { editProducts } = useProjectMutationState();

  useEffect(() => {
    if (project && project.products) {
      setProducts(Utils.filterOutDeletedElements(project.products));
    }
  }, [project]);

  if (isLoading || !project) {
    return <LoaderSpinner />;
  }

  const updateProductsArrangement = (newProductList: Product[]): void => {
    setProducts(newProductList);
    editProducts(newProductList);
  };

  const searchFieldCallback = (result: Product[]): void => {
    setProducts(result);
  };

  const productsSearch = (searchString: string, list: Product[]): Product[] => {
    return SearchUtils.searchParentable(list, searchString) as Product[];
  };

  const afterDelete = (): void => {
    setDeleteMode('');
    setProducts(Utils.filterOutDeletedElements(project.products));
  };

  return (
    <StandardContainer>
      <SearchContainer>
        <SearchFieldContainer>
          <DFOSearchBar
            list={Utils.filterOutDeletedElements(project.products)}
            placeholder={t('Search for product')}
            callback={searchFieldCallback}
            searchFunction={productsSearch}
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
        inputlist={products}
        CreateComponent={
          <NewProductForm handleClose={() => setCreating(false)} />
        }
        EditComponent={(item: Product) => (
          <EditProductForm product={item} handleClose={() => setEditMode('')} />
        )}
        DeleteComponent={(item: Product, child: React.ReactElement) => (
          <DeleteProductForm
            children={child}
            product={item}
            handleClose={afterDelete}
          />
        )}
        depth={8}
      />
    </StandardContainer>
  );
}
