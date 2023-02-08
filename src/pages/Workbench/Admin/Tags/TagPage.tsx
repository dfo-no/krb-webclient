import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import LoaderSpinner from '../../../../common/LoaderSpinner';
import SearchUtils from '../../../../common/SearchUtils';
import DFOSearchBar from '../../../../components/DFOSearchBar/DFOSearchBar';
import { Parentable } from '../../../../models/Parentable';
import { ITag } from '../../../../Nexus/entities/ITag';
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
import DeleteTagForm from './DeleteTagForm';
import EditTagForm from './EditTagForm';
import NewTagForm from './NewTagForm';

export default function TagPage(): React.ReactElement {
  const { t } = useTranslation();
  const { setCurrentlyEditedItemId, setCreating, setDeleteCandidateId } =
    useEditableState();
  const [tags, setTags] = useState<Parentable<ITag>[]>([]);

  const { projectId } = useParams<IRouteProjectParams>();
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
    return SearchUtils.searchParentable(list, searchString);
  };

  return (
    <StandardContainer>
      <SearchContainer>
        <SearchFieldContainer>
          <DFOSearchBar
            list={project.tags}
            placeholder={t('Search for tags')}
            callback={searchFieldCallback}
            searchFunction={tagPageSearch}
          />
        </SearchFieldContainer>
        <NewButtonContainer>
          <Button variant="primary" onClick={() => setCreating(true)}>
            {t('Add new tag')}
          </Button>
        </NewButtonContainer>
      </SearchContainer>

      <NestableHierarcyEditableComponents
        dispatchfunc={updateTagsArrangement}
        inputlist={tags}
        CreateComponent={<NewTagForm handleClose={() => setCreating(false)} />}
        EditComponent={(item: Parentable<ITag>) => (
          <EditTagForm
            tag={item}
            handleClose={() => setCurrentlyEditedItemId('')}
          />
        )}
        DeleteComponent={(
          item: Parentable<ITag>,
          children: React.ReactElement
        ) => (
          <DeleteTagForm
            children={children}
            tag={item}
            handleClose={() => setDeleteCandidateId('')}
          />
        )}
        depth={8}
      />
    </StandardContainer>
  );
}
