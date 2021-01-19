import React, { ReactElement, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Modal from 'react-modal';
import { AiFillPlusSquare, AiFillEdit } from 'react-icons/ai';

import { Need } from '../../models/Need';
import { Krav } from '../../models/Krav';
import styles from './NeedPage.module.scss';
import { RootState } from '../../store/configureStore';
import {
  addKrav,
  addSubNeed,
  editKrav
} from '../../store/reducers/kravbank-reducer';

function NeedPage(): ReactElement {
  const dispatch = useDispatch();
  const { projects, selectedProject, selectedNeed } = useSelector(
    (state: RootState) => state.kravbank
  );
  const [needModalIsOpen, setNeedIsOpen] = useState(false);
  const [kravModalIsOpen, setKravIsOpen] = useState(false);
  const { register, handleSubmit } = useForm<Need>();
  const history = useHistory();

  if (selectedProject === null) {
    return <p>No Project selected</p>;
  }
  const need = projects[selectedProject].needs[selectedNeed];

  const needModal = (open: boolean) => (event: any) => {
    setNeedIsOpen(open);
  };

  const kravModal = (open: boolean) => (event: any) => {
    setKravIsOpen(open);
  };

  const handleEditKrav = (krav: Krav) => (event: any) => {
    dispatch(editKrav(krav));
    history.push(`/workbench/requirement/${krav.id}`);
  };

  const createListOutput = (list: any) => {
    return list.map((element: Need | Krav) => {
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

  const submitBehov = (data: Need) => {
    // TODO: ikke gi ID til nye behov.
    const need: Need = {
      id: Math.random(),
      tittel: data.tittel,
      beskrivelse: data.beskrivelse
    };
    dispatch(addSubNeed(need));
    needModal(false);
  };

  const submitKrav = (data: Krav) => {
    const krav: Krav = {
      id: Math.random(),
      tittel: data.tittel,
      beskrivelse: data.beskrivelse,
      type: data.type,
      needId: selectedNeed
    };
    dispatch(addKrav(krav));
    kravModal(false);
  };

  return need ? (
    <div>
      <h1>{need.tittel}</h1>
      <label className={styles.formlabel}>
        <b>Tittel</b>
        <input type="text" name="tittel" defaultValue={need.tittel} />
      </label>
      <label className={styles.formlabel}>
        <b>Beskrivelse</b>
        <input type="text" name="tittel" defaultValue={need.beskrivelse} />
      </label>
      <div>
        <div className={styles.subsection}>
          <h2>Sub needs</h2>
          <AiFillPlusSquare
            size={25}
            onClick={needModal(true)}
            className={styles.icon}
          />
        </div>
        {need.needs && createListOutput(need.needs)}
      </div>
      <Modal
        isOpen={needModalIsOpen}
        onRequestClose={needModal(false)}
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
          <input type="submit" value="New need" />
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
        {need.krav && createListOutput(need.krav)}
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

export default NeedPage;
