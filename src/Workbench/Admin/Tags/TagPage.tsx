import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import LoaderSpinner from '../../../common/LoaderSpinner';
import SearchUtils from '../../../common/SearchUtils';
import DFOSearchBar from '../../../components/DFOSearchBar/DFOSearchBar';
import { Parentable } from '../../../models/Parentable';
import { ITag } from '../../../Nexus/entities/ITag';
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
import DeleteTagForm from './DeleteTagForm';
import EditTagForm from './EditTagForm';
import NewTagForm from './NewTagForm';

export default function TagPage(): React.ReactElement {
  const { t } = useTranslation();
  const { setEditMode, setCreating, setDeleteMode } = useEditableState();
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

  const searchFieldCallback = (result: Parentable<ITag>[]) => {
    setTags(result);
  };

  const tagPageSearch = (searchString: string, list: Parentable<ITag>[]) => {
    return SearchUtils.search(list, searchString);
  };

  return (
    <StandardContainer>
      <SearchContainer>
        <SearchFieldContainer>
          {' '}
          <DFOSearchBar
            list={project.tags}
            placeholder={t('search for tags')}
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

      <NestableHierarcyEditableComponents
        dispatchfunc={updateTagsArrangement}
        inputlist={tags}
        CreateComponent={<NewTagForm handleClose={() => setCreating(false)} />}
        EditComponent={(item: Parentable<ITag>) => (
          <EditTagForm tag={item} handleClose={() => setEditMode('')} />
        )}
        DeleteComponent={(
          item: Parentable<ITag>,
          children: React.ReactElement
        ) => (
          <DeleteTagForm
            children={children}
            tag={item}
            handleClose={() => setDeleteMode('')}
          />
        )}
        depth={8}
      />
    </StandardContainer>
  );
}
