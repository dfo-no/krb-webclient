import React from 'react';
import 'react-nestable/dist/styles/index.css';
import { Box, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/Delete';

import theme from '../../theme';
import NestableHierarcy from './NestableHierarcy';
import { Parentable } from '../../models/Parentable';
import { useEditableState } from '../EditableContext/EditableContext';
import { IBaseModelWithTitleAndDesc } from '../../models/IBaseModelWithTitleAndDesc';
import { FormContainerBox } from '../Form/FormContainerBox';
import { ScrollableContainer } from '../ScrollableContainer/ScrollableContainer';
import { FormIconButton } from '../Form/FormIconButton';

const useStyles = makeStyles({
  nestableItemCustom: {
    display: 'flex',
    paddingTop: 8,
    paddingBottom: 8,
    border: `0.1rem solid ${theme.palette.gray500.main}`,
    backgroundColor: theme.palette.white.main,
  },
  nestableCustom: {
    width: '100%',
    '& .nestable-list': {
      paddingLeft: 25,
      '&:first-child': {
        paddingLeft: 0,
      },
    },
    '& .nestable-item': {
      marginTop: '1.6rem',
      '&:first-child': {
        marginTop: '0',
      },
    },
    '& .nestable-list > .nestable-item > .nestable-list': {
      margin: '0',
      '& .nestable-item': {
        margin: '0',
        '& .nestable-item-name': {
          marginTop: '-0.1rem',
        },
      },
    },
  },
  textItemTitle: {
    alignSelf: 'center',
    paddingLeft: 15,
    flex: '1 1 auto',
  },
  textItemDescription: {
    alignSelf: 'center',
    paddingLeft: 15,
    borderLeft: '0.1rem solid',
    marginLeft: 'auto',
    flex: '0 0 25vw',
  },
  handlerIcon: {
    alignSelf: 'center',
    cursor: 'pointer',
    paddingLeft: 8,
    paddingTop: 6,
  },
  editIcon: {
    alignSelf: 'center',
    cursor: 'pointer',
    paddingRight: '0.8rem',
    '&:hover': {
      color: theme.palette.lightBlue.main,
    },
  },
});

interface IProps<T extends IBaseModelWithTitleAndDesc> {
  dispatchfunc: (items: Parentable<T>[]) => void;
  inputlist: Parentable<T>[];
  CreateComponent: React.ReactElement;
  EditComponent: (item: Parentable<T>) => React.ReactElement;
  DeleteComponent?: (
    item: Parentable<T>,
    children: React.ReactElement
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
  depth,
}: IProps<T>): React.ReactElement => {
  const classes = useStyles();
  const {
    currentlyEditedItemId,
    setCurrentlyEditedItemId,
    isCreating,
    setDeleteCandidateId,
  } = useEditableState();

  const isEditing = () => {
    return currentlyEditedItemId !== '';
  };
  const isEditingItem = (item: Parentable<T>) => {
    return item && item.id === currentlyEditedItemId;
  };

  const renderTextBox = (item: Parentable<T>, dragHandle: React.ReactNode) => {
    return (
      <Box className={classes.nestableItemCustom}>
        {!isEditing() && (
          <Box className={classes.handlerIcon}>{dragHandle}</Box>
        )}
        <Box className={classes.textItemTitle}>
          <Typography variant="smBold">{item.title}</Typography>
        </Box>
        <Box className={classes.textItemDescription}>
          <Typography variant="sm">{item.description}</Typography>
        </Box>
        <FormIconButton onClick={() => setCurrentlyEditedItemId(item.id)}>
          <EditOutlinedIcon />
        </FormIconButton>
        {DeleteComponent && (
          <FormIconButton
            hoverColor={theme.palette.errorRed.main}
            onClick={() => setDeleteCandidateId(item.id)}
          >
            <DeleteIcon />
          </FormIconButton>
        )}
      </Box>
    );
  };

  const renderItem = (item: Parentable<T>, dragHandle: React.ReactNode) => {
    if (isEditingItem(item)) {
      return <FormContainerBox>{EditComponent(item)}</FormContainerBox>;
    }
    return (
      <>
        {DeleteComponent &&
          DeleteComponent(item, renderTextBox(item, dragHandle))}
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
        minHeight: 0,
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
