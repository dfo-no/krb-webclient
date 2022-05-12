import React from 'react';
import 'react-nestable/dist/styles/index.css';
import { Parentable } from '../../../models/Parentable';
import { Box, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import theme from '../../../theme';
import NestableHierarcy from './NestableHierarcy';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEditableState } from '../EditableContext';
import { IBaseModelWithTitleAndDesc } from '../../../models/IBaseModelWithTitleAndDesc';
import { FormContainerBox } from '../Form/FormContainerBox';
import { ScrollableContainer } from '../ScrollableContainer';
import { FormIconButton } from '../Form/FormIconButton';

const useStyles = makeStyles({
  nestableItemCustom: {
    display: 'flex',
    paddingTop: 8,
    paddingBottom: 8,
    border: `1px solid ${theme.palette.gray500.main}`,
    backgroundColor: theme.palette.white.main
  },
  nestableCustom: {
    width: '100%',
    '& .nestable-list': {
      paddingLeft: 25,
      '&:first-child': {
        paddingLeft: 0
      }
    },
    '& .nestable-item': {
      marginTop: '16px',
      '&:first-child': {
        marginTop: '0'
      }
    },
    '& .nestable-list > .nestable-item > .nestable-list': {
      margin: '0',
      '& .nestable-item': {
        margin: '0',
        '& .nestable-item-name': {
          marginTop: '-1px'
        }
      }
    }
  },
  textItemTitle: {
    alignSelf: 'center',
    paddingLeft: 15,
    flex: '1 1 auto'
  },
  textItemDescription: {
    alignSelf: 'center',
    paddingLeft: 15,
    borderLeft: '1px solid',
    marginLeft: 'auto',
    flex: '0 0 25vw'
  },
  handlerIcon: {
    alignSelf: 'center',
    cursor: 'pointer',
    paddingLeft: 8,
    paddingTop: 6
  },
  editIcon: {
    alignSelf: 'center',
    cursor: 'pointer',
    paddingRight: '8px',
    '&:hover': {
      color: theme.palette.lightBlue.main
    }
  }
});

interface IProps<T extends IBaseModelWithTitleAndDesc> {
  dispatchfunc: (items: Parentable<T>[]) => void;
  inputlist: Parentable<T>[];
  CreateComponent: React.ReactElement;
  EditComponent: (item: Parentable<T>) => React.ReactElement;
  DeleteComponent?: (
    item: Parentable<T>,
    child: React.ReactElement
  ) => React.ReactElement;
  depth: number;
}

const NestableHierarcyEditableComponents = <
  T extends IBaseModelWithTitleAndDesc
>({
  dispatchfunc,
  inputlist,
  CreateComponent,
  EditComponent,
  DeleteComponent,
  depth
}: IProps<T>): React.ReactElement => {
  const classes = useStyles();
  const { editMode, setEditMode, isCreating, setDeleteMode } =
    useEditableState();

  const isEditing = () => {
    return editMode !== '';
  };
  const isEditingItem = (item: Parentable<T>) => {
    return item && item.id === editMode;
  };

  const renderTextBox = (item: Parentable<T>, handler: React.ReactNode) => {
    return (
      <Box className={classes.nestableItemCustom}>
        {!isEditing() && <Box className={classes.handlerIcon}>{handler}</Box>}
        <Box className={classes.textItemTitle}>
          <Typography variant="smBold">{item.title}</Typography>
        </Box>
        <Box className={classes.textItemDescription}>
          <Typography variant="sm">{item.description}</Typography>
        </Box>
        <FormIconButton onClick={() => setEditMode(item.id)}>
          <EditOutlinedIcon />
        </FormIconButton>
        {DeleteComponent && (
          <FormIconButton
            hoverColor={theme.palette.errorRed.main}
            onClick={() => setDeleteMode(item.id)}
          >
            <DeleteIcon />
          </FormIconButton>
        )}
      </Box>
    );
  };

  const renderItem = (item: Parentable<T>, handler: React.ReactNode) => {
    if (isEditingItem(item)) {
      return <FormContainerBox>{EditComponent(item)}</FormContainerBox>;
    }
    return (
      <>
        {DeleteComponent && DeleteComponent(item, renderTextBox(item, handler))}
      </>
    );
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        flexGrow: 1,
        minHeight: 0
      }}
    >
      {isCreating && <FormContainerBox>{CreateComponent}</FormContainerBox>}
      <ScrollableContainer>
        <NestableHierarcy<T>
          className={classes.nestableCustom}
          inputlist={inputlist}
          renderItem={renderItem}
          dispatchfunc={dispatchfunc}
          depth={depth}
        />
      </ScrollableContainer>
    </Box>
  );
};

export default NestableHierarcyEditableComponents;
