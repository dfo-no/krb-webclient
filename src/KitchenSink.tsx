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
import FileUploadCtrl from './FormProvider/FileUploadCtrl';
import SliderCtrl from './FormProvider/SliderCtrl';
import SwitchCtrl from './FormProvider/SwitchCtrl';
import TextCtrl from './FormProvider/TextCtrl';
import ModelType from './models/ModelType';
import { CodelistSchema, ICodelist } from './Nexus/entities/ICodelist';

interface IFormValues {
  person: {
    birthDay: string | null;
    weddingDay?: string | null;
    isDeveloper?: boolean;
    range: number;
    name: string;
    isSexy: boolean;
    codelist: ICodelist | null;
    fileEndings: string[];
  };
}

const FormSchema = Joi.object().keys({
  person: Joi.object().keys({
    birthDay: Joi.date().iso().raw().required(),
    weddingDay: Joi.alternatives([
      Joi.date().iso().max('12/13/2021').raw(),
      Joi.string().valid(null)
    ]).required(),
    point: Joi.number().required(),
    isDeveloper: Joi.boolean().valid(true).required(),
    range: Joi.number().min(20).max(100).required(),
    name: Joi.string().min(5).max(20).required(),
    isSexy: Joi.boolean().valid(true).required(),
    codelist: CodelistSchema,
    fileEndings: Joi.array().items(Joi.string()).min(1).required()
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
      birthDay: null,
      weddingDay: '2021/12/14T14:00:00.123Z',
      point: 50,
      isDeveloper: true,
      range: 20,
      name: 'Bobbo',
      isSexy: true,
      codelist: null,
      fileEndings: ['doc']
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
    <Paper
      elevation={3}
      variant="elevation"
      sx={{ width: '600px', marginTop: '1rem', height: '800px' }}
    >
      {/* <pre>{JSON.stringify(defaultValues, null, 2)}</pre> */}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(saveValues)}>
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
          <TextCtrl name="person.name" label="Name" />
          <CheckboxCtrl name="person.isSexy" label="isSexy" />
          <CodelistCtrl
            name="person.codelist"
            codelists={codelists}
            label="Codelist"
          />
          <FileUploadCtrl name="person.fileEndings" />
          <br />
          <button type="submit">Save</button>
        </form>
        <DevTool control={methods.control} />
        <ErrorSummary errors={methods.formState.errors} />
      </FormProvider>
    </Paper>
  );
};

export default KitchenSink;
