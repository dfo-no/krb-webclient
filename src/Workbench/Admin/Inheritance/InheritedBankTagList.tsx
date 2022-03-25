import DFOSearchBar from '../../../components/DFOSearchBar/DFOSearchBar';
import { useAppSelector } from '../../../store/hooks';
import theme from '../../../theme';
import { Typography, Box, List } from '@mui/material/';
import { useTranslation } from 'react-i18next';
import InheritedTagListItem from './InheritanceTagListItem';
import makeStyles from '@mui/styles/makeStyles';
import { IInheritedBank } from '../../../models/IInheritedBank';
import { useGetAllBanksQuery } from '../../../store/api/bankApi';
import React from 'react';
import { ITag } from '../../../Nexus/entities/ITag';

export interface IProps {
  bank: IInheritedBank;
}

const useStyles = makeStyles({
  inheritanceTagList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    margin: 'auto',
    border: `2px solid ${theme.palette.dfoBlue.main}`,
    backgroundColor: theme.palette.gray200.main,
    width: '50vw',
    padding: 30
  },
  topContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  searchContainer: {
    width: '25vw'
  },
  tagsList: {
    border: `1px solid ${theme.palette.silver.main}`,
    '&:last-child': {
      borderBottom: 'none'
    },
    '& .MuiList-root': {
      paddingTop: 0,
      paddingBottom: 0
    }
  }
});

export default function InheritedBankTagList({
  bank
}: IProps): React.ReactElement {
  const { project } = useAppSelector((state) => state.project);
  const classes = useStyles();
  const { t } = useTranslation();
  const { data: banks } = useGetAllBanksQuery();
  const tags: ITag[] = banks ? banks[bank.id].tags : [];

  if (!banks) {
    return <></>;
  }

  const tagsCallback = () => {};
  const tagsSearchFunction = () => {};

  const renderList = () => {
    return (
      <List>
        {tags.map((tag: ITag, index: number) => {
          {
            return <InheritedTagListItem tagListItem={tag} key={index} />;
          }
        })}
      </List>
    );
  };

  return tags.length > 0 ? (
    <>
      <Box className={classes.inheritanceTagList}>
        <Box className={classes.topContainer}>
          <Box className={classes.searchContainer}>
            <DFOSearchBar
              placeholder={t('search for tags')}
              list={project.tags}
              searchFunction={tagsSearchFunction}
              callback={tagsCallback}
            />
          </Box>
          <Typography>{t('show selected tags')}</Typography>
        </Box>
        <Box className={classes.tagsList}>{renderList()}</Box>
      </Box>
    </>
  ) : (
    <div></div>
  );
}
