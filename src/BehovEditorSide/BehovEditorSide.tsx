import React, { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Modal from 'react-modal';
import { AiFillPlusSquare, AiFillEdit } from 'react-icons/ai';

import { Behov } from '../models/Behov';
import { Katalog } from '../models/Katalog';
import { Kravbank } from '../models/Kravbank';
import { State } from '../store';
import { Krav } from '../models/Krav';
import styles from './BehovEditorSide.module.scss';

interface IProps {
  selectedkravbank: number;
  selectedbehov: number;
  kravbanker: Katalog<Kravbank>;
  addUnderBehov: any;
  editKrav: any;
  addKrav: any;
}

function BehovEditorSide(props: IProps): ReactElement {
  const behov =
    props.kravbanker[props.selectedkravbank].behov[props.selectedbehov];
  const { register, handleSubmit } = useForm<Behov>();
  const [behovModalIsOpen, setBehovIsOpen] = React.useState(false);
  const [kravModalIsOpen, setKravIsOpen] = React.useState(false);
  const history = useHistory();

  const openModal = (type: string) => (event: any) => {
    if (type === 'behov') {
      setBehovIsOpen(true);
    } else {
      setKravIsOpen(true);
    }
  };

  const closeModal = (type: string) => (event: any) => {
    if (type === 'behov') {
      setBehovIsOpen(false);
    } else {
      setKravIsOpen(false);
    }
  };

  const handleEdit = (elementid: number) => (event: any) => {
    props.editKrav(elementid);
    history.push(`/edit/krav/${elementid}`);
  };

  const createListOutput = (katalog: Katalog<Behov> | Katalog<Krav>) => {
    let list = [];
    for (let key in katalog) {
      let value = katalog[key];
      list.push(value);
    }
    return list.map((element: Behov | Krav) => {
      return (
        <div className={styles.listitem} key={element.id}>
          <p>{element.tittel}</p>
          <AiFillEdit
            className={styles.editicon}
            onClick={handleEdit(element.id)}
          />
        </div>
      );
    });
  };

  const submitBehov = (data: Behov) => {
    const behov: Behov = {
      id: Math.random(),
      tittel: data.tittel,
      beskrivelse: data.beskrivelse
    };
    props.addUnderBehov(behov);
    closeModal('behov');
  };

  const submitKrav = (data: Krav) => {
    const krav: Krav = {
      id: Math.random(),
      tittel: data.tittel,
      beskrivelse: data.beskrivelse,
      type: data.type,
      behov_id: props.selectedbehov
    };
    props.addKrav(krav);
    closeModal('krav');
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
            onClick={openModal('behov')}
            className={styles.icon}
          />
        </div>
        {behov.underbehov && createListOutput(behov.underbehov)}
      </div>
      <Modal
        isOpen={behovModalIsOpen}
        onRequestClose={closeModal('behov')}
        className={styles.modal}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <form
          onSubmit={handleSubmit(submitBehov)}
          autoComplete="on"
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
          <input type="submit" value="Oprett behov" />
        </form>
      </Modal>
      <div>
        <div className={styles.subsection}>
          <h2>Krav</h2>
          <AiFillPlusSquare
            size={25}
            onClick={openModal('behov')}
            className={styles.icon}
          />
        </div>
        {behov.krav && createListOutput(behov.krav)}
      </div>
      <Modal
        isOpen={kravModalIsOpen}
        onRequestClose={closeModal('krav')}
        className={styles.modal}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <form
          onSubmit={handleSubmit(submitKrav)}
          autoComplete="on"
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
          <label className={styles.formlabel}>
            <b>Type</b>
            <select id="cars" name="cars" ref={register}>
              <option value="Kodeliste">Kodeliste</option>
              <option value="Kodeliste-eksakt">Kodeliste-eksakt</option>
              <option value="Fritekst">Fritekst</option>
            </select>
          </label>
          <input type="submit" value="Oprett krav" />
        </form>
      </Modal>
    </div>
  ) : (
    <div></div>
  );
}

const addUnderBehov = (behov: Behov) => ({
  type: '[UNDERBEHOV] NEW',
  payload: behov
});

const editKrav = (kravid: number) => ({
  type: '[KRAV] EDIT',
  payload: kravid
});

const addKrav = (krav: Krav) => ({
  type: '[KRAV] NEW',
  payload: krav
});

const mapDispatchToProps = (dispatch: any) => {
  const actions = {
    addUnderBehov: (behov: Behov) => dispatch(addUnderBehov(behov)),
    editKrav: (kravid: number) => dispatch(editKrav(kravid)),
    addKrav: (krav: Krav) => dispatch(addKrav(krav))
  };
  return actions;
};

const mapStateToProps = (store: State) => {
  return {
    selectedbehov: store.selectedbehov,
    selectedkravbank: store.selectedkravbank,
    kravbanker: store.kravbanker
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BehovEditorSide);
