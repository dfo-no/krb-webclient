import React from 'react';
import 'react-nestable/dist/styles/index.css';
import { Box, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/Delete';

import theme from '../../theme';
import NestableHierarcy from './NestableHierarcyKRB858';
import { useEditableState } from '../EditableContext/EditableContext';
import { FormContainerBox } from '../Form/FormContainerBox';
import { ScrollableContainer } from '../ScrollableContainer/ScrollableContainer';
import { FormIconButton } from '../Form/FormIconButton';
import { RefAndParentable } from '../../common/Utils';
import { ProductForm } from '../../api/nexus2';

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

interface IProps<T extends RefAndParentable<ProductForm>> {
  dispatchfunc: (items: RefAndParentable<T>[]) => void;
  inputlist: RefAndParentable<T>[];
  CreateComponent: React.ReactElement;
  EditComponent: (item: RefAndParentable<T>) => React.ReactElement;
  DeleteComponent?: (
    item: RefAndParentable<T>,
    children: React.ReactElement
  ) => React.ReactElement;
  depth: number;
}

const NestableHierarcyEditableComponents = <
  T extends RefAndParentable<ProductForm>
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
  const isEditingItem = (item: RefAndParentable<T>) => {
    return item && item.ref === currentlyEditedItemId;
  };

  const renderTextBox = (
    item: RefAndParentable<T>,
    dragHandle: React.ReactNode
  ) => {
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
        <FormIconButton onClick={() => setCurrentlyEditedItemId(item.ref)}>
          <EditOutlinedIcon />
        </FormIconButton>
        {DeleteComponent && (
          <FormIconButton
            hoverColor={theme.palette.errorRed.main}
            onClick={() => setDeleteCandidateId(item.ref)}
          >
            <DeleteIcon />
          </FormIconButton>
        )}
      </Box>
    );
  };

  const renderItem = (
    item: RefAndParentable<T>,
    dragHandle: React.ReactNode
  ) => {
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
