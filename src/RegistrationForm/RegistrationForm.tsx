import { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import styles from './RegistrationForm.module.scss';
import { useHistory } from 'react-router-dom';

function RegistrationForm(this: any): ReactElement {
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
    </div>
  );
}

export default RegistrationForm;
