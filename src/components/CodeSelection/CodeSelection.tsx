import React from 'react';
import { Controller } from 'react-hook-form';
import { List, ListItem, Typography, Box } from '@mui/material';

import css from './Selection.module.scss';
import { DFOCheckbox } from '../DFOCheckbox/DFOCheckbox';
import { ICode } from '../../Nexus/entities/ICode';
import { ICodeSelection } from '../../Nexus/entities/ICodelistQuestion';
import { ScrollableContainer } from '../ScrollableContainer/ScrollableContainer';
import { Parentable } from '../../models/Parentable';

interface IProps {
  name: string;
  codesList: Parentable<ICode>[];
  codeSelection?: ICodeSelection[];
}

const CodeSelection = ({
  name,
  codesList,
  codeSelection
}: IProps): React.ReactElement => {
  const sortCodes = (codesToBeSorted: ICode[]): ICode[] => {
    return [...codesToBeSorted].sort((a, b) => {
      const aSelection = codeSelection?.find((cs) => cs.code === a.id);
      const bSelection = codeSelection?.find((cs) => cs.code === b.id);
      if (!aSelection) {
        return 1;
      }
      if (!bSelection) {
        return -1;
      }
      if (aSelection.mandatory !== bSelection.mandatory) {
        return +bSelection.mandatory - +aSelection.mandatory;
      }
      return bSelection.score - aSelection.score;
    });
  };

  const codes = codeSelection ? sortCodes(codesList) : codesList;

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

  const codeMandatory = (item: ICode): boolean => {
    const selection = codeSelection?.find((cs) => cs.code === item.id);
    return selection ? selection.mandatory : false;
  };

  return (
    <Controller
      render={({ field: { value: selected = [], onChange } }) => (
        <ScrollableContainer className={css.Selection}>
          <List>
            {codes?.map((item) => {
              return (
                <ListItem
                  key={item.id}
                  className={css.listItem}
                  onClick={() => onClick(item, selected, onChange)}
                >
                  <Box className={css.checkbox}>
                    <DFOCheckbox checked={codeChecked(item, selected)} />
                  </Box>
                  {codeMandatory(item) ? (
                    <Typography variant={'smBold'} className={css.itemTitle}>
                      {item.title}
                    </Typography>
                  ) : (
                    <Typography variant={'sm'} className={css.itemTitle}>
                      {item.title}
                    </Typography>
                  )}
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
