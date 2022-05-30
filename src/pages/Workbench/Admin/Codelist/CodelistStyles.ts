import makeStyles from '@mui/styles/makeStyles';

import theme from '../../../../theme';

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
    gap: 16,
    '& .MuiList-root': {
      padding: 0
    }
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    minHeight: 70,
    width: '100%',
    border: `1px solid ${theme.palette.gray400.main}`,
    backgroundColor: theme.palette.white.main
  },
  withHover: {
    cursor: 'pointer',
    '&:hover': {
      background: theme.palette.secondary.main,
      color: theme.palette.white.main
    }
  },
  nestableCustom: {
    width: '100%',
    '& .nestable-item': {
      margin: 0,
      paddingBottom: 8,
      '&:last-child': {
        paddingBottom: 0
      }
    }
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    minHeight: 0,
    gap: '8px',
    listStyle: 'none'
  },
  handlerIcon: {
    display: 'flex',
    alignSelf: 'center',
    cursor: 'pointer',
    justifySelf: 'flex-end',
    paddingLeft: 8,
    paddingTop: 8
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
    display: 'flex',
    paddingTop: 5,
    paddingBottom: 5,
    borderBottom: '1px solid'
  },
  textItemDescription: {
    paddingTop: 5
  },
  selectedItem: {
    background: theme.palette.primary.main,
    color: theme.palette.white.main
  }
});
