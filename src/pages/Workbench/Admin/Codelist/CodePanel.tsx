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
import { useProjectMutationState } from '../../../../store/api/ProjectMutations';
import Utils from '../../../../common/Utils';
import { FormContainerBox } from '../../../../components/Form/FormContainerBox';
import { FormIconButton } from '../../../../components/Form/FormIconButton';
import { IRouteProjectParams } from '../../../../models/IRouteProjectParams';
import { ScrollableContainer } from '../../../../components/ScrollableContainer/ScrollableContainer';
import { useGetProjectQuery } from '../../../../store/api/bankApi';
import { useEditableState } from '../../../../components/EditableContext/EditableContext';
import { usePanelStyles } from './CodelistStyles';
import { useSelectState } from './SelectContext';
import { Code } from '../../../../api/openapi-fetch';

const CodePanel = (): React.ReactElement => {
  const classes = usePanelStyles();
  const { codelist, setCodelist } = useSelectState();
  const {
    editMode,
    setEditMode,
    isCreating,
    setCreating,
    deleteMode,
    setDeleteMode,
  } = useEditableState();
  const [codes, setCodes] = useState<Code[]>([]);

  const { projectId } = useParams<IRouteProjectParams>();
  const { data: project } = useGetProjectQuery(projectId);
  const { editCodes } = useProjectMutationState();

  useEffect(() => {
    if (codelist) {
      setEditMode('');
      setCreating(false);
      setCodes(codelist.codes);
    }
  }, [codelist, setEditMode, setCreating]);

  // If no codelist is selected, we cant create the component
  if (!codelist || !project) {
    return <></>;
  }

  const updateCodesArrangement = (newCodes: Code[]) => {
    setCodes(newCodes);
    editCodes(newCodes, codelist);
  };

  const isEditing = () => {
    return editMode !== '' && deleteMode !== '';
  };
  const isEditingItem = (item: Code) => {
    return item && item.ref === editMode;
  };

  const handleCloseEdit = (newCode: Code | null) => {
    if (newCode) {
      const newCodes = Utils.replaceElementInList(newCode, codelist.codes);
      setCodelist({ ...codelist, codes: newCodes });
    }
    setEditMode('');
  };

  const handleCloseCreate = (newCode: Code | null) => {
    if (newCode) {
      const newCodes = Utils.addElementToList(newCode, codelist.codes);
      setCodelist({ ...codelist, codes: newCodes });
    }
    setCreating(false);
  };

  const handleCloseDelete = (deletedCode: Code | null) => {
    if (deletedCode) {
      const newCodes = Utils.removeElementFromList(deletedCode, codelist.codes);
      setCodelist({ ...codelist, codes: newCodes });
    }
    setDeleteMode('');
  };

  const renderCodeItem = (item: Code, handler: React.ReactNode) => {
    return (
      <Box className={classes.listItem}>
        {!isEditing() && <Box className={classes.handlerIcon}>{handler}</Box>}
        <Box className={classes.textItem}>
          <Box className={classes.textItemTitle}>
            <Typography variant="smBold">{item.title}</Typography>
            <FormIconButton
              sx={{ marginLeft: 'auto' }}
              onClick={() => setEditMode(item.ref)}
            >
              <EditOutlinedIcon />
            </FormIconButton>
            <FormIconButton
              hoverColor={theme.palette.errorRed.main}
              onClick={() => setDeleteMode(item.ref)}
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

  const renderItem = (item: Code, handler: React.ReactNode) => {
    if (isEditingItem(item)) {
      return (
        <FormContainerBox sx={{ marginBottom: 1 }}>
          <EditCodeForm
            codelist={codelist}
            code={item}
            handleClose={handleCloseEdit}
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
      />
    );
  };

  return (
    <Box className={classes.topContainer}>
      <CodeAddButton onClick={() => setCreating(true)} />
      {isCreating && (
        <FormContainerBox sx={{ marginBottom: 1 }}>
          <NewCodeForm codelist={codelist} handleClose={handleCloseCreate} />
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
