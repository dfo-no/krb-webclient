import { makeStyles } from '@material-ui/core';
import {
  DFOAccordionElementProps,
  DFOAccordionProviderProps
} from './DFOAccordionProps';
import { AccordionContext } from './AccordionContext';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import React, { SyntheticEvent, useContext, useState } from 'react';
import theme from '../../theme';

const useStyles = makeStyles({
  root: {
    borderTop: '12px solid #009FE3'
  },
  accordionBody: {
    borderTop: `2px solid ${theme.palette.gray300.main}`
  },
  expandIcon: {
    color: theme.palette.gray700.main,
    fontSize: '40px !important'
  }
});

export const DFOAccordionElement = ({
  eventKey,
  header,
  body
}: DFOAccordionElementProps): React.ReactElement => {
  const classes = useStyles();
  const { activeKey, onOpenClose } = useContext(AccordionContext);

  const handleAccordionChange =
    (key: string) =>
    (event: SyntheticEvent<Element, Event>, isExpanded: boolean) => {
      if (isExpanded) {
        onOpenClose(key);
      } else {
        onOpenClose('');
      }
    };

  return (
    <Accordion
      className={classes.root}
      expanded={eventKey === activeKey}
      onChange={handleAccordionChange(eventKey)}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon className={classes.expandIcon} />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        {header}
      </AccordionSummary>
      <AccordionDetails className={classes.accordionBody}>
        {body}
      </AccordionDetails>
    </Accordion>
  );
};

export const DFOAccordionProvider = ({
  body
}: DFOAccordionProviderProps): React.ReactElement => {
  const [activeKey, setActiveKey] = useState('');

  const onOpenClose = (e: string | string[] | null | undefined) => {
    if (typeof e === 'string') {
      setActiveKey(e);
    } else {
      setActiveKey('');
    }
  };

  return (
    <AccordionContext.Provider value={{ activeKey, onOpenClose }}>
      {body}
    </AccordionContext.Provider>
  );
};
