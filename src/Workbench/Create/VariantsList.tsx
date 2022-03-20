import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import CheckboxCtrl from '../../FormProvider/CheckboxCtrl';
import RadioCtrl from '../../FormProvider/RadioCtrl';
import VerticalTextCtrl from '../../FormProvider/VerticalTextCtrl';
import { Parentable } from '../../models/Parentable';
import { INeed } from '../../Nexus/entities/INeed';
import { IRequirement } from '../../Nexus/entities/IRequirement';
import { IVariant } from '../../Nexus/entities/IVariant';
import VariantType from '../../Nexus/entities/VariantType';
import NewQuestion from './NewQuestion';
import QuestionsList from './QuestionsList';
import { useSelectState } from './SelectContext';

interface IProps {
  needIndex: number;
  requirementIndex: number;
}

const VariantsList = ({ needIndex, requirementIndex }: IProps) => {
  const { t } = useTranslation();
  const { needIndex: needIndex2 } = useSelectState();

  const { register } = useFormContext();
  const { fields, append, remove } = useFieldArray<IRequirement>({
    name: `variants`
  });

  const appendVariant = () => {
    const newVariant: IVariant = {
      id: uuidv4(),
      requirementText: 'requirementText',
      instruction: 'instruction',
      useProduct: false,
      useSpesification: false,
      useQualification: false,
      products: [],
      questions: [],
      type: VariantType.requirement,
      description: ''
    };
    append(newVariant);
  };

  return (
    <Box>
      <Button onClick={() => appendVariant()}>Add Variant</Button>
      {fields.map((field, index) => {
        return (
          <Accordion key={field.id}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              {/*  {item?.description ? item.description : ''} */}
              {/*  <TextCtrl
                name={`requirements.${index}.variants.${index}.title`}
                label="Foo"
              /> */}
              <VerticalTextCtrl
                key={field.id} // important to include key with field's id
                name={`variants.${index}.requirementText`}
                label="requirementText"
                placeholder=""
              />
              <VerticalTextCtrl
                name={`variants.${index}.instruction`}
                label="instruction"
                placeholder=""
              />
              <Box sx={{ flex: '1 1 auto' }} />
              <Tooltip title="Slett variant">
                <DeleteIcon
                  color="warning"
                  sx={{ mr: 1 }}
                  onClick={() => remove(index)}
                />
              </Tooltip>
            </AccordionSummary>

            {/* <AccordionDetails
              sx={{ bgcolor: 'common.white', border: '1px solid black' }}
            >
              <TextCtrl
                label="Krav tekst"
                name={
                  `requirements.${requirementIndex}.variants.${index}.requirementText` as const
                }
              />
              <TextCtrl
                label="Instruksjon tekst"
                name={
                  `requirements.${requirementIndex}.variants.${index}.instruction` as const
                }
              />
              <RadioCtrl
                name={
                  `requirements.${requirementIndex}.variants.${index}.type` as const
                }
                label="Type"
                options={[
                  { value: VariantType.requirement, label: 'Krav' },
                  { value: VariantType.info, label: 'Info' }
                ]}
              />
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

              <NewQuestion index={index} />
              <QuestionsList index={index} />
            </AccordionDetails> */}
          </Accordion>
        );
      })}
    </Box>
  );
};

export default VariantsList;
