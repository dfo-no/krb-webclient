import React from 'react';
import Grid from '@mui/material/Grid';
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
  const { onChange } = NestableHierarcy(dispatchfunc);

  const renderItem = (item: Item, handler: React.ReactNode) => {
    return (
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
    );
  };

  return (
    <DFOAccordionProvider
      body={
        <Nestable
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
