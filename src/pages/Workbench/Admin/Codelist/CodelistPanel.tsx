import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Box, List, Typography } from '@mui/material';
import 'react-nestable/dist/styles/index.css';

import CodelistAddButton from './CodelistAddButton';
import DeleteCodelistForm from './DeleteCodelistForm';
import EditCodelistForm from './EditCodelistForm';
import NewCodelistForm from './NewCodelistForm';
import theme from '../../../../theme';
import Utils from '../../../../common/Utils';
import { FormContainerBox } from '../../../../components/Form/FormContainerBox';
import { FormIconButton } from '../../../../components/Form/FormIconButton';
import { ICodelist } from '../../../../Nexus/entities/ICodelist';
import { ScrollableContainer } from '../../../../components/ScrollableContainer/ScrollableContainer';
import { useEditableState } from '../../../../components/EditableContext/EditableContext';
import { usePanelStyles } from './CodelistStyles';
import { useSelectState } from './SelectContext';

const CodelistPanel = (): React.ReactElement => {
  const classes = usePanelStyles();
  const { codelist, setCodelist, codelists, setCodelists } = useSelectState();
  const {
    currentlyEditedItemId,
    setCurrentlyEditedItemId,
    isCreating,
    setCreating,
    deleteCandidateId,
    setDeleteCandidateId,
  } = useEditableState();

  const itemClicked = (item: ICodelist) => {
    if (currentlyEditedItemId !== '') {
      setCurrentlyEditedItemId('');
    }
    if (deleteCandidateId !== '') {
      setDeleteCandidateId('');
    }
    setCodelist(item);
  };

  const handleCloseEdit = (newCodelist: ICodelist) => {
    setCodelist(newCodelist);

    setCurrentlyEditedItemId('');
  };

  const handleCloseCreate = (newCodelist: ICodelist) => {
    setCodelist(newCodelist);
    setCodelists(Utils.addElementToList(newCodelist, codelists));

    setCreating(false);
  };

  const handleCloseDelete = (deletedCodelist: ICodelist) => {
    setCodelist(null);
    setCodelists(Utils.removeElementFromList(deletedCodelist, codelists));

    setDeleteCandidateId('');
  };

  const isEditingItem = (item: ICodelist) => {
    return item && item.id === currentlyEditedItemId;
  };

  const selectedClass = (item: ICodelist) => {
    return codelist && codelist.id === item.id ? classes.selectedItem : '';
  };

  const enterEditMode = (item: ICodelist) => {
    setCodelist(item);
    setCurrentlyEditedItemId(item.id);
  };

  const enterDeleteMode = (item: ICodelist) => {
    setCodelist(item);
    setDeleteCandidateId(item.id);
  };

  const renderCodelistItem = (item: ICodelist) => {
    return (
      <Box
        className={`${classes.listItem} ${classes.withHover} ${selectedClass(
          item
        )}`}
      >
        <Box className={classes.textItem} onClick={() => itemClicked(item)}>
          <Box className={classes.textItemTitle}>
            <Typography variant="smBold">{item.title}</Typography>
            <FormIconButton
              sx={{ marginLeft: 'auto' }}
              hoverColor={theme.palette.primary.main}
              onClick={() => enterEditMode(item)}
            >
              <EditOutlinedIcon />
            </FormIconButton>
            <FormIconButton
              hoverColor={theme.palette.errorRed.main}
              onClick={() => enterDeleteMode(item)}
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

  const renderItem = (item: ICodelist, i: number) => {
    if (isEditingItem(item)) {
      return (
        <FormContainerBox sx={{ marginBottom: 1 }} key={i}>
          <EditCodelistForm
            codelist={item}
            handleClose={handleCloseEdit}
            handleCancel={() => setCurrentlyEditedItemId('')}
          />
        </FormContainerBox>
      );
    }
    return (
      <DeleteCodelistForm
        key={i}
        children={renderCodelistItem(item)}
        codelist={item}
        handleClose={handleCloseDelete}
        handleCancel={() => setDeleteCandidateId('')}
      />
    );
  };

  return (
    <Box className={classes.topContainer}>
      <CodelistAddButton onClick={() => setCreating(true)} />
      {isCreating && (
        <FormContainerBox>
          <NewCodelistForm
            handleClose={handleCloseCreate}
            handleCancel={() => setCreating(false)}
          />
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
