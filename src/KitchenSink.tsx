import { DevTool } from '@hookform/devtools';
import { joiResolver } from '@hookform/resolvers/joi';
import Paper from '@mui/material/Paper';
import Joi from 'joi';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import CheckboxCtrl from './FormProvider/CheckboxCtrl';
import DateCtrl from './FormProvider/DateCtrl';
import SliderCtrl from './FormProvider/SliderCtrl';
import SwitchCtrl from './FormProvider/SwitchCtrl';
import TextCtrl from './FormProvider/TextCtrl';

interface IFormValues {
  person: {
    birthDay: string | null;
    weddingDay?: string | null;
    isDeveloper?: boolean;
    range: number;
    name: string;
    isSexy: boolean;
  };
}

const FormSchema = Joi.object().keys({
  person: Joi.object().keys({
    birthDay: Joi.alternatives([
      Joi.date().iso().raw(),
      Joi.string().valid(null)
    ]).required(),
    weddingDay: Joi.alternatives([
      Joi.date().iso().raw(),
      Joi.string().valid(null)
    ]).required(),
    point: Joi.number().required(),
    isDeveloper: Joi.boolean().valid(true).required(),
    range: Joi.number().min(0).max(100).required(),
    name: Joi.string().min(5).max(20).required(),
    isSexy: Joi.boolean().valid(true).required()
  })
});

const KitchenSink = (): React.ReactElement => {
  const defaultValues = {
    person: {
      birthDay: null,
      weddingDay: '2023-12-24T14:00:00.123Z',
      point: 50,
      isDeveloper: false,
      range: 20,
      name: '',
      isSexy: false
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
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(saveValues)}>
          <DateCtrl name="person.birthDay" label="birthDay" />
          <DateCtrl name="person.weddingDay" label="weddingDay" />
          <SwitchCtrl label="isDeveloper" name="person.isDeveloper" />
          <SliderCtrl name="person.range" />
          <TextCtrl name="person.name" label="Name" />
          <CheckboxCtrl label="isSexy" name="person.isSexy" />
          <br />
          <button type="submit">Save</button>
        </form>
        <DevTool control={methods.control} />
      </FormProvider>
    </Paper>
  );
};

export default KitchenSink;
