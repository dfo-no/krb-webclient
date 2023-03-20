import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Box } from '@mui/material/';
import { useTranslation } from 'react-i18next';

import { ListHeader } from './ListHeader';
import { DisplayCode } from './DisplayCode';
import { EditCodeForm } from './EditCodeForm';
import NestableHierarcy from '../../../../components/NestableHierarchy/NestableHierarcyKRB858';
import NewCodeForm from './NewCodeForm';
import {
  addElementToList,
  RefAndParentable,
  removeElementFromList,
  replaceElementInList,
} from '../../../../common/Utils';
import {
  CodeForm,
  CodelistForm,
  codelistService,
} from '../../../../api/nexus2';
import { ScrollableContainer } from '../../../../components/ScrollableContainer/ScrollableContainer';
import { useEditableState } from '../../../../components/EditableContext/EditableContext';
import { usePanelStyles } from './CodelistStyles';

type Props = {
  projectRef: string;
  selectedCodelist: CodelistForm;
  setSelectedCodelist: Dispatch<SetStateAction<CodelistForm | null>>;
};

export const CodePanel = ({
  projectRef,
  selectedCodelist,
  setSelectedCodelist,
}: Props): React.ReactElement => {
  const classes = usePanelStyles();
  const { t } = useTranslation();
  const {
    currentlyEditedItemId,
    setCurrentlyEditedItemId,
    isCreating,
    setCreating,
    deleteCandidateId,
    setDeleteCandidateId,
  } = useEditableState();
  const [codesWithParent, setCodesWithParent] = useState<
    RefAndParentable<CodeForm>[]
  >([]);

  useEffect(() => {
    if (selectedCodelist) {
      setCurrentlyEditedItemId('');
      setCreating(false);
      if (!!selectedCodelist?.codes) {
        setCodesWithParent(
          selectedCodelist.codes.map((code) => ({ ...code, parent: '' }))
        );
      }
    }
  }, [
    selectedCodelist,
    setCurrentlyEditedItemId,
    setCreating,
    setSelectedCodelist,
  ]);

  const updateCodesArrangement = () => {
    const updateToSendToBackend = {
      projectRef,
      codelistRef: selectedCodelist.ref,
      ...selectedCodelist,
    };

    codelistService.updateCodelist(updateToSendToBackend);
  };

  const isEditing = () => {
    return currentlyEditedItemId !== '' && deleteCandidateId !== '';
  };

  const isEditingItem = (item: CodeForm) => {
    return item && item.ref === currentlyEditedItemId;
  };

  const handleCloseEdit = (newCode: CodeForm) => {
    const newCodes = replaceElementInList(
      newCode,
      selectedCodelist.codes || []
    );
    setSelectedCodelist({ ...selectedCodelist, codes: newCodes });

    setCurrentlyEditedItemId('');
  };

  const handleCloseCreate = (newCode: CodeForm) => {
    const newCodes = addElementToList(newCode, selectedCodelist.codes || []);
    setSelectedCodelist({ ...selectedCodelist, codes: newCodes });

    setCreating(false);
  };

  const handleCloseDelete = (deletedCode: CodeForm) => {
    const newCodes = removeElementFromList(
      deletedCode,
      selectedCodelist.codes || []
    );
    setSelectedCodelist({ ...selectedCodelist, codes: newCodes });

    setDeleteCandidateId('');
  };

  const renderItem = (
    code: RefAndParentable<CodeForm>,
    dragHandle: React.ReactNode
  ) => {
    if (isEditingItem(code)) {
      return (
        <EditCodeForm
          projectRef={projectRef}
          codelistRef={selectedCodelist.ref}
          code={code}
          handleClose={handleCloseEdit}
          handleCancel={() => setCurrentlyEditedItemId('')}
        />
      );
    } else {
      return (
        <DisplayCode
          projectRef={projectRef}
          codelistRef={selectedCodelist.ref}
          code={code}
          dragHandle={isEditing() ? null : dragHandle}
          handleDelete={handleCloseDelete}
          handleCancel={() => setDeleteCandidateId('')}
        />
      );
    }
  };

  return (
    <Box className={classes.topContainer}>
      <ListHeader
        heading={t('Code')}
        buttonText={t('Add new code')}
        onClick={() => setCreating(true)}
      />
      {isCreating && (
        <NewCodeForm
          projectRef={projectRef}
          codelistRef={selectedCodelist.ref}
          handleClose={handleCloseCreate}
          handleCancel={() => setCreating(false)}
        />
      )}
      <ScrollableContainer>
        <NestableHierarcy
          className={classes.nestableCustom}
          inputlist={codesWithParent || []}
          renderItem={renderItem}
          dispatchfunc={updateCodesArrangement}
          depth={1}
        />
      </ScrollableContainer>
    </Box>
  );
};
