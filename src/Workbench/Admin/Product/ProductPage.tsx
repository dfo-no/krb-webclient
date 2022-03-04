import { Box, Button } from '@mui/material/';
import makeStyles from '@mui/styles/makeStyles';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SearchUtils from '../../../common/SearchUtils';
import DFOSearchBar from '../../../components/DFOSearchBar/DFOSearchBar';
import { Parentable } from '../../../models/Parentable';
import { IProduct } from '../../../Nexus/entities/IProduct';
import theme from '../../../theme';
import EditProductForm from './EditProductForm';
import NewProductForm from './NewProductForm';
import NestableHierarcyEditableComponents from '../../Components/NestableHierarchy/NestableHiarchyEditableComponents';
import { useEditableState } from '../../Components/EditableContext';
import { StandardContainer } from '../../Components/StandardContainer';
import {
  NewButtonContainer,
  SearchContainer,
  SearchFieldContainer
} from '../../Components/SearchContainer';
import LoaderSpinner from '../../../common/LoaderSpinner';
import { useParams } from 'react-router-dom';
import { IRouteParams } from '../../Models/IRouteParams';
import { useGetProjectQuery } from '../../../store/api/bankApi';
import useProjectMutations from '../../../store/api/ProjectMutations';

export default function ProductPage(): React.ReactElement {
  const [products, setProducts] = useState<Parentable<IProduct>[]>([]);
  const { setEditMode, setCreating } = useEditableState();
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

  if (!project) {
    return <p>Finner ikke prosjekt</p>;
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
          <DFOSearchBar
            list={project.products}
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

      <NestableHierarcyEditableComponents
        dispatchfunc={updateProductsArrangement}
        inputlist={products}
        CreateComponent={
          <NewProductForm handleClose={() => setCreating(false)} />
        }
        EditComponent={(item: Parentable<IProduct>) => (
          <EditProductForm product={item} handleClose={() => setEditMode('')} />
        )}
        depth={5}
      />
    </StandardContainer>
  );
}
