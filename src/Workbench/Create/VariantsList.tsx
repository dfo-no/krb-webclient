import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useFieldArray } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import CheckboxCtrl from '../../FormProvider/CheckboxCtrl';
import TextCtrl from '../../FormProvider/TextCtrl';
import { IRequirement } from '../../Nexus/entities/IRequirement';
import { IVariant } from '../../Nexus/entities/IVariant';
import {
  DFOAccordionElement,
  DFOAccordionProvider
} from '../../components/DFOAccordion/DFOAccordion';
import theme from '../../theme';
import DeleteIcon from '@mui/icons-material/Delete';
import { FormIconButton } from '../Components/Form/FormIconButton';

interface IProps {
  requirement: IRequirement;
}

const VariantsList = ({ requirement }: IProps) => {
  const { t } = useTranslation();
  /*
  const { fields, append } = useFieldArray<IRequirement, 'variants', 'id'>({
    name: 'variants'
  });

  const appendVariant = () => {
    const newVariant: IVariant = {
      id: uuidv4(),
      requirementText: '',
      instruction: '',
      useProduct: false,
      useSpesification: false,
      useQualification: false,
      products: [],
      questions: []
    };
    append(newVariant);
  };*/

  const renderAccordianHeader = (variant: IVariant) => {
    return (
      <Box sx={{ display: 'flex' }}>
        <Typography variant={'smallBold'}>{variant.requirementText}</Typography>
        <FormIconButton
          hoverColor={theme.palette.dfoErrorRed.main}
          onClick={() => {}}
        >
          <DeleteIcon />
        </FormIconButton>
      </Box>
    );
  };

  const renderAccordianBody = (variant: IVariant) => {
    return <Box></Box>;
  };

  const renderList = () => {
    return (
      <Box>
        {requirement.variants.map((item, index) => (
          <DFOAccordionElement
            eventKey={item.id}
            header={renderAccordianHeader(item)}
            body={renderAccordianBody(item)}
          />
        ))}
      </Box>
    );
  };

  return (
    <Box>
      <DFOAccordionProvider body={renderList()} />
    </Box>
  );

  /*
      {fields.map((item, index) => {
        return (
          <Accordion key={item.id}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{item.requirementText}</Typography>
            </AccordionSummary>

            <AccordionDetails
              sx={{ bgcolor: 'common.white', border: '1px solid black' }}
            >
              <CheckboxCtrl
                name={`variants.${index}.useProduct` as const}
                label="Produkt"
              />
              <CheckboxCtrl
                name={`variants.${index}.useQualification`}
                label="Kvalifisering"
              />
              <CheckboxCtrl
                name={`variants.${index}.useSpesification` as const}
                label="Spesifikasjon"
              />
              <br />
              <TextCtrl
                label="Requirement text"
                name={`variants.${index}.requirementText` as const}
              />
              <TextCtrl
                label="Requirement text"
                name={`variants.${index}.instruction` as const}
              />
            </AccordionDetails>
          </Accordion>
        );
      })}
      <Button variant="primary" sx={{ m: 1 }} onClick={() => appendVariant()}>
        {t('Add Variant')}
      </Button>
      <Button variant="warning" type="submit">
        Save
      </Button>
    </Box>
  );*/
};

export default VariantsList;
