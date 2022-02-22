import makeStyles from '@mui/styles/makeStyles';
import theme from '../../../theme';

export const useFormStyles = makeStyles({
  formItem: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 8
  },
  inputBox: {
    display: 'flex',
    paddingRight: 8
  },
  iconButton: {
    display: 'flex',
    marginLeft: 'auto',
    justifySelf: 'flex-end',
    alignSelf: 'center',
    '& .MuiSvgIcon-root': {
      cursor: 'pointer',
      color: theme.palette.gray500.main,
      width: 32,
      height: 32,
      '&:hover': {
        color: theme.palette.dfoLightBlue.main
      }
    }
  }
});

export const useButtonStyles = makeStyles({
  buttonContainer: {
    display: 'flex',
    alignSelf: 'center',
    width: '100%'
  },
  buttonTitle: {
    display: 'flex',
    alignSelf: 'center',
    paddingLeft: 4
  },
  button: {
    marginLeft: 'auto'
  }
});

export const usePanelStyles = makeStyles({
  topContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10
  },
  nestableItemCustom: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    backgroundColor: theme.palette.dfoWhite.main,
    height: 55
  },
  codelistItemRoot: {
    display: 'flex',
    flexDirection: 'row',
    border: `1px solid ${theme.palette.gray500.main}`,
    marginTop: -1,
    width: '100%',
    height: 55,
    backgroundColor: theme.palette.dfoWhite.main,
    cursor: 'pointer',
    '&:hover': {
      background: theme.palette.lightBlue.main,
      color: theme.palette.dfoWhite.main
    },
    '& .MuiListItem-root': {
      padding: 0
    }
  },
  nestableItemEdited: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    backgroundColor: theme.palette.dfoWhite.main,
    height: 85
  },
  codelistItemRootEditing: {
    display: 'flex',
    flexDirection: 'row',
    border: `1px solid ${theme.palette.gray500.main}`,
    marginTop: -1,
    width: '100%',
    height: 85,
    backgroundColor: theme.palette.dfoWhite.main,
    '& .MuiListItem-root': {
      padding: 0
    }
  },
  nestableCustom: {
    '& .nestable-item': {
      margin: 0,
      border: `1px solid ${theme.palette.gray500.main}`,
      marginTop: -1
    }
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    listStyle: 'none'
  },
  editIcon: {
    display: 'flex',
    alignSelf: 'center',
    cursor: 'pointer',
    paddingRight: '8px',
    justifySelf: 'flex-end',
    marginLeft: 'auto',
    '&:hover': {
      color: theme.palette.dfoLightBlue.main
    }
  },
  handlerIcon: {
    display: 'flex',
    alignSelf: 'center',
    cursor: 'pointer',
    justifySelf: 'flex-end',
    paddingLeft: 8
  },
  arrowIcon: {
    display: 'flex',
    alignSelf: 'center',
    paddingRight: '8px',
    justifySelf: 'flex-end'
  },
  codeItem: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 25
  },
  codelistItem: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 25
  },
  codeItemDescription: {
    color: theme.palette.gray600.main
  },
  selectedItem: {
    background: theme.palette.dfoDarkBlue.main,
    color: theme.palette.dfoWhite.main
  },
  codelistItemDescription: {
    color: `${theme.palette.gray600.main}`
  }
});
