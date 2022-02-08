import React, { useState } from 'react';
import { useAppSelector } from '../../../store/hooks';
import CodeListSearchBar from './CodeListSearchBar';
import CodeList from './CodeList';
import { Box } from '@mui/material/';
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import theme from '../../../theme';
import NewCodeListForm from './NewCodeListForm';
import Dialog from '../../../components/DFODialog/DFODialog';
import { ICodelist } from '../../../Nexus/entities/ICodelist';
import DFOSearchBar from '../../../components/DFOSearchBar/DFOSearchBar';

const useStyles = makeStyles({
  codelistsContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 40,
    gap: 30,
    margin: 'auto',
    width: '55.5vw',
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 30
  },
  codelists: {
    width: '100%',
    alignSelf: 'center',
    [theme.breakpoints.down('sm')]: {
      width: 400
    }
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    listStyle: 'none',
    '&>:last-child': {
      '& $codeListItemChildren': {
        '&>:last-child': {
          borderBottom: '1px solid #BBBBBB'
        }
      }
    }
  },
  codeListItem: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 !important'
  },
  code: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 25,
    height: 55,
    border: '1px solid #BBBBBB',
    backgroundColor: theme.palette.dfoWhite.main,
    borderTop: 'none'
  },
  codeListItemParent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 25,
    width: '100%',
    height: 55,
    border: '1px solid #BBBBBB',
    backgroundColor: theme.palette.dfoWhite.main,
    paddingRight: 10
  },
  codeListItemChildren: {
    width: '95%',
    alignSelf: 'flex-end',

    '&>:last-child': {
      borderBottom: 'none'
    }
  },
  codeListItemParentTitle: {
    flex: 1
  },
  codeListItemParentDescription: {
    flex: 1,
    borderLeft: '1px solid #BBBBBB',
    paddingLeft: 10,
    color: '#B5B5B5',
    fontSize: 1
  },
  topContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    [theme.breakpoints.down('gg')]: {
      flexDirection: 'column',
      gap: 15
    }
  },
  searchBarContainer: {
    flex: 1,
    minWidth: 300,
    alignSelf: 'center'
  },
  addCodeButtonContainer: {
    flex: 1,
    alignSelf: 'center'
  },
  addCodeButton: {
    float: 'right',
    alignSelf: 'center'
  }
});

export default function CodeListPage(): React.ReactElement {
  const { project } = useAppSelector((state) => state.project);
  const [codelist, setCodelist] = useState<ICodelist[]>([]);
  const [show, setShow] = useState(false);

  const searchFieldCallback = (result: ICodelist[]) => {
    setCodelist(result);
  };

  const classes = useStyles();
  const { t } = useTranslation();

  const codelistSearch = (searchString: string, list: ICodelist[]) => {
    const searchResultCodelist: ICodelist[] = [];

    for (let i = 0; i < list.length; i++) {
      if (list[i].title.toLowerCase().includes(searchString.toLowerCase())) {
        searchResultCodelist.push(list[i]);
      }

      for (let j = 0; j < list[i].codes.length; j++) {
        if (
          list[i].codes[j].title
            .toLowerCase()
            .includes(searchString.toLowerCase())
        ) {
          const parent = {
            description: list[i].description,
            codes: [list[i].codes[j]],
            id: list[i].id,
            title: list[i].title,
            sourceOriginal: list[i].sourceOriginal,
            sourceRel: list[i].sourceOriginal,
            type: list[i].type
          };
          searchResultCodelist.push(parent);
        }
      }
    }
    return searchResultCodelist;
  };

  return (
    <>
      <Box className={classes.codelistsContainer}>
        <Box className={classes.topContainer}>
          <Box className={classes.searchBarContainer}>
            {' '}
            <DFOSearchBar
              list={project.codelist}
              callback={searchFieldCallback}
              searchFunction={codelistSearch}
            />
          </Box>
          <Box className={classes.addCodeButtonContainer}>
            <Button
              className={classes.addCodeButton}
              variant="primary"
              onClick={() => {
                setShow(true);
              }}
            >
              {t('add new code')}
            </Button>
          </Box>
        </Box>

        <Box className={classes.codelists}>
          <CodeList list={codelist.length > 0 ? codelist : project.codelist} />
        </Box>

        <Dialog
          title={t('add new code')}
          isOpen={show}
          handleClose={() => setShow(false)}
          children={<NewCodeListForm handleClose={() => setShow(false)} />}
        />
      </Box>
    </>
  );
}
