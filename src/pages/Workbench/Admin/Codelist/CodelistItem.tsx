import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Box, Typography } from '@mui/material';

import theme from '../../../../theme';
import DeleteCodelistForm from './DeleteCodelistForm';
import EditCodelistForm from './EditCodelistForm';
import { FormIconButton } from '../../../../components/Form/FormIconButton';
import { ICodelist } from '../../../../Nexus/entities/ICodelist';
import { FormContainerBox } from '../../../../components/Form/FormContainerBox';
import { usePanelStyles } from './CodelistStyles';
import { useEditableState } from '../../../../components/EditableContext/EditableContext';
import { useSelectState } from './SelectContext';
import Utils from '../../../../common/Utils';

type Props = {
  codelist: ICodelist;
  index: number;
};

export const CodelistItem = ({ codelist: item, index: i }: Props) => {
  const classes = usePanelStyles();

  const { codelist, setCodelist, codelists, setCodelists } = useSelectState();
  const { editMode, setEditMode, deleteMode, setDeleteMode } =
    useEditableState();

  const itemClicked = (clickedCodelist: ICodelist) => {
    if (editMode !== '') {
      setEditMode('');
    }
    if (deleteMode !== '') {
      setDeleteMode('');
    }
    setCodelist(clickedCodelist);
  };

  const handleCloseEdit = (newCodelist: ICodelist | null) => {
    if (newCodelist) {
      setCodelist(newCodelist);
    }
    setEditMode('');
  };

  const handleCloseDelete = (deletedCodelist: ICodelist | null) => {
    if (deletedCodelist) {
      setCodelist(null);
      setCodelists(Utils.removeElementFromList(deletedCodelist, codelists));
    }
    setDeleteMode('');
  };

  const isEditingItem = (maybeEditedCodelist: ICodelist) => {
    return maybeEditedCodelist && maybeEditedCodelist.id === editMode;
  };

  const isSelectedClass = (maybeSelectedCodelist: ICodelist) => {
    return codelist && codelist.id === maybeSelectedCodelist.id
      ? classes.selectedItem
      : '';
  };

  const enterEditMode = (codelistToEdit: ICodelist) => {
    setCodelist(codelistToEdit);
    setEditMode(codelistToEdit.id);
  };

  const enterDeleteMode = (codelistToDelete: ICodelist) => {
    setCodelist(codelistToDelete);
    setDeleteMode(codelistToDelete.id);
  };

  const renderCodelistItem = (codelistToRender: ICodelist) => {
    return (
      <Box
        className={`${classes.listItem} ${classes.withHover} ${isSelectedClass(
          codelistToRender
        )}`}
      >
        <Box
          className={classes.textItem}
          onClick={() => itemClicked(codelistToRender)}
        >
          <Box className={classes.textItemTitle}>
            <Typography variant="smBold">{codelistToRender.title}</Typography>
            <FormIconButton
              sx={{ marginLeft: 'auto' }}
              hoverColor={theme.palette.primary.main}
              onClick={() => enterEditMode(codelistToRender)}
            >
              <EditOutlinedIcon />
            </FormIconButton>
            <FormIconButton
              hoverColor={theme.palette.errorRed.main}
              onClick={() => enterDeleteMode(codelistToRender)}
            >
              <DeleteIcon />
            </FormIconButton>
          </Box>
          <Box className={classes.textItemDescription}>
            <Typography variant="sm">{codelistToRender.description}</Typography>
          </Box>
        </Box>
      </Box>
    );
  };

  if (isEditingItem(item)) {
    return (
      <FormContainerBox sx={{ marginBottom: 1 }} key={i}>
        <EditCodelistForm codelist={item} handleClose={handleCloseEdit} />
      </FormContainerBox>
    );
  }
  return (
    <DeleteCodelistForm
      key={i}
      children={renderCodelistItem(item)}
      codelist={item}
      handleClose={handleCloseDelete}
    />
  );
};
