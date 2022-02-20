import { makeStyles } from '@material-ui/core';
import DFOSearchBar from '../../../components/DFOSearchBar/DFOSearchBar';
import { useAppSelector } from '../../../store/hooks';
import theme from '../../../theme';
import { Typography, Box, List } from '@mui/material/';
import { useTranslation } from 'react-i18next';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { FormProvider, useForm } from 'react-hook-form';
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
  tagListItem: {
    display: 'flex',
    backgroundColor: theme.palette.dfoWhite.main,
    borderBottom: `1px solid ${theme.palette.silver.main}`,
    height: '42px',
    cursor: 'pointer',
    '&:hover': {
      background: theme.palette.lightBlue.main,
      '& $tagListItemText': {
        color: theme.palette.dfoWhite.main
      }
    }
  },
  tagListItemCheckbox: {
    width: '40%',
    paddingRight: 10
  },
  tagListItemText: {
    color: theme.palette.gray700.main
  },
  tagListItemDescription: {
    display: 'flex',
    alignItems: 'center',
    borderLeft: `1px solid ${theme.palette.silver.main}`,
    paddingLeft: 10,
    width: '90%',
    height: '42px'
  },
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

  const defaultValues: IFormValues = {
    data: {
      dataOne: null,
      dataTwo: null
    }
  };

  const methods = useForm<IFormValues>({
    resolver: joiResolver(FormSchema),
    defaultValues
  });

  const saveValues = (data: IFormValues) => {
    console.log(data);
  };

  // This is dummy data. Replace with real data.
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

  const TagListItem = (tag: any) => {
    // ^ Using any here because we dont really know the data type yet
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(saveValues)}>
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
            <Box className={classes.tagsList}>
              <List>
                {tags.map((tag) => {
                  {
                    return <InheritedTagListItem tagListItem={tag} />;
                  }
                })}
              </List>
            </Box>
          </Box>
        </form>
      </FormProvider>
    </>
  );
}
