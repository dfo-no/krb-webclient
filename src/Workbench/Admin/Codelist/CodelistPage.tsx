import React, { useState } from 'react';
import { useAppSelector } from '../../../store/hooks';
import { useTranslation } from 'react-i18next';
import theme from '../../../theme';
import Dialog from '../../../components/DFODialog/DFODialog';
import DFOSearchBar from '../../../components/DFOSearchBar/DFOSearchBar';
import CodeList from './CodeList';
import { ICodelist } from '../../../Nexus/entities/ICodelist';
import NewCodeListForm from './NewCodeListForm';
import { Box, Button } from '@mui/material/';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  codelistsContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 40,
    gap: 30,
    margin: 'auto',
    width: '55.5vw',
    paddingBottom: 40
  },
  topContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    [theme.breakpoints.down('mddd')]: {
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
  },
  codelists: {
    width: '100%',
    alignSelf: 'center',
    height: '100vh',
    [theme.breakpoints.down('sm')]: {
      width: 400
    }
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
          searchResultCodelist.push({
            description: list[i].description,
            codes: [list[i].codes[j]],
            id: list[i].id,
            title: list[i].title,
            sourceOriginal: list[i].sourceOriginal,
            sourceRel: list[i].sourceOriginal,
            type: list[i].type
          });
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
