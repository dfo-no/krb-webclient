import React from 'react';
import { Controller } from 'react-hook-form';
import { List, ListItem, Typography, Box } from '@mui/material';

import css from '../../pages/Response/Answer/QuestionAnswer/Selection.module.scss';
import { DFOCheckbox } from '../DFOCheckbox/DFOCheckbox';
import { ICode } from '../../Nexus/entities/ICode';
import { ICodelist } from '../../Nexus/entities/ICodelist';
import { ScrollableContainer } from '../ScrollableContainer/ScrollableContainer';

interface IProps {
  name: string;
  codelist?: ICodelist;
}

const CodeSelection = ({ name, codelist }: IProps): React.ReactElement => {
  const codes = codelist ? codelist.codes : [];
  const onClick = (
    item: ICode,
    selected: string[],
    onChange: (value: string[]) => void
  ): void => {
    if (selected.some((elem) => elem === item.id)) {
      const selectedUpdated = [...selected];
      const index = selectedUpdated.findIndex((elem) => elem === item.id);
      if (index !== -1) {
        selectedUpdated.splice(index, 1);
      }
      onChange(selectedUpdated);
    } else {
      onChange([...selected, item.id]);
    }
  };

  const codeChecked = (item: ICode, selected: string[]): boolean => {
    return selected.some((elem) => elem === item.id);
  };

  return (
    <Controller
      render={({ field: { value: selected, onChange } }) => (
        <ScrollableContainer className={css.Selection}>
          <List>
            {codes.map((item) => {
              return (
                <ListItem
                  key={item.id}
                  className={css.listItem}
                  onClick={() => onClick(item, selected, onChange)}
                >
                  <Box className={css.checkbox}>
                    <DFOCheckbox checked={codeChecked(item, selected)} />
                  </Box>
                  <Typography className={css.itemTitle}>
                    {item.title}
                  </Typography>
                  <Typography className={css.itemDescription} variant={'sm'}>
                    {item.description}
                  </Typography>
                </ListItem>
              );
            })}
          </List>
        </ScrollableContainer>
      )}
      name={name}
    />
  );
};

export default CodeSelection;
