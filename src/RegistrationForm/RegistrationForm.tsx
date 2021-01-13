import { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import styles from './RegistrationForm.module.scss';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchBanks } from '../store/reducers/kravbank-reducer';
import { Form, Button } from 'react-bootstrap';

function RegistrationForm(this: any): ReactElement {
  const dispatch = useDispatch();

  const initBanks = async () => {
    dispatch(fetchBanks());
  };
  initBanks();

  const { register, handleSubmit, errors } = useForm();

  const history = useHistory();

  const onSubmit = (event: any) => {
    history.push(`/katalog`);
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.formwrapper}
      autoComplete="on"
    >
      <Form.Group>
        <Form.Label>Brukernavn</Form.Label>
        <Form.Control
          name="username"
          type="text"
          ref={register({
            pattern: /^[ÆØÅæøåA-Za-z0-9_ ]+$/i,
            required: true,
            maxLength: 20
          })}
          isInvalid={!!errors.username}
        ></Form.Control>
        {errors.username && (
          <Form.Control.Feedback type="invalid">
            {errors.username.type}
          </Form.Control.Feedback>
        )}
      </Form.Group>

      <Form.Group>
        <Form.Label>Passord</Form.Label>
        <Form.Control
          name="password"
          type="password"
          ref={register({
            pattern: /^[A-Za-z]+$/i,
            required: true,
            maxLength: 20
          })}
          isInvalid={!!errors.password}
        ></Form.Control>
        {errors.password && (
          <Form.Control.Feedback type="invalid">
            {errors.password.type}
          </Form.Control.Feedback>
        )}
      </Form.Group>

      <Button variant="primary" type="submit">
        Logg inn
      </Button>
    </Form>
  );
}

export default RegistrationForm;
