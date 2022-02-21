import makeStyles from '@mui/styles/makeStyles';
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
    '& .Mui-expanded': {
      backgroundColor: theme.palette.dfoLightBlue.main,
      color: theme.palette.dfoWhite.main
    }
  },
  accordionBody: {
    backgroundColor: theme.palette.gray100.main
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
        expandIcon={<ExpandMoreIcon />}
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
