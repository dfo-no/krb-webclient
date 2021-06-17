import DateFnsUtils from '@date-io/date-fns';
import { joiResolver } from '@hookform/resolvers/joi';
import {
  Checkbox,
  FormControlLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Slider,
  Switch,
  TextField
} from '@material-ui/core';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import Joi from 'joi';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import { Controller, useForm } from 'react-hook-form';

let renderCount = 0;

const defaultValues = {
  cart: {
    fromDate: '2021-06-24T08:45:00.000Z',
    from: 'OSL',
    firstName: 'Trond',
    meal: true,
    gender: 'male',
    leisure: true,
    fun: 91
  }
};

type Form = {
  cart: {
    fromDate: string;
    from: string;
    firstName: string;
    meal: boolean;
    gender: string;
    leisure: boolean;
    fun: number;
  };
};

const formSchema = Joi.object().keys({
  cart: Joi.object().keys({
    firstName: Joi.string().equal('Trond').max(15).required(),
    meal: Joi.boolean().equal(true).required(),
    gender: Joi.string().valid('male').required(),
    from: Joi.string().equal('OSL').required(),
    leisure: Joi.boolean().valid(true).required(),
    fun: Joi.number().min(90).max(100).required(),
    fromDate: Joi.date().iso().less('06-25-2021').required()
  })
});

export default function UIDemo(): JSX.Element {
  const methods = useForm<Form>({
    defaultValues,
    resolver: joiResolver(formSchema)
  });
  const {
    handleSubmit,
    formState: { errors },
    reset,
    control
  } = methods;

  const [result, setResult] = useState('');
  renderCount += 1;

  return (
    <Container>
      <h3>
        Demo for ALL used UI components in this project
        <Badge variant="info">{renderCount}</Badge>
      </h3>
      <form
        onSubmit={handleSubmit((data: Form) => {
          setResult(JSON.stringify(data, null, 2));
        })}
      >
        <div className="container">
          <section id="input-checkbox">
            <span>MUI Checkbox (meal)</span>
            <Controller
              name={`cart.meal` as const}
              control={control}
              render={({ field: p }) => (
                <Checkbox
                  inputRef={p.ref}
                  {...p}
                  checked={!!p.value}
                  onChange={(e) => p.onChange(e.target.checked)}
                />
              )}
            />
          </section>

          {errors?.cart?.meal && <p>{errors.cart.meal.message}</p>}

          <section id="input-radio-group">
            <span>MUI Radio Group</span>
            <Controller
              rules={{ required: true }}
              name={`cart.gender` as const}
              control={control}
              render={({ field }) => (
                <RadioGroup aria-label="gender" {...field} name="gender1">
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
              )}
            />
          </section>

          {errors?.cart?.gender && <p>{errors.cart.gender.message}</p>}

          <section id="input-textField">
            <span>MUI TextField</span>
            <Controller
              name={`cart.firstName` as const}
              render={({ field }) => <TextField {...field} />}
              control={control}
            />
          </section>

          {errors.cart?.firstName && <p>{errors.cart.firstName.message}</p>}

          <section id="input-select">
            <span>MUI Select</span>
            <Controller
              name={`cart.from` as const}
              control={control}
              render={({ field }) => (
                <Select {...field}>
                  <MenuItem value="OSL">Oslo Gardermoen</MenuItem>
                  <MenuItem value="TRD">Trondheim Værnes</MenuItem>
                  <MenuItem value="BGO">Bergen Flesland</MenuItem>
                </Select>
              )}
            />
          </section>

          {errors?.cart?.from && <p>{errors.cart.from.message}</p>}

          <section id="input-switch">
            <span>Leisure</span>
            <Controller
              name={`cart.leisure` as const}
              control={control}
              render={({ field }) => (
                <Switch
                  {...field}
                  onChange={(e) => field.onChange(e.target.checked)}
                  checked={field.value}
                />
              )}
            />
          </section>

          {errors?.cart?.leisure && <p>{errors.cart.leisure.message}</p>}
        </div>

        <section>
          <span>Fun</span>
          <Controller
            name={`cart.fun` as const}
            control={control}
            render={({ field }) => (
              <Slider
                {...field}
                onChange={(_, value) => {
                  field.onChange(value);
                }}
                valueLabelDisplay="auto"
                step={1}
              />
            )}
          />
          {errors?.cart?.fun && <p>{errors.cart.fun.message}</p>}
        </section>

        <section>
          <span>MUI Picker</span>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Controller
              name={`cart.fromDate` as const}
              control={control}
              render={({ field: { ref, ...rest } }) => (
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  format="dd/MM/yyyy"
                  KeyboardButtonProps={{
                    'aria-label': 'change date'
                  }}
                  {...rest}
                />
              )}
            />
          </MuiPickersUtilsProvider>
          {errors?.cart?.fromDate && <p>{errors.cart.fromDate.message}</p>}
        </section>

        <br />

        <Button
          type="button"
          onClick={() => {
            setResult('');
            reset();
          }}
        >
          Reset Form
        </Button>
        <Button type="submit" id="submit">
          submit
        </Button>
      </form>
      <Paper elevation={1}>
        <pre className="code">{result}</pre>
      </Paper>
    </Container>
  );
}
