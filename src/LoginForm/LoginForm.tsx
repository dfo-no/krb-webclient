import React, { ReactElement, useState } from 'react';
import { useForm } from 'react-hook-form';
import css from './LoginForm.module.scss';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchBanks } from '../store/reducers/kravbank-reducer';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { fakeAuth } from '../authentication/AuthenticationHandler';

function LoginForm(props: RouteComponentProps): ReactElement {
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);

  let { from } = (props.location.state as any) || { from: { pathname: '/' } };

  const dispatch = useDispatch();

  const initBanks = async () => {
    dispatch(fetchBanks());
  };
  initBanks();

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (post: { username: string; password: string }) => {
    fakeAuth.authenticate(() => {
      setRedirectToReferrer(true);
    });
  };

  if (redirectToReferrer) {
    return <Redirect to={from} />;
  } else {
    return (
      <Container className={css.container}>
        <Card className={css.loginCard} bg="light">
          <Card.Body>
            <Form
              onSubmit={handleSubmit(onSubmit)}
              className={css.formwrapper}
              autoComplete="on"
              noValidate
            >
              <Form.Group>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  name="username"
                  type="email"
                  ref={register({
                    pattern: {
                      message: 'Not a valid email address',
                      value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    },
                    required: true
                  })}
                  isInvalid={!!errors.username}
                  defaultValue="oakley@carruthers.com"
                ></Form.Control>
                {errors.username && (
                  <Form.Control.Feedback type="invalid">
                    {errors.username.message}
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              <Form.Group>
                <Form.Label>Passord</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  ref={register({
                    required: true,
                    minLength: { value: 8, message: 'Minimum 8 characters' },
                    maxLength: { value: 50, message: 'Maximum 50 characters' }
                  })}
                  isInvalid={!!errors.password}
                  defaultValue="a3MDsBSWmFjLRpT"
                ></Form.Control>
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
}

export default LoginForm;
