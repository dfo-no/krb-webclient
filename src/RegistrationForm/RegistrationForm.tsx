import { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import styles from './RegistrationForm.module.scss';
import { useHistory } from 'react-router-dom';
import { decrement, increment } from '../store/reducers/counter-reducer';
import { RootState } from '../store/configureStore';

function RegistrationForm(this: any): ReactElement {
  const dispatch = useDispatch();

  const { value } = useSelector((state: RootState) => state.counter);

  const { register, handleSubmit } = useForm<IFormInput>();
  const history = useHistory();

  const onSubmit = (data: IFormInput) => {
    history.push(`/katalog`);
    // store.dispatch(KRB.loading(true));
  };

  interface IFormInput {
    username: string;
    password: string;
  }

  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.formwrapper}
        autoComplete="on"
      >
        <label className={styles.formlabel}>
          <b>Brukernavn</b>
          <input
            name="username"
            ref={register({
              pattern: /^[ÆØÅæøåA-Za-z0-9_ ]+$/i,
              required: true,
              maxLength: 20
            })}
          />
        </label>
        <label className={styles.formlabel}>
          <b>Passord</b>
          <input
            type="password"
            name="password"
            ref={register({
              pattern: /^[A-Za-z]+$/i,
              required: true,
              minLength: 5
            })}
          />
        </label>

        <input type="submit" value="Logg inn" />
      </form>
      <button onClick={handleIncrement}>Increment</button>
      <p>{value}</p>
      <button onClick={handleDecrement}>Decrement</button>
    </div>
  );
}

export default RegistrationForm;
