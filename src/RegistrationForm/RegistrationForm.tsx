import React, { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import styles from './RegistrationForm.module.scss';
import { useHistory } from 'react-router-dom';

export default function RegistrationForm (this: any): ReactElement {
  const { register, handleSubmit } = useForm<IFormInput>();
  const history = useHistory();
  const onSubmit = (data: IFormInput) => {
    console.log(data);
    history.push(`/katalog`);
  };

  interface IFormInput {
    username: string;
    password: string;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formwrapper} autoComplete="on">
        <label className={styles.formlabel}>
            <b>Brukernavn</b>
            <input name="username" ref={register({ pattern: /^[A-Za-z]+$/i ,required: true, maxLength: 20 })}/>
        </label>
        <label className={styles.formlabel}>
            <b>Passord</b>
            <input type="password" name="password" ref={register({ pattern: /^[A-Za-z]+$/i , required: true, minLength: 5})} />       
        </label>
        
        <input type="submit" value="Logg inn"/>
    </form>
  );
  }