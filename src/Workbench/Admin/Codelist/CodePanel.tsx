import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material/';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Parentable } from '../../../models/Parentable';
import { ICode } from '../../../Nexus/entities/ICode';
import NestableHierarcy from '../../Components/NestableHierarchy/NestableHierarcy';
import { useSelectState } from './SelectContext';
import EditCodeForm from './EditCodeForm';
import CodeAddButton from './CodeAddButton';
import NewCodeForm from './NewCodeForm';
import { usePanelStyles } from './CodelistStyles';
import { useEditableState } from '../../Components/EditableContext';
import { FormContainerBox } from '../../Components/Form/FormContainerBox';
import { useGetProjectQuery } from '../../../store/api/bankApi';
import { useParams } from 'react-router-dom';
import { IRouteParams } from '../../Models/IRouteParams';
import Utils from '../../../common/Utils';
import useProjectMutations from '../../../store/api/ProjectMutations';

const CodePanel = (): React.ReactElement => {
  const classes = usePanelStyles();
  const { codelist, setCodelist } = useSelectState();
  const { editMode, setEditMode, isCreating, setCreating } = useEditableState();
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
    return editMode !== '';
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
      <Box className={classes.listItem}>
        {!isEditing() && <Box className={classes.handlerIcon}>{handler}</Box>}
        <Box className={classes.textItem}>
          <Box className={classes.textItemTitle}>
            <Typography variant="smallBold">{item.title}</Typography>
          </Box>
          <Box className={classes.textItemDescription}>
            <Typography variant="small">{item.description}</Typography>
          </Box>
        </Box>
        <Box className={classes.editIcon} onClick={() => setEditMode(item.id)}>
          <EditOutlinedIcon />
        </Box>
      </Box>
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
      <NestableHierarcy
        className={classes.nestableCustom}
        inputlist={codes}
        renderItem={renderItem}
        dispatchfunc={updateCodesArrangement}
        depth={1}
      />
    </Box>
  );
};

export default CodePanel;
