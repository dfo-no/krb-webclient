import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Parentable } from '../../../models/Parentable';
import { ITag } from '../../../Nexus/entities/ITag';
import EditTagForm from './EditTagForm';
import NewTagForm from './NewTagForm';
import { Box, Button } from '@mui/material';
import theme from '../../../theme';
import DFOSearchBar from '../../../components/DFOSearchBar/DFOSearchBar';
import { makeStyles } from '@mui/styles';
import { StandardContainer } from '../../Components/StandardContainer';
import {
  NewButtonContainer,
  SearchContainer,
  SearchFieldContainer
} from '../../Components/SearchContainer';
import { IProduct } from '../../../Nexus/entities/IProduct';
import { useEditableState } from '../../Components/EditableContext';
import { useGetProjectQuery } from '../../../store/api/bankApi';
import LoaderSpinner from '../../../common/LoaderSpinner';
import { useParams } from 'react-router-dom';
import { IRouteParams } from '../../Models/IRouteParams';
import NestableHierarcyEditableComponents from '../../Components/NestableHierarchy/NestableHiarchyEditableComponents';
import SearchUtils from '../../../common/SearchUtils';
import Utils from '../../../common/Utils';
import useProjectMutations from '../../../store/api/ProjectMutations';
import DeleteTagForm from './DeleteTagForm';

const useStyles = makeStyles({
  tags: {
    width: '100%',
    alignSelf: 'center',
    height: '100vh',
    [theme.breakpoints.down('sm')]: {
      width: 400
    }
  }
});

export default function TagPage(): React.ReactElement {
  const { t } = useTranslation();
  const classes = useStyles();
  const { setEditMode, setCreating } = useEditableState();
  const [tags, setTags] = useState<Parentable<ITag>[]>([]);

  const { projectId } = useParams<IRouteParams>();
  const { data: project, isLoading } = useGetProjectQuery(projectId);
  const { editTags } = useProjectMutations();

  useEffect(() => {
    if (project && project.tags) {
      setTags(project.tags);
    }
  }, [project]);

  if (isLoading) {
    return <LoaderSpinner />;
  }

  if (!project) {
    return <></>;
  }

  const updateTagsArrangement = (newTagList: Parentable<ITag>[]) => {
    setTags(newTagList);
    editTags(newTagList);
  };

  const searchFieldCallback = (result: Parentable<IProduct>[]) => {
    setTags(result);
  };

  const tagPageSearch = (
    searchString: string,
    list: Parentable<IProduct>[]
  ) => {
    return SearchUtils.search(list, searchString);
  };

  return (
    <>
      <StandardContainer>
        <SearchContainer>
          <SearchFieldContainer>
            {' '}
            <DFOSearchBar
              list={project.tags}
              label={t('search for tags')}
              callback={searchFieldCallback}
              searchFunction={tagPageSearch}
            />
          </SearchFieldContainer>
          <NewButtonContainer>
            <Button variant="primary" onClick={() => setCreating(true)}>
              {t('add new tag')}
            </Button>
          </NewButtonContainer>
        </SearchContainer>

        <Box className={classes.tags}>
          <NestableHierarcyEditableComponents
            dispatchfunc={updateTagsArrangement}
            inputlist={tags}
            CreateComponent={
              <NewTagForm handleClose={() => setCreating(false)} />
            }
            EditComponent={(item: Parentable<ITag>) => (
              <EditTagForm tag={item} handleClose={() => setEditMode('')} />
            )}
            DeleteComponent={(item: Parentable<ITag>) => (
              <DeleteTagForm tag={item} handleClose={() => setEditMode('')} />
            )}
            depth={5}
          />
        </Box>
      </StandardContainer>
    </>
  );
}
