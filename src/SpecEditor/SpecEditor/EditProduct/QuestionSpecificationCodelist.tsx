import { useState } from 'react';
import {
  Autocomplete,
  Box,
  Divider,
  List,
  ListItem,
  TextField,
  Typography
} from '@mui/material';
import { DFOCheckbox } from '../../../components/DFOCheckbox/DFOCheckbox';
import VerticalTextCtrl from '../../../FormProvider/VerticalTextCtrl';
import { ICodelistQuestion } from '../../../Nexus/entities/ICodelistQuestion';
import { Controller, useFormContext } from 'react-hook-form';
import { useAppSelector } from '../../../store/hooks';
import { ICodelist } from '../../../Nexus/entities/ICodelist';
import DeleteIcon from '@mui/icons-material/Delete';
import { t } from 'i18next';
import { FormIconButton } from '../../../Workbench/Components/Form/FormIconButton';
import theme from '../../../theme';
import { IRequirementAnswer } from '../../../models/IRequirementAnswer';

interface IProps {
  item: ICodelistQuestion;
}

interface ILabel {
  label: string;
  value: string;
}

const QuestionSpecificationCodelist = ({ item }: IProps) => {
  const { spec } = useAppSelector((state) => state.specification);
  const { control } = useFormContext<IRequirementAnswer>();
  const codelist = spec.bank.codelist.find((cl: ICodelist) => {
    return cl.id === item.config.codelist;
  });

  const [optionalCodes, setOptionalCodes] = useState(false);

  if (!codelist) return <></>;

  const displayList: ILabel[] = [];
  Object.values(codelist.codes).forEach((code, i) => {
    displayList[i] = { label: code.title, value: code.id };
  });

  const uniqueValuesSet = new Set();
  const filteredArr: ILabel[] = displayList.filter((obj) => {
    const isPresentInSet = uniqueValuesSet.has(obj.label);
    return !isPresentInSet;
  });

  const findSelectedIdTitle = (id: string) => {
    const selectedCodelist = filteredArr.find((obj) => {
      return obj.value === id;
    });

    if (selectedCodelist) return selectedCodelist.label;
  };

  const onClick = (
    code: ILabel,
    selected: string[],
    onChange: (value: string[]) => void
  ) => {
    if (!selected.some((elem) => elem === code.value)) {
      uniqueValuesSet.add(code.label);
      onChange([...selected, code.value]);
    }
  };

  const onDelete = (
    delItem: any,
    selected: string[],
    onChange: (value: string[]) => void
  ) => {
    const selectedUpdated = [...selected];
    const index = selectedUpdated.findIndex((elem) => elem === delItem.id);
    selectedUpdated.splice(index, 1);
    onChange(selectedUpdated);
  };

  return (
    <Box>
      <Box>
        <Box>
          <DFOCheckbox
            value={optionalCodes}
            onClick={() => setOptionalCodes((prev) => !prev)}
          />
          <Typography variant={'smBold'} sx={{ marginBottom: 2 }}>
            Valgfrie koder
          </Typography>
        </Box>
        {optionalCodes && (
          <Box>
            <VerticalTextCtrl
              name={'question.config.optionalCodeMinAmount'}
              label="Minimum"
              placeholder={''}
              type={'number'}
            />
            <VerticalTextCtrl
              name={'question.config.optionalCodeMaxAmount'}
              label="Maksimum"
              placeholder={''}
              type={'number'}
            />
            <Controller
              render={({ field: { value: selected, onChange } }) => (
                <Box>
                  <Autocomplete
                    options={filteredArr}
                    onChange={(event, newValue) => {
                      if (newValue) {
                        onClick(newValue, selected, onChange);
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder={t('Skriv inn kode')}
                      />
                    )}
                  />

                  <List>
                    {selected.map((selectedItem: string) => {
                      return (
                        <ListItem
                          key={selectedItem}
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
                              {findSelectedIdTitle(selectedItem)}
                            </Typography>
                            <FormIconButton
                              hoverColor={theme.palette.errorRed.main}
                              onClick={() =>
                                onDelete(selectedItem, selected, onChange)
                              }
                              sx={{
                                cursor: 'pointer',
                                marginLeft: 'auto'
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
              name="question.config.optionalCodes"
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default QuestionSpecificationCodelist;
