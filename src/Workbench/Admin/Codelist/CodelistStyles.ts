import makeStyles from '@mui/styles/makeStyles';
import theme from '../../../theme';

export const useFormStyles = makeStyles({
  formItem: {
    display: 'flex',
    flexDirection: 'row'
  },
  inputBox: {
    alignSelf: 'center'
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
    flexGrow: 1,
    minHeight: 0,
    gap: 8
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    minHeight: 70,
    width: '100%',
    marginBottom: 8,
    border: `1px solid ${theme.palette.gray500.main}`,
    backgroundColor: theme.palette.dfoWhite.main
  },
  withHover: {
    cursor: 'pointer',
    '&:hover': {
      background: theme.palette.lightBlue.main,
      color: theme.palette.dfoWhite.main
    }
  },
  nestableCustom: {
    '& .nestable-item': {
      margin: 0
    }
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    minHeight: 0,
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
  textItem: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 25,
    paddingRight: 15
  },
  textItemTitle: {
    flexGrow: 1,
    height: 30,
    paddingTop: 5,
    borderBottom: '1px solid'
  },
  textItemDescription: {
    flexGrow: 1,
    height: 30,
    paddingTop: 5
  },
  selectedItem: {
    background: theme.palette.dfoDarkBlue.main,
    color: theme.palette.dfoWhite.main
  }
});
