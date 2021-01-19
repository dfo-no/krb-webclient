import React, { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Modal from 'react-modal';
import { AiFillPlusSquare, AiFillEdit } from 'react-icons/ai';

import { Behov } from '../models/Behov';
import { Krav } from '../models/Krav';
import styles from './BehovEditorSide.module.scss';
import { RootState } from '../store/configureStore';
import {
  addKrav,
  addUnderBehov,
  editKrav
} from '../store/reducers/kravbank-reducer';

function BehovEditorSide(): ReactElement {
  const dispatch = useDispatch();
  const { projects, selectedProject, selectedBehov } = useSelector(
    (state: RootState) => state.kravbank
  );

  const behov = projects[selectedProject].behov[selectedBehov];
  const { register, handleSubmit } = useForm<Behov>();
  const [behovModalIsOpen, setBehovIsOpen] = React.useState(false);
  const [kravModalIsOpen, setKravIsOpen] = React.useState(false);
  const history = useHistory();

  const behovModal = (open: boolean) => (event: any) => {
    setBehovIsOpen(open);
  };

  const kravModal = (open: boolean) => (event: any) => {
    setKravIsOpen(open);
  };

  const handleEditKrav = (krav: Krav) => (event: any) => {
    dispatch(editKrav(krav));
    history.push(`/edit/krav/${krav.id}`);
  };

  const createListOutput = (list: any) => {
    return list.map((element: Behov | Krav) => {
      return (
        <div className={styles.listitem} key={element.id}>
          <p>{element.tittel}</p>
          <AiFillEdit
            className={styles.editicon}
            onClick={handleEditKrav(element as Krav)}
          />
        </div>
      );
    });
  };

  const submitBehov = (data: Behov) => {
    // TODO: ikke gi ID til nye behov.
    const behov: Behov = {
      id: Math.random(),
      tittel: data.tittel,
      beskrivelse: data.beskrivelse
    };
    dispatch(addUnderBehov(behov));
    behovModal(false);
  };

  const submitKrav = (data: Krav) => {
    const krav: Krav = {
      id: Math.random(),
      tittel: data.tittel,
      beskrivelse: data.beskrivelse,
      type: data.type,
      behovId: selectedBehov
    };
    dispatch(addKrav(krav));
    kravModal(false);
  };

  return behov ? (
    <div>
      <h1>{behov.tittel}</h1>
      <label className={styles.formlabel}>
        <b>Tittel</b>
        <input type="text" name="tittel" defaultValue={behov.tittel} />
      </label>
      <label className={styles.formlabel}>
        <b>Beskrivelse</b>
        <input type="text" name="tittel" defaultValue={behov.beskrivelse} />
      </label>
      <div>
        <div className={styles.subsection}>
          <h2>Underbehov</h2>
          <AiFillPlusSquare
            size={25}
            onClick={behovModal(true)}
            className={styles.icon}
          />
        </div>
        {behov.underbehov && createListOutput(behov.underbehov)}
      </div>
      <Modal
        isOpen={behovModalIsOpen}
        onRequestClose={behovModal(false)}
        className={styles.modal}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <form
          onSubmit={handleSubmit(submitBehov)}
          autoComplete="off"
          className={styles.formwrapper}
        >
          <label className={styles.formlabel}>
            <b>Tittel</b>
            <input
              autoComplete="off"
              name="tittel"
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
              autoComplete="off"
              name="beskrivelse"
              ref={register({
                pattern: /^[ÆØÅæøåA-Za-z0-9_ ]+$/i,
                required: true,
                maxLength: 50
              })}
            />
          </label>
          <input type="submit" value="Oprett behov" />
        </form>
      </Modal>
      <div>
        <div className={styles.subsection}>
          <h2>Krav</h2>
          <AiFillPlusSquare
            size={25}
            onClick={kravModal(true)}
            className={styles.icon}
          />
        </div>
        {behov.krav && createListOutput(behov.krav)}
      </div>
      <Modal
        isOpen={kravModalIsOpen}
        onRequestClose={kravModal(false)}
        className={styles.modal}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <form
          onSubmit={handleSubmit(submitKrav)}
          autoComplete="off"
          className={styles.formwrapper}
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
            <b>Beskrivelse</b>
            <input
              name="beskrivelse"
              ref={register({
                pattern: /^[ÆØÅæøåA-Za-z0-9_ ]+$/i,
                required: true,
                maxLength: 50
              })}
            />
          </label>
          <label className={styles.formlabel}>
            <b>Type</b>
            <select id="type" name="type" ref={register}>
              <option value="kodeliste">Kodeliste</option>
              <option value="kodeliste-eksakt">Kodeliste-eksakt</option>
              <option value="fritekst">Fritekst</option>
            </select>
          </label>
          <input type="submit" value="Opprett krav" />
        </form>
      </Modal>
    </div>
  ) : (
    <div></div>
  );
}

export default BehovEditorSide;
