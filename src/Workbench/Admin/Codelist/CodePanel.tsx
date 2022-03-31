import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Box, Typography } from '@mui/material/';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Utils from '../../../common/Utils';
import { Parentable } from '../../../models/Parentable';
import { ICode } from '../../../Nexus/entities/ICode';
import { useGetProjectQuery } from '../../../store/api/bankApi';
import useProjectMutations from '../../../store/api/ProjectMutations';
import theme from '../../../theme';
import { useEditableState } from '../../Components/EditableContext';
import { FormContainerBox } from '../../Components/Form/FormContainerBox';
import { FormIconButton } from '../../Components/Form/FormIconButton';
import NestableHierarcy from '../../Components/NestableHierarchy/NestableHierarcy';
import { ScrollableContainer } from '../../Components/ScrollableContainer';
import { IRouteParams } from '../../Models/IRouteParams';
import CodeAddButton from './CodeAddButton';
import { usePanelStyles } from './CodelistStyles';
import DeleteCodeForm from './DeleteCodeForm';
import EditCodeForm from './EditCodeForm';
import NewCodeForm from './NewCodeForm';
import { useSelectState } from './SelectContext';

const CodePanel = (): React.ReactElement => {
  const classes = usePanelStyles();
  const { codelist, setCodelist } = useSelectState();
  const {
    editMode,
    setEditMode,
    isCreating,
    setCreating,
    deleteMode,
    setDeleteMode
  } = useEditableState();
  const [codes, setCodes] = useState<Parentable<ICode>[]>([]);

  const { projectId } = useParams<IRouteParams>();
  const { data: project } = useGetProjectQuery(projectId);
  const { editCodes } = useProjectMutations();

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

  const updateCodesArrangement = (newCodes: Parentable<ICode>[]) => {
    setCodes(newCodes);
    editCodes(newCodes, codelist);
  };

  const isEditing = () => {
    return editMode !== '' && deleteMode !== '';
  };
  const isEditingItem = (item: Parentable<ICode>) => {
    return item && item.id === editMode;
  };

  const handleCloseEdit = (newCode: Parentable<ICode> | null) => {
    if (newCode) {
      const newCodes = Utils.replaceElementInList(newCode, codelist.codes);
      setCodelist({ ...codelist, codes: newCodes });
    }
    setEditMode('');
  };

  const handleCloseCreate = (newCode: Parentable<ICode> | null) => {
    if (newCode) {
      const newCodes = Utils.addElementToList(newCode, codelist.codes);
      setCodelist({ ...codelist, codes: newCodes });
    }
    setCreating(false);
  };

  const handleCloseDelete = (deletedCode: Parentable<ICode> | null) => {
    if (deletedCode) {
      const newCodes = Utils.removeElementFromList(deletedCode, codelist.codes);
      setCodelist({ ...codelist, codes: newCodes });
    }
    setDeleteMode('');
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
            <Typography variant="smallBold">{item.title}</Typography>
            <FormIconButton
              sx={{ marginLeft: 'auto' }}
              onClick={() => setEditMode(item.id)}
            >
              <EditOutlinedIcon />
            </FormIconButton>
            <FormIconButton
              hoverColor={theme.palette.dfoErrorRed.main}
              onClick={() => setDeleteMode(item.id)}
            >
              <DeleteIcon />
            </FormIconButton>
          </Box>
          <Box className={classes.textItemDescription}>
            <Typography variant="small">{item.description}</Typography>
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
