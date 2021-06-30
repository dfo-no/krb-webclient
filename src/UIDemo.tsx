/* eslint-disable react/no-array-index-key */
/* eslint-disable no-console */
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
import { get, has } from 'lodash';
import React, { ReactElement, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import {
  Control,
  Controller,
  FormState,
  useFieldArray,
  useForm,
  UseFormRegister
} from 'react-hook-form';
import ErrorSummary from './Form/ErrorSummary';

let renderCount = 0;

const defaultValues: ICart = {
  cart: {
    fromDate: '2021-06-28T08:45:00.000Z',
    from: 'BGO',
    meal: false,
    firstName: 'Maria',
    gender: 'female',
    leisure: false,
    fun: 9,
    email: 'maria@computas.com',
    variants: [
      {
        fromDate: '2021-03-24T08:45:00.000Z',
        from: 'BGO',
        meal: false,
        firstName: 'Maria',
        gender: 'female',
        leisure: false,
        fun: 9,
        email: 'maria@computas.com'
      }
    ]
  }
};

interface IFirst {
  meal: boolean;
  fromDate: string;
  from: string;
  gender: string;
  firstName: string;

  leisure: boolean;
  fun: number;
  email: string;
  variants: ISecond[];
}

interface ISecond {
  meal: boolean;
  fromDate: string;
  from: string;
  firstName: string;
  gender: string;
  leisure: boolean;
  fun: number;
  email: string;
}

interface ICart {
  cart: IFirst;
}

const variantSchema = Joi.object().keys({
  meal: Joi.boolean().equal(true).required(),
  fromDate: Joi.date().iso().less('06-25-2021').required(),
  from: Joi.string().equal('OSL').required(),
  firstName: Joi.string().equal('Trond').max(15).required(),
  gender: Joi.string().valid('male').required(),
  leisure: Joi.boolean().valid(true).required(),
  fun: Joi.number().min(90).max(100).required(),
  email: Joi.string()
    .email({ tlds: false })
    .equal('tal@computas.com')
    .required()
});

const formSchema = Joi.object().keys({
  cart: Joi.object().keys({
    meal: Joi.boolean().equal(true).required(),
    fromDate: Joi.date().iso().less('06-25-2021').required(),
    from: Joi.string().equal('OSL').required(),
    firstName: Joi.string().equal('Trond').max(15).required(),
    gender: Joi.string().valid('male').required(),
    leisure: Joi.boolean().valid(true).required(),
    fun: Joi.number().min(90).max(100).required(),
    email: Joi.string()
      .email({ tlds: false })
      .equal('tal@computas.com')
      .required(),
    variants: Joi.array().items(variantSchema)
  })
});

interface IProps {
  control: Control<ICart>;
  register: UseFormRegister<ICart>;
  formState: FormState<ICart>;
  getValues: any;
}

function Variants({
  control,
  register,
  formState,
  getValues
}: IProps): ReactElement {
  const { errors } = formState;
  const { fields, append, remove } = useFieldArray({
    control,
    name: `cart.variants` as 'cart.variants'
  });

  return (
    <Container>
      <h3>UseFieldArray example</h3>

      {fields.map((item, index) => {
        return (
          <div key={index}>
            <section id="input-checkbox">
              <span>MUI Checkbox (meal)</span>

              <Controller
                name={`cart.variants.${index}.meal` as const}
                control={control}
                defaultValue={getValues(`cart.variants[${index}].meal`)}
                render={({ field: p }) => (
                  <Checkbox
                    inputRef={p.ref}
                    {...p}
                    checked={!!p.value}
                    onChange={(e) => p.onChange(e.target.checked)}
                  />
                )}
              />
              {has(errors, `cart.variants[${index}].meal`) && (
                <p style={{ color: 'red' }}>
                  {get(errors, `cart.variants[${index}].meal.message`)}
                </p>
              )}
            </section>
            <section>
              <span>MUI Picker (fromDate)</span>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Controller
                  name={`cart.variants.${index}.fromDate` as const}
                  control={control}
                  defaultValue={getValues(`cart.variants[${index}].fromDate`)}
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
              {has(errors, `cart.variants[${index}].fromDate`) && (
                <p style={{ color: 'red' }}>
                  {get(errors, `cart.variants[${index}].fromDate.message`)}
                </p>
              )}
            </section>
            <section id="input-select">
              <span>MUI Select (from)</span>
              <Controller
                name={`cart.variants.${index}.from` as const}
                control={control}
                defaultValue={getValues(`cart.variants[${index}].from`)}
                render={({ field }) => (
                  <Select {...field}>
                    <MenuItem value="OSL">Oslo Gardermoen</MenuItem>
                    <MenuItem value="TRD">Trondheim Værnes</MenuItem>
                    <MenuItem value="BGO">Bergen Flesland</MenuItem>
                  </Select>
                )}
              />
              {has(errors, `cart.variants[${index}].from`) && (
                <p style={{ color: 'red' }}>
                  {get(errors, `cart.variants[${index}].from.message`)}
                </p>
              )}
            </section>
            <section id="input-radio-group">
              <span>MUI Radio Group</span>
              <Controller
                name={`cart.variants.${index}.gender` as const}
                control={control}
                defaultValue={getValues(`cart.variants.${index}.gender`)}
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
              {has(errors, `cart.variants[${index}].gender`) && (
                <p style={{ color: 'red' }}>
                  {get(errors, `cart.variants[${index}].gender.message`)}
                </p>
              )}
            </section>
            <section id="input-textField">
              <span>MUI TextField (firstName)</span>
              <Controller
                name={`cart.variants.${index}.firstName` as const}
                defaultValue={getValues(`cart.variants.${index}.firstName`)}
                render={({ field }) => <TextField {...field} />}
                control={control}
              />
              {has(errors, `cart.variants[${index}].firstName`) && (
                <p style={{ color: 'red' }}>
                  {get(errors, `cart.variants[${index}].firstName.message`)}
                </p>
              )}
            </section>

            <section id="input-switch">
              <span>Leisure</span>
              <Controller
                name={`cart.variants.${index}.leisure` as const}
                control={control}
                defaultValue={getValues(`cart.variants.${index}.leisure`)}
                render={({ field }) => (
                  <Switch
                    {...field}
                    onChange={(e) => field.onChange(e.target.checked)}
                    checked={field.value}
                  />
                )}
              />
              {has(errors, `cart.variants[${index}].leisure`) && (
                <p style={{ color: 'red' }}>
                  {get(errors, `cart.variants[${index}].leisure.message`)}
                </p>
              )}
            </section>
            <section>
              <span>Fun</span>
              <Controller
                name={`cart.variants.${index}.fun` as const}
                control={control}
                defaultValue={getValues(`cart.variants.${index}.fun`)}
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
              {has(errors, `cart.variants[${index}].fun`) && (
                <p style={{ color: 'red' }}>
                  {get(errors, `cart.variants[${index}].fun.message`)}
                </p>
              )}
            </section>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                {...register(`cart.variants.${index}.email` as const)}
                placeholder="Enter email"
                defaultValue={getValues(`cart.variants.${index}.email`)}
                isInvalid={!!has(errors, `cart.variants[${index}].email`)}
              />
              {has(errors, `cart.variants[${index}].email`) && (
                <Form.Control.Feedback type="invalid">
                  {get(errors, `cart.variants[${index}].email.message`)}
                </Form.Control.Feedback>
              )}
            </Form.Group>
          </div>
        );
      })}
    </Container>
  );
}

export default function UIDemo(): JSX.Element {
  const methods = useForm<ICart>({
    defaultValues,
    resolver: joiResolver(formSchema)
  });
  const { handleSubmit, formState, reset, control, register, getValues } =
    methods;

  const [result, setResult] = useState('');
  renderCount += 1;

  const { errors } = formState;

  return (
    <Container>
      <h3>
        Demo for ALL used UI components in this project! Test it!
        <Badge variant="info">{renderCount}</Badge>
      </h3>
      <form
        onSubmit={handleSubmit((data: ICart) => {
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
            {errors?.cart?.meal && (
              <p style={{ color: 'red' }}>{errors.cart.meal.message}</p>
            )}
          </section>

          <section>
            <span>MUI Picker (fromDate)</span>
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
            {errors?.cart?.fromDate && (
              <p style={{ color: 'red' }}>{errors.cart.fromDate.message}</p>
            )}
          </section>
          <section id="input-select">
            <span>MUI Select (from)</span>
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
            {errors?.cart?.from && (
              <p style={{ color: 'red' }}>{errors.cart.from.message}</p>
            )}
          </section>

          <section id="input-radio-group">
            <span>MUI Radio Group (gender)</span>
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
            {errors?.cart?.gender && (
              <p style={{ color: 'red' }}>{errors.cart.gender.message}</p>
            )}
          </section>

          <section id="input-textField">
            <span>MUI TextField (firstName)</span>
            <Controller
              name={`cart.firstName` as const}
              render={({ field }) => <TextField {...field} />}
              control={control}
            />
            {errors.cart?.firstName && (
              <p style={{ color: 'red' }}>{errors.cart.firstName.message}</p>
            )}
          </section>

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
            {errors?.cart?.leisure && (
              <p style={{ color: 'red' }}>{errors.cart.leisure.message}</p>
            )}
          </section>
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
            {errors?.cart?.fun && (
              <p style={{ color: 'red' }}>{errors.cart.fun.message}</p>
            )}
          </section>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              {...register(`cart.email` as const)}
              placeholder="Enter email"
              isInvalid={!!errors.cart?.email}
            />
            {errors.cart?.email && (
              <Form.Control.Feedback type="invalid">
                {errors.cart.email.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>
        </div>
        <Variants
          control={control}
          register={register}
          formState={formState}
          getValues={getValues}
        />

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
        <ErrorSummary errors={errors} />
      </form>
      <Paper elevation={1}>
        <pre className="code">{result}</pre>
      </Paper>
    </Container>
  );
}
