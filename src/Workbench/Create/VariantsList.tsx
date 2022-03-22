import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import CheckboxCtrl from '../../FormProvider/CheckboxCtrl';
import RadioCtrl from '../../FormProvider/RadioCtrl';
import VerticalTextCtrl from '../../FormProvider/VerticalTextCtrl';
import { IBank } from '../../Nexus/entities/IBank';
import { IRequirement } from '../../Nexus/entities/IRequirement';
import { IVariant } from '../../Nexus/entities/IVariant';
import VariantType from '../../Nexus/entities/VariantType';
import QuestionsList from './QuestionsList';

interface IProps {
  project: IBank;
  needIndex: number;
  requirementIndex: number;
}

const VariantsList = ({ project }: IProps) => {
  const { getValues } = useFormContext();
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
      {fields.map((field, index) => {
        return (
          <Accordion key={field.id}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>
                {getValues(`variants.${index}.requirementText`)}
              </Typography>
              <Box sx={{ flex: '1 1 auto' }} />
              <Tooltip title="Slett variant">
                <DeleteIcon
                  color="warning"
                  sx={{ mr: 1 }}
                  onClick={() => remove(index)}
                />
              </Tooltip>
            </AccordionSummary>
            <AccordionDetails>
              <Divider />
              <VerticalTextCtrl
                name={`variants.${index}.requirementText`}
                label="Kravtekst"
                placeholder=""
              />
              <VerticalTextCtrl
                name={`variants.${index}.instruction`}
                label="Instruksjon"
                placeholder=""
              />
              <VerticalTextCtrl
                name={`variants.${index}.description`}
                label="Beskrivelse"
                placeholder=""
              />
              <RadioCtrl
                name="type"
                label="Type"
                options={[
                  { value: VariantType.requirement, label: 'Krav' },
                  { value: VariantType.info, label: 'Info' }
                ]}
              />
              <div style={{ width: '100%' }}>
                <CheckboxCtrl
                  name={`variants.${index}.useProduct` as const}
                  label="Produkt"
                />
                {/* <CheckboxCtrl
                  name={`variants.${index}.useQualification`}
                  label="Kvalifisering"
                /> */}
                <CheckboxCtrl
                  name={`variants.${index}.useSpesification` as const}
                  label="Generellt krav (kravspesifikasjon)"
                />

                <Controller
                  render={({ field: field2 }) => (
                    <Select {...field2} multiple>
                      {project.products.map((p) => (
                        <MenuItem key={p.id} value={p.id}>
                          {p.title}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                  name={`variants.${index}.products`}
                />
              </div>
              <QuestionsList index={index} />
            </AccordionDetails>
          </Accordion>
        );
      })}
      <Button
        variant="contained"
        color="warning"
        onClick={() => appendVariant()}
      >
        Add Variant
      </Button>
    </Box>
  );
};

export default VariantsList;
