import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import LoaderSpinner from '../../../common/LoaderSpinner';
import SearchUtils from '../../../common/SearchUtils';
import DFOSearchBar from '../../../components/DFOSearchBar/DFOSearchBar';
import { Parentable } from '../../../models/Parentable';
import { IProduct } from '../../../Nexus/entities/IProduct';
import { useGetProjectQuery } from '../../../store/api/bankApi';
import useProjectMutations from '../../../store/api/ProjectMutations';
import { useEditableState } from '../../Components/EditableContext';
import NestableHierarcyEditableComponents from '../../Components/NestableHierarchy/NestableHiarchyEditableComponents';
import {
  NewButtonContainer,
  SearchContainer,
  SearchFieldContainer
} from '../../Components/SearchContainer';
import { StandardContainer } from '../../Components/StandardContainer';
import { IRouteParams } from '../../Models/IRouteParams';
import EditProductForm from './EditProductForm';
import NewProductForm from './NewProductForm';
import DeleteProductForm from './DeleteProductForm';

export default function ProductPage(): React.ReactElement {
  const [products, setProducts] = useState<Parentable<IProduct>[]>([]);
  const { setEditMode, setCreating, setDeleteMode } = useEditableState();
  const { t } = useTranslation();

  const { projectId } = useParams<IRouteParams>();
  const { data: project, isLoading } = useGetProjectQuery(projectId);
  const { editProducts } = useProjectMutations();

  useEffect(() => {
    if (project && project.products) {
      setProducts(project.products);
    }
  }, [project]);

  if (isLoading) {
    return <LoaderSpinner />;
  }

  const updateProductsArrangement = (
    newProductList: Parentable<IProduct>[]
  ) => {
    setProducts(newProductList);
    editProducts(newProductList);
  };

  const searchFieldCallback = (result: Parentable<IProduct>[]) => {
    setProducts(result);
  };

  const productsSearch = (
    searchString: string,
    list: Parentable<IProduct>[]
  ) => {
    return SearchUtils.search(list, searchString);
  };

  return (
    <StandardContainer>
      <SearchContainer>
        <SearchFieldContainer>
          {' '}
          {project && (
            <DFOSearchBar
              list={project.products}
              placeholder={t('search for product')}
              callback={searchFieldCallback}
              searchFunction={productsSearch}
            />
          )}
        </SearchFieldContainer>
        <NewButtonContainer>
          <Button variant="primary" onClick={() => setCreating(true)}>
            {t('add new product')}
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
          <EditProductForm product={item} handleClose={() => setEditMode('')} />
        )}
        DeleteComponent={(
          item: Parentable<IProduct>,
          child: React.ReactElement
        ) => (
          <DeleteProductForm
            child={child}
            product={item}
            handleClose={() => setDeleteMode('')}
          />
        )}
        depth={5}
      />
    </StandardContainer>
  );
}
