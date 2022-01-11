import { DevTool } from '@hookform/devtools';
import { joiResolver } from '@hookform/resolvers/joi';
import Paper from '@mui/material/Paper';
import Joi from 'joi';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import ErrorSummary from './Form/ErrorSummary';
import CheckboxCtrl from './FormProvider/CheckboxCtrl';
import CodelistCtrl from './FormProvider/CodelistCtrl';
import DateCtrl from './FormProvider/DateCtrl';
import SliderCtrl from './FormProvider/SliderCtrl';
import SwitchCtrl from './FormProvider/SwitchCtrl';
import TextCtrl from './FormProvider/TextCtrl';
import ModelType from './models/ModelType';
import { CodelistSchema, ICodelist } from './Nexus/entities/ICodelist';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

interface IFormValues {
  person: {
    firstName: string | null;
    lastName: string | null;
    birthDay: string | null;
    weddingDay?: string | null;
    isDeveloper?: boolean;
    range: number;
    isSexy: boolean;
    codelist: ICodelist | null;
  };
}

const FormSchema = Joi.object().keys({
  person: Joi.object().keys({
    firstName: Joi.string().max(20).required(),
    lastName: Joi.string().min(5).max(20).required(),
    birthDay: Joi.date().iso().raw().required(),
    weddingDay: Joi.alternatives([
      Joi.date().iso().max('12/13/2021').raw(),
      Joi.string().valid(null)
    ]).required(),
    point: Joi.number().required(),
    isDeveloper: Joi.boolean().valid(true).required(),
    range: Joi.number().min(20).max(100).required(),
    isSexy: Joi.boolean().valid(true).required(),
    codelist: CodelistSchema
  })
});

const KitchenSink = (): React.ReactElement => {
  // useConfirmTabClose();

  const codelists = [
    {
      id: '012345678901234567890123456789123456',
      title: 'A',
      description: 'A',
      codes: [],
      sourceOriginal: 'dfgdfgdfgdf',
      sourceRel: null,
      type: ModelType.codelist
    },
    {
      id: '012345678901234567890123456789123457',
      title: 'B',
      description: 'B',
      codes: [],
      sourceOriginal: 'dfgfgdfgd',
      sourceRel: null,
      type: ModelType.codelist
    }
  ];

  const defaultValues = {
    person: {
      firstName: null,
      lastName: null,
      birthDay: null,
      weddingDay: '2021/12/14T14:00:00.123Z',
      point: 50,
      isDeveloper: true,
      range: 20,
      isSexy: true,
      codelist: null
    }
  };

  const methods = useForm<IFormValues>({
    resolver: joiResolver(FormSchema),
    defaultValues
  });

  const saveValues = (data: IFormValues) => {
    console.log(data.person);
  };

  return (
    <Box
      sx={{
        padding: '20px',
        paddingBottom: '200px'
      }}
    >
      <Paper
        elevation={3}
        variant="elevation"
        sx={{
          width: '600px',
          height: '90vh',
          padding: '20px',
          margin: 'auto'
        }}
      >
        {/* <pre>{JSON.stringify(defaultValues, null, 2)}</pre> */}
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(saveValues)}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                justifyContent: 'center'
              }}
            >
              <TextCtrl
                name="person.firstName"
                control={methods.control}
                label="First name"
              />
              <TextCtrl
                name="person.lastName"
                control={methods.control}
                label="Last name"
              />
              <DateCtrl name="person.birthDay" label="birthDay" />
              <DateCtrl name="person.weddingDay" label="weddingDay" />
              <SwitchCtrl label="isDeveloper" name="person.isDeveloper" />
              <SliderCtrl
                name="person.range"
                min={0}
                max={100}
                step={5}
                unit="Marsipan"
                marks={[]}
              />
              <CheckboxCtrl name="person.isSexy" label="isSexy" />
              <CodelistCtrl
                name="person.codelist"
                codelists={codelists}
                label="Codelist"
              />
              <br />
              <Button
                type="submit"
                sx={{ marginTop: '10px', height: '40px' }}
                variant="primary"
              >
                Save
              </Button>
            </Box>
          </form>
          <Box sx={{ marginTop: '50px' }}>
            <DevTool control={methods.control} />
            <ErrorSummary errors={methods.formState.errors} />
          </Box>
        </FormProvider>
      </Paper>
    </Box>
  );
};

export default KitchenSink;
