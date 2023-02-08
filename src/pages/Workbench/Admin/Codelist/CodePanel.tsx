import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Box, Typography } from '@mui/material/';
import { useParams } from 'react-router-dom';

import CodeAddButton from './CodeAddButton';
import DeleteCodeForm from './DeleteCodeForm';
import EditCodeForm from './EditCodeForm';
import NestableHierarcy from '../../../../components/NestableHierarchy/NestableHierarcy';
import NewCodeForm from './NewCodeForm';
import theme from '../../../../theme';
import useProjectMutations from '../../../../store/api/ProjectMutations';
import Utils from '../../../../common/Utils';
import { FormContainerBox } from '../../../../components/Form/FormContainerBox';
import { FormIconButton } from '../../../../components/Form/FormIconButton';
import { ICode } from '../../../../Nexus/entities/ICode';
import { IRouteProjectParams } from '../../../../models/IRouteProjectParams';
import { Parentable } from '../../../../models/Parentable';
import { ScrollableContainer } from '../../../../components/ScrollableContainer/ScrollableContainer';
import { useGetProjectQuery } from '../../../../store/api/bankApi';
import { useEditableState } from '../../../../components/EditableContext/EditableContext';
import { usePanelStyles } from './CodelistStyles';
import { useSelectState } from './SelectContext';

const CodePanel = (): React.ReactElement => {
  const classes = usePanelStyles();
  const { codelist, setCodelist } = useSelectState();
  const {
    currentlyEditedItemId,
    setCurrentlyEditedItemId,
    isCreating,
    setCreating,
    deleteCandidateId,
    setDeleteCandidateId,
  } = useEditableState();
  const [codes, setCodes] = useState<Parentable<ICode>[]>([]);

  const { projectId } = useParams<IRouteProjectParams>();
  const { data: project } = useGetProjectQuery(projectId);
  const { editCodes } = useProjectMutations();

  useEffect(() => {
    if (codelist) {
      setCurrentlyEditedItemId('');
      setCreating(false);
      setCodes(codelist.codes);
    }
  }, [codelist, setCurrentlyEditedItemId, setCreating]);

  // If no codelist is selected, we cant create the component
  if (!codelist || !project) {
    return <></>;
  }

  const updateCodesArrangement = (newCodes: Parentable<ICode>[]) => {
    setCodes(newCodes);
    editCodes(newCodes, codelist);
  };

  const isEditing = () => {
    return currentlyEditedItemId !== '' && deleteCandidateId !== '';
  };
  const isEditingItem = (item: Parentable<ICode>) => {
    return item && item.id === currentlyEditedItemId;
  };

  const handleCloseEdit = (newCode: Parentable<ICode>) => {
    const newCodes = Utils.replaceElementInList(newCode, codelist.codes);
    setCodelist({ ...codelist, codes: newCodes });

    setCurrentlyEditedItemId('');
  };

  const handleCloseCreate = (newCode: Parentable<ICode>) => {
    const newCodes = Utils.addElementToList(newCode, codelist.codes);
    setCodelist({ ...codelist, codes: newCodes });

    setCreating(false);
  };

  const handleCloseDelete = (deletedCode: Parentable<ICode>) => {
    const newCodes = Utils.removeElementFromList(deletedCode, codelist.codes);
    setCodelist({ ...codelist, codes: newCodes });

    setDeleteCandidateId('');
  };

  const renderCodeItem = (
    item: Parentable<ICode>,
    handler: React.ReactNode
  ) => {
    return (
      <Box className={classes.listItem}>
        {!isEditing() && <Box className={classes.handlerIcon}>{handler}</Box>}
        <Box className={classes.textItem}>
          <Box className={classes.textItemTitle}>
            <Typography variant="smBold">{item.title}</Typography>
            <FormIconButton
              sx={{ marginLeft: 'auto' }}
              onClick={() => setCurrentlyEditedItemId(item.id)}
            >
              <EditOutlinedIcon />
            </FormIconButton>
            <FormIconButton
              hoverColor={theme.palette.errorRed.main}
              onClick={() => setDeleteCandidateId(item.id)}
            >
              <DeleteIcon />
            </FormIconButton>
          </Box>
          <Box className={classes.textItemDescription}>
            <Typography variant="sm">{item.description}</Typography>
          </Box>
        </Box>
      </Box>
    );
  };

  const renderItem = (item: Parentable<ICode>, handler: React.ReactNode) => {
    if (isEditingItem(item)) {
      return (
        <FormContainerBox sx={{ marginBottom: 1 }}>
          <EditCodeForm
            codelist={codelist}
            code={item}
            handleClose={handleCloseEdit}
            handleCancel={() => setCurrentlyEditedItemId('')}
          />
        </FormContainerBox>
      );
    }
    return (
      <DeleteCodeForm
        children={renderCodeItem(item, handler)}
        codelist={codelist}
        code={item}
        handleClose={handleCloseDelete}
        handleCancel={() => setDeleteCandidateId('')}
      />
    );
  };

  return (
    <Box className={classes.topContainer}>
      <CodeAddButton onClick={() => setCreating(true)} />
      {isCreating && (
        <FormContainerBox sx={{ marginBottom: 1 }}>
          <NewCodeForm
            codelist={codelist}
            handleClose={handleCloseCreate}
            handleCancel={() => setCreating(false)}
          />
        </FormContainerBox>
      )}
      <ScrollableContainer>
        <NestableHierarcy
          className={classes.nestableCustom}
          inputlist={codes}
          renderItem={renderItem}
          dispatchfunc={updateCodesArrangement}
          depth={1}
        />
      </ScrollableContainer>
    </Box>
  );
};

export default CodePanel;
