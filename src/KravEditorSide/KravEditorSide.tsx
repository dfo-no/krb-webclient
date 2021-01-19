import { ReactElement, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { Krav } from '../models/Krav';
import styles from './KravEditorSide.module.scss';
import koder from '../data/kodelister.json';
import { useHistory } from 'react-router-dom';
import { RootState } from '../store/configureStore';
import { addKrav } from '../store/reducers/kravbank-reducer';

function KravEditorSide(): ReactElement {
  const dispatch = useDispatch();

  const {
    projects,
    selectedNeed: selectedBehov,
    selectedProject,
    selectedKrav
  } = useSelector((state: RootState) => state.kravbank);

  const { register, handleSubmit } = useForm<Krav>();
  const history = useHistory();

  const need = projects[selectedProject].needs[selectedBehov];
  const krav = need.krav ? need.krav[selectedKrav] : undefined;
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
      id: selectedKrav,
      tittel: data.tittel,
      beskrivelse: data.beskrivelse,
      type: data.type,
      needId: selectedBehov,
      file: data.file
    };
    dispatch(addKrav(krav));
    history.push(`/workbench/need/${selectedBehov}`);
  };

  return krav ? (
    <form onSubmit={handleSubmit(saveKrav)} autoComplete="off">
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

export default KravEditorSide;
