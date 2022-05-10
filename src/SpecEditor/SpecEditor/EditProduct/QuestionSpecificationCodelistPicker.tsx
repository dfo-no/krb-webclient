import {
  Autocomplete,
  Box,
  Divider,
  List,
  ListItem,
  TextField,
  Typography
} from '@mui/material';
import { Controller } from 'react-hook-form';
import { FormIconButton } from '../../../Workbench/Components/Form/FormIconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { t } from 'i18next';
import theme from '../../../theme';

interface IProps {
  codes: ILabel[];
  name: string;
}

interface ILabel {
  label: string;
  value: string;
}

const QuestionSpecificationCodelistPicker = ({ codes, name }: IProps) => {
  const uniqueValuesSet = new Set();

  const pickCode = (
    code: ILabel,
    selected: string[],
    onChange: (value: string[]) => void
  ) => {
    if (!selected.some((elem) => elem === code.value)) {
      uniqueValuesSet.add(code.label);
      onChange([...selected, code.value]);
    }
  };

  const findSelectedIdTitle = (codeId: string) => {
    const selectedCodelist = codes.find((obj: ILabel) => {
      return obj.value === codeId;
    });

    if (selectedCodelist) return selectedCodelist.label;
  };

  const deleteCode = (
    itemId: string,
    selected: string[],
    onChange: (value: string[]) => void
  ) => {
    const selectedUpdated = [...selected];
    const index = selectedUpdated.findIndex((elem) => elem === itemId);
    selectedUpdated.splice(index, 1);
    onChange(selectedUpdated);
  };

  return (
    <Box>
      <Controller
        render={({ field: { value: selected, onChange } }) => (
          <Box
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  border: `2px solid ${theme.palette.primary.main}`
                },
                '&.Mui-focused fieldset': {
                  border: `3px solid ${theme.palette.primary.main}`
                },
                '&:hover fieldset': {
                  border: `3px solid ${theme.palette.primary.main}`
                }
              }
            }}
          >
            <Autocomplete
              options={codes}
              onChange={(event, newValue: ILabel | null) => {
                if (newValue) {
                  pickCode(newValue, selected, onChange);
                }
              }}
              renderInput={(params) => (
                <TextField {...params} placeholder={t('Enter code')} />
              )}
            />
            <List>
              {selected.map((selectedCodeId: string) => {
                return (
                  <ListItem
                    key={selectedCodeId}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      padding: 0
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        width: '90%',
                        padding: 2
                      }}
                    >
                      <Typography>
                        {findSelectedIdTitle(selectedCodeId)}
                      </Typography>
                      <FormIconButton
                        hoverColor={theme.palette.errorRed.main}
                        onClick={() =>
                          deleteCode(selectedCodeId, selected, onChange)
                        }
                        sx={{
                          cursor: 'pointer',
                          marginLeft: 'auto',
                          color: theme.palette.primary.main
                        }}
                      >
                        <DeleteIcon />
                      </FormIconButton>
                    </Box>
                    <Divider style={{ width: '90%' }} />
                  </ListItem>
                );
              })}
            </List>
          </Box>
        )}
        name={name}
      />
    </Box>
  );
};

export default QuestionSpecificationCodelistPicker;
