import { DevTool } from '@hookform/devtools';
import { joiResolver } from '@hookform/resolvers/joi';
import Paper from '@mui/material/Paper';
import Joi from 'joi';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import DateInput from './FormProvider/DateInput';
import HiddenNumberInput from './FormProvider/HiddenTextInput';
import SwitchInput from './FormProvider/SwitchInput';

interface IFormValues {
  person: {
    birthDay: string | null;
    weddingDay?: string | null;
    isDeveloper?: boolean;
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
    isDeveloper: Joi.boolean().required()
  })
});

const KitchenSink = (): React.ReactElement => {
  const defaultValues = {
    person: {
      birthDay: null,
      weddingDay: '2023-12-24T14:00:00.123Z',
      point: 50,
      isDeveloper: true
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
          <DateInput name="person.birthDay" label="birthDay" />
          <DateInput name="person.weddingDay" label="weddingDay" />
          {/* <HiddenNumberInput name="person.point" /> */}
          <SwitchInput label="isDeveloper" name="person.isDeveloper" />
          <br />
          <button type="submit">Save</button>
        </form>
        <DevTool control={methods.control} />
      </FormProvider>
    </Paper>
  );
};

export default KitchenSink;
