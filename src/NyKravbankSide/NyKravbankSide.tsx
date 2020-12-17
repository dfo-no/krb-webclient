import React, { ReactElement, useEffect, useState } from 'react';
import styles from './NyKravbankSide.module.scss';
import { useForm } from 'react-hook-form';
import { Kravbank } from '../models/Kravbank';
import * as uuid from 'uuid';

export default function NyKravbankSide(this: any): ReactElement {
  const { register, handleSubmit } = useForm<Kravbank>();

  const onSubmit = (data: Kravbank) => {
    const Kravbank: Kravbank = {
      tittel: data.tittel,
      id: uuid.v4(),
      beskrivelse: data.beskrivelse
    };
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.formwrapper}
        autoComplete="on"
      >
        <label className={styles.formlabel}>
          <b>Tittel</b>
          <input
            name="tittel"
            ref={register({
              pattern: /^[A-Za-z]+$/i,
              required: true,
              maxLength: 20
            })}
          />
        </label>
        <label className={styles.formlabel}>
          <b>beskrivelse</b>
          <input
            name="beskrivelse"
            ref={register({
              pattern: /^[A-Za-z]+$/i,
              required: true,
              maxLength: 20
            })}
          />
        </label>
        <input type="submit" value="Opprett kravbank" />
      </form>
    </div>
  );
}
