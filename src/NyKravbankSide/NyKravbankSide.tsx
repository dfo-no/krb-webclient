import { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Kravbank } from '../models/Kravbank';
import styles from './NyKravbankSide.module.scss';
import { newKravbank } from '../store/reducers/kravbank-reducer';

function NyKravbankSide(): ReactElement {
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm<Kravbank>();
  const history = useHistory();
  const onSubmit = (data: Kravbank) => {
    const kravbank: Kravbank = {
      id: Math.random(),
      tittel: data.tittel,
      beskrivelse: data.beskrivelse,
      behov: [],
      krav: [],
      kodeliste: [],
      ordering: 0
    };
    dispatch(newKravbank(kravbank));
    history.push('/katalog/');
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
              pattern: /^[ÆØÅæøåA-Za-z0-9_ ]+$/i,
              required: true,
              maxLength: 40
            })}
          />
        </label>
        <label className={styles.formlabel}>
          <b>beskrivelse</b>
          <input
            name="beskrivelse"
            ref={register({
              pattern: /^[ÆØÅæøåA-Za-z0-9_ ]+$/i,
              required: true,
              maxLength: 50
            })}
          />
        </label>
        <input type="submit" value="Opprett kravbank" />
      </form>
    </div>
  );
}

export default NyKravbankSide;
