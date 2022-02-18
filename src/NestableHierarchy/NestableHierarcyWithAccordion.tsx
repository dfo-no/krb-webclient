import React from 'react';
import { makeStyles } from '@material-ui/core';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import Nestable, { Item } from 'react-nestable';
import 'react-nestable/dist/styles/index.css';
import { Parentable } from '../models/Parentable';
import { Nestable as NestableModel } from '../models/Nestable';
import { IBaseModel } from '../Nexus/entities/IBaseModel';
import {
  DFOAccordionElement,
  DFOAccordionProvider
} from '../components/DFOAccordion/DFOAccordion';
import NestableHierarcy from './NestableHierarcy';
import Utils from '../common/Utils';
import theme from '../theme';

const useStyles = makeStyles({
  nestableItemCustom: {
    cursor: 'pointer',
    backgroundColor: theme.palette.dfoWhite.main,
    verticalAlign: 'middle'
  },
  nestableCustom: {
    '& .nestable-item': {
      marginTop: '16px',
      '& .nestable-item-name': {
        borderTop: `1px solid ${theme.palette.gray500.main}`,
        borderBottom: `1px solid ${theme.palette.gray500.main}`
      }
    },
    '& .nestable-list > .nestable-item > .nestable-list': {
      margin: '0',
      '& .nestable-item': {
        margin: '0',
        '& .nestable-item-name': {
          marginTop: '-1px'
        }
      }
    },
    width: '100%'
  }
});

interface IProps<T extends IBaseModel> {
  dispatchfunc: (item: Parentable<T>, index: number) => void;
  inputlist: NestableModel<T>[];
  component: React.ReactElement;
  depth: number;
}

const NestableHierarcyWithAccordion = <T extends IBaseModel>({
  dispatchfunc,
  inputlist,
  component,
  depth
}: IProps<T>): React.ReactElement => {
  const classes = useStyles();
  const { onChange } = NestableHierarcy(dispatchfunc);

  const renderItem = (item: Item, handler: React.ReactNode) => {
    return (
      <Box className={classes.nestableItemCustom}>
        <DFOAccordionElement
          key={item.id}
          eventKey={item.id}
          header={
            <Grid container spacing={2}>
              <Grid item xs={1}>
                {handler}
              </Grid>
              <Grid item xs={11}>
                {Utils.capitalizeFirstLetter(item.title)}
              </Grid>
            </Grid>
          }
          body={
            <div>
              {item.sourceRel === null &&
                React.cloneElement(component, { element: item })}
              {item.sourceRel !== null && (
                <>
                  <p>{item?.description}</p>
                  <p>This item is inherited and readonly </p>
                </>
              )}
            </div>
          }
        />
      </Box>
    );
  };

  return (
    <DFOAccordionProvider
      body={
        <Nestable
          className={classes.nestableCustom}
          items={inputlist}
          renderItem={({ item, handler }) => renderItem(item, handler)}
          onChange={(items) => onChange(items)}
          maxDepth={depth}
          handler={<DragIndicatorIcon />}
        />
      }
    />
  );
};

export default NestableHierarcyWithAccordion;
