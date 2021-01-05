import React, { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import { Kravbank } from '../models/Kravbank';
import styles from './NyKravbankSide.module.scss';

interface IProps {
  registerNew: any;
}

function NyKravbankSide(props: IProps): ReactElement {
  const { register, handleSubmit } = useForm<Kravbank>();
  const history = useHistory();
  const onSubmit = (data: Kravbank) => {
    const kravbank: Kravbank = {
      id: Math.random(),
      tittel: data.tittel,
      beskrivelse: data.beskrivelse,
      behov: []
    };
    props.registerNew(kravbank);
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
              pattern: /^[a-zA-Z0-9_ ]+$/i,
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
              pattern: /^[a-zA-Z0-9_ ]+$/i,
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

const registerNew = (kravbank: Kravbank) => ({
  type: '[KRAVBANK] NEW',
  payload: kravbank
});

const mapDispatchToProps = (dispatch: any) => {
  const actions = {
    registerNew: (kravbank: Kravbank) => dispatch(registerNew(kravbank))
  };
  return actions;
};

export default connect(null, mapDispatchToProps)(NyKravbankSide);
