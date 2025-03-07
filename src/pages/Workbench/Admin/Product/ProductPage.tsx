import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import LoaderSpinner from '../../../../common/LoaderSpinner';
import SearchUtils from '../../../../common/SearchUtils';
import DFOSearchBar from '../../../../components/DFOSearchBar/DFOSearchBar';
import { Parentable } from '../../../../models/Parentable';
import { IProduct } from '../../../../Nexus/entities/IProduct';
import { useGetProjectQuery } from '../../../../store/api/bankApi';
import useProjectMutations from '../../../../store/api/ProjectMutations';
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
import Utils from '../../../../common/Utils';

export default function ProductPage(): React.ReactElement {
  const [products, setProducts] = useState<Parentable<IProduct>[]>([]);
  const { setCurrentlyEditedItemId, setCreating, setDeleteCandidateId } =
    useEditableState();
  const { t } = useTranslation();

  const { projectId } = useParams<IRouteProjectParams>();
  const { data: project, isLoading } = useGetProjectQuery(projectId);
  const { editProducts } = useProjectMutations();

  useEffect(() => {
    if (project && project.products) {
      setProducts(Utils.filterOutDeletedElements(project.products));
    }
  }, [project]);

  if (isLoading || !project) {
    return <LoaderSpinner />;
  }

  const updateProductsArrangement = (
    newProductList: Parentable<IProduct>[]
  ): void => {
    setProducts(newProductList);
    editProducts(newProductList);
  };

  const searchFieldCallback = (result: Parentable<IProduct>[]): void => {
    setProducts(result);
  };

  const productsSearch = (
    searchString: string,
    list: Parentable<IProduct>[]
  ): Parentable<IProduct>[] => {
    return SearchUtils.searchParentable(
      list,
      searchString
    ) as Parentable<IProduct>[];
  };

  const afterDelete = (): void => {
    setDeleteCandidateId('');
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
        EditComponent={(item: Parentable<IProduct>) => (
          <EditProductForm
            product={item}
            handleClose={() => setCurrentlyEditedItemId('')}
            handleCancel={() => setCurrentlyEditedItemId('')}
          />
        )}
        DeleteComponent={(
          item: Parentable<IProduct>,
          child: React.ReactElement
        ) => (
          <DeleteProductForm
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
