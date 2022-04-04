import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import 'react-nestable/dist/styles/index.css';
import { Parentable } from '../../../models/Parentable';
import { Nestable } from '../../../models/Nestable';
import {
  DFOAccordionElement,
  DFOAccordionProvider
} from '../../../components/DFOAccordion/DFOAccordion';
import NestableHierarcy from './NestableHierarcy';
import Utils from '../../../common/Utils';
import theme from '../../../theme';
import { BaseModelWithTitleAndDesc } from '../../../models/BaseModelWithTitleAndDesc';

const useStyles = makeStyles({
  nestableItemCustom: {
    cursor: 'pointer',
    backgroundColor: theme.palette.white.main,
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

interface IProps<T extends BaseModelWithTitleAndDesc> {
  dispatchfunc: (items: Parentable<T>[]) => void;
  inputlist: Nestable<T>[];
  component: React.ReactElement;
  depth: number;
}

/*
 * @deprecated
 **/
const NestableHierarcyWithAccordion = <T extends BaseModelWithTitleAndDesc>({
  dispatchfunc,
  inputlist,
  component,
  depth
}: IProps<T>): React.ReactElement => {
  const classes = useStyles();

  const renderItem = (item: Nestable<T>, handler: React.ReactNode) => {
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
        <NestableHierarcy<T>
          className={classes.nestableCustom}
          inputlist={inputlist}
          renderItem={renderItem}
          dispatchfunc={dispatchfunc}
          depth={depth}
        />
      }
    />
  );
};

export default NestableHierarcyWithAccordion;
