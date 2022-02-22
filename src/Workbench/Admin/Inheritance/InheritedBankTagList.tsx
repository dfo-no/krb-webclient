import { makeStyles } from '@material-ui/core';
import DFOSearchBar from '../../../components/DFOSearchBar/DFOSearchBar';
import { useAppSelector } from '../../../store/hooks';
import theme from '../../../theme';
import { Typography, Box, List } from '@mui/material/';
import { useTranslation } from 'react-i18next';
import Joi from 'joi';
import InheritedTagListItem from './InheritanceTagListItem';

interface IFormValues {
  data: {
    dataOne: string | null;
    dataTwo: string | null;
  };
}

const FormSchema = Joi.object().keys({
  data: Joi.object().keys({
    dataOne: Joi.string().max(20).required(),
    dataTwo: Joi.number().required()
  })
});

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

export default function InheritedBankTagList(): React.ReactElement {
  const { project } = useAppSelector((state) => state.project);
  const classes = useStyles();
  const { t } = useTranslation();

  const tagsCallback = () => {};
  const tagsSearchFunction = () => {};

  // TODO: This is dummy data. Replace with real data.
  const tags = [
    { title: 'Merkelapp 1', description: 'Merkelapp beskrivelse' },
    { title: 'Merkelapp 2', description: 'Merkelapp beskrivelse' },
    { title: 'Merkelapp 3', description: 'Merkelapp beskrivelse' },
    { title: 'Merkelapp 4', description: 'Merkelapp beskrivelse' },
    { title: 'Merkelapp 5', description: 'Merkelapp beskrivelse' },
    { title: 'Merkelapp 6', description: 'Merkelapp beskrivelse' },
    { title: 'Merkelapp 7', description: 'Merkelapp beskrivelse' },
    { title: 'Merkelapp 8', description: 'Merkelapp beskrivelse' },
    { title: 'Merkelapp 9', description: 'Merkelapp beskrivelse' },
    { title: 'Merkelapp 10', description: 'Merkelapp beskrivelse' },
    { title: 'Merkelapp 11', description: 'Merkelapp beskrivelse' },
    { title: 'Merkelapp 12', description: 'Merkelapp beskrivelse' }
  ];

  const renderList = () => {
    return (
      <List>
        {tags.map((tag: any, index: number) => {
          {
            return <InheritedTagListItem tagListItem={tag} key={index} />;
          }
        })}
      </List>
    );
  };

  return (
    <>
      <Box className={classes.inheritanceTagList}>
        <Box className={classes.topContainer}>
          <Box className={classes.searchContainer}>
            <DFOSearchBar
              label={t('search for tags')}
              list={project.tags}
              searchFunction={tagsSearchFunction}
              callback={tagsCallback}
            />
          </Box>
          <Typography variant="smallUnderline">
            {t('show selected tags')}
          </Typography>
        </Box>
        <Box className={classes.tagsList}>{renderList()}</Box>
      </Box>
    </>
  );
}
