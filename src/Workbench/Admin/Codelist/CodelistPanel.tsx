import React from 'react';
import 'react-nestable/dist/styles/index.css';
import { Typography, Box, List } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { ICodelist } from '../../../Nexus/entities/ICodelist';
import CodelistAddButton from './CodelistAddButton';
import { useSelectState } from './SelectContext';
import EditCodelistForm from './EditCodelistForm';
import NewCodelistForm from './NewCodelistForm';
import { usePanelStyles } from './CodelistStyles';
import { useEditableState } from '../../Components/EditableContext';
import { FormContainerBox } from '../../Components/Form/FormContainerBox';
import { ScrollableContainer } from '../../Components/ScrollableContainer';
import Utils from '../../../common/Utils';
import { FormIconButton } from '../../Components/Form/FormIconButton';
import theme from '../../../theme';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteCodelistForm from './DeleteCodelistForm';

const CodelistPanel = (): React.ReactElement => {
  const classes = usePanelStyles();
  const { codelist, setCodelist, codelists, setCodelists } = useSelectState();
  const {
    editMode,
    setEditMode,
    isCreating,
    setCreating,
    deleteMode,
    setDeleteMode
  } = useEditableState();

  const itemClicked = (item: ICodelist) => {
    if (editMode !== '') {
      setEditMode('');
    }
    if (deleteMode !== '') {
      setDeleteMode('');
    }
    setCodelist(item);
  };

  const handleCloseEdit = (newCodelist: ICodelist | null) => {
    if (newCodelist) {
      setCodelist(newCodelist);
    }
    setEditMode('');
  };

  const handleCloseCreate = (newCodelist: ICodelist | null) => {
    if (newCodelist) {
      setCodelist(newCodelist);
      setCodelists(Utils.addElementToList(newCodelist, codelists));
    }
    setCreating(false);
  };

  const handleCloseDelete = (deletedCodelist: ICodelist | null) => {
    if (deletedCodelist) {
      setCodelist(null);
      setCodelists(Utils.removeElementFromList(deletedCodelist, codelists));
    }
    setDeleteMode('');
  };

  const isEditingItem = (item: ICodelist) => {
    return item && item.id === editMode;
  };

  const selectedClass = (item: ICodelist) => {
    return codelist && codelist.id === item.id ? classes.selectedItem : '';
  };

  const enterEditMode = (item: ICodelist) => {
    setCodelist(item);
    setEditMode(item.id);
  };

  const renderCodelistItem = (item: ICodelist, i: number) => {
    return (
      <Box key={i}>
        {!isEditingItem(item) && (
          <Box
            className={`${classes.listItem} ${
              classes.withHover
            } ${selectedClass(item)}`}
          >
            <Box className={classes.textItem} onClick={() => itemClicked(item)}>
              <Box className={classes.textItemTitle}>
                <Typography variant="smallBold">{item.title}</Typography>
                <FormIconButton
                  sx={{ marginLeft: 'auto' }}
                  onClick={() => enterEditMode(item)}
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
        )}
      </Box>
    );
  };

  const renderItem = (item: ICodelist, i: number) => {
    if (isEditingItem(item)) {
      return (
        <FormContainerBox sx={{ marginBottom: 1 }} key={i}>
          <EditCodelistForm codelist={item} handleClose={handleCloseEdit} />
        </FormContainerBox>
      );
    }
    return (
      <DeleteCodelistForm
        child={renderCodelistItem(item, i)}
        codelist={item}
        handleClose={handleCloseDelete}
      />
    );
  };

  return (
    <Box className={classes.topContainer}>
      <CodelistAddButton onClick={() => setCreating(true)} />
      {isCreating && (
        <FormContainerBox>
          <NewCodelistForm handleClose={handleCloseCreate} />
        </FormContainerBox>
      )}
      <ScrollableContainer>
        <List className={classes.list} aria-label="codelist">
          {codelists && codelists.map(renderItem)}
        </List>
      </ScrollableContainer>
    </Box>
  );
};

export default CodelistPanel;
