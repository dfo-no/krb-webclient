import React, { ReactElement, useState } from 'react';
import { useForm } from 'react-hook-form';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { Form, Button, Container, Card } from 'react-bootstrap';
import css from './LoginForm.module.scss';

import fakeAuth from '../authentication/AuthenticationHandler';

const loginSchema = Joi.object({
  email: Joi.string().email({ tlds: false }).required(),
  password: Joi.string().min(8).required()
});

type FormData = {
  email: string;
  password: string;
};

function LoginForm({ location }: RouteComponentProps): ReactElement {
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);

  const { from } = (location.state as any) || { from: { pathname: '/' } };

  const defaultValues: FormData = {
    email: 'oakley@carruthers.com',
    password: 'a3MDsBSWmFjLRpT'
  };

  const { register, handleSubmit, errors } = useForm<FormData>({
    resolver: joiResolver(loginSchema),
    defaultValues
  });

  const onSubmit = (e: FormData) => {
    fakeAuth.authenticate(() => {
      setRedirectToReferrer(true);
    });
  };

  if (redirectToReferrer) {
    return <Redirect to={from} />;
  }
  return (
    <Container className={css.container}>
      <Card className={css.loginCard} bg="light">
        <Card.Body>
          <Form
            onSubmit={handleSubmit((e) => onSubmit(e))}
            className={css.formwrapper}
            autoComplete="on"
            noValidate
          >
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="email"
                ref={register}
                isInvalid={!!errors.email}
              />
              {errors.email && (
                <Form.Control.Feedback type="invalid">
                  {errors.email.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>Passord</Form.Label>
              <Form.Control
                name="password"
                type="password"
                ref={register}
                isInvalid={!!errors.password}
              />
              {errors.password && (
                <Form.Control.Feedback type="invalid">
                  {errors.password.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Button
              variant="warning"
              type="submit"
              className={css.loginCard__submitButton}
            >
              Logg inn
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default LoginForm;
