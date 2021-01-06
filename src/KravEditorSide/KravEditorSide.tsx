import React, { ReactElement, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';

import { Katalog } from '../models/Katalog';
import { Krav } from '../models/Krav';
import { Kravbank } from '../models/Kravbank';
import { State } from '../store';
import styles from './KravEditorSide.module.scss';
import koder from '../data/kodelister.json';

interface IProps {
  selectedkravbank: number;
  selectedbehov: number;
  kravbanker: Katalog<Kravbank>;
  selectedkrav: number;
  addKrav: any;
}

function KravEditorSide(props: IProps): ReactElement {
  const behov =
    props.kravbanker[props.selectedkravbank].behov[props.selectedbehov];
  const krav = behov.krav ? behov.krav[props.selectedkrav] : undefined;
  const { register, handleSubmit } = useForm<Krav>();
  const [isKodelisteEksakt, setIsKodelisteEksakt] = useState(
    krav?.type === 'kodeliste-eksakt' ? true : false
  );

  const renderTypeSpecificField = () => {
    if (isKodelisteEksakt) {
      return (
        <label className={styles.formlabel}>
          <b>Kodeliste</b>
          <select id="kodeliste" name="kodeliste" ref={register}>
            {koder.map((code) => {
              return (
                <option key={code.id} value={code.tittel}>
                  {code.tittel}
                </option>
              );
            })}
          </select>
        </label>
      );
    }
  };

  const handleSelectChange = (event: any) => {
    if (event.target.value === 'kodeliste-eksakt') {
      setIsKodelisteEksakt(true);
    } else {
      setIsKodelisteEksakt(false);
    }
  };

  const saveKrav = (data: Krav) => {
    const krav: Krav = {
      id: props.selectedkrav,
      tittel: data.tittel,
      beskrivelse: data.beskrivelse,
      type: data.type,
      behov_id: props.selectedbehov,
      file: data.file
    };
    props.addKrav(krav);
  };

  useEffect(() => {});
  return krav ? (
    <form onSubmit={handleSubmit(saveKrav)} autoComplete="on">
      <div>
        <h1>{krav.tittel}</h1>
        <label className={styles.formlabel}>
          <b>Tittel</b>
          <input
            type="text"
            name="tittel"
            defaultValue={krav.tittel}
            ref={register({
              pattern: /^[ÆØÅæøåA-Za-z0-9_ ]+$/i,
              required: true,
              maxLength: 40
            })}
          />
        </label>
        <label className={styles.formlabel}>
          <b>Beskrivelse</b>
          <input
            type="text"
            name="beskrivelse"
            defaultValue={krav.beskrivelse}
            ref={register({
              pattern: /^[ÆØÅæøåA-Za-z0-9_ ]+$/i,
              required: true,
              maxLength: 40
            })}
          />
        </label>
        <label className={styles.formlabel}>
          <b>Fillopplastning</b>
          <input type="file" name="file" accept=".pdf" ref={register} />
        </label>
        <label className={styles.formlabel}>
          <b>Type</b>
          <select
            id="kravtype"
            name="type"
            ref={register}
            defaultValue={krav.type}
            onChange={handleSelectChange}
          >
            <option value="kodeliste">Kodeliste</option>
            <option value="kodeliste-eksakt">Kodeliste-eksakt</option>
            <option value="fritekst">Fritekst</option>
          </select>
        </label>
        {renderTypeSpecificField()}
        <input type="submit" value="Lagre krav" />
      </div>
    </form>
  ) : (
    <div></div>
  );
}

const addKrav = (krav: Krav) => ({
  type: '[KRAV] NEW',
  payload: krav
});

const mapDispatchToProps = (dispatch: any) => {
  const actions = {
    addKrav: (krav: Krav) => dispatch(addKrav(krav))
  };
  return actions;
};

const mapStateToProps = (store: State) => {
  return {
    selectedkrav: store.selectedkrav,
    selectedbehov: store.selectedbehov,
    selectedkravbank: store.selectedkravbank,
    kravbanker: store.kravbanker
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(KravEditorSide);
