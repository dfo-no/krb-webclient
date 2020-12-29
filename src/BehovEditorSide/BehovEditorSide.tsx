import React, { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import { Behov } from '../models/Behov';
import { Katalog } from '../models/Katalog';
import { Kravbank } from '../models/Kravbank';
import styles from './BehovEditorSide.module.scss';
import { State } from '../store';

interface IProps {
  selectedkravbank: number;
  selectedbehov: number;
  kravbanker: Katalog<Kravbank>;
  addUnderBehov: any;
}

function BehovEditorSide(props: IProps): ReactElement {
  const behov =
    props.kravbanker[props.selectedkravbank].behov[props.selectedbehov];
  const { register, handleSubmit } = useForm<Behov>();
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const createBehovOutput = (behovkatalog: Katalog<Behov>) => {
    let underbehovlist = [];
    for (let key in behovkatalog) {
      let value = behovkatalog[key];
      underbehovlist.push(value);
    }
    return underbehovlist.map((element: Behov) => {
      return (
        <div className={styles.listitem} key={element.id}>
          <p>{element.tittel}</p>
        </div>
      );
    });
  };

  const onSubmit = (data: Behov) => {
    const behov: Behov = {
      id: Math.random(),
      tittel: data.tittel,
      beskrivelse: data.beskrivelse
    };
    props.addUnderBehov(behov);
    closeModal();
  };
  return behov ? (
    <div>
      <h1>{behov.tittel}</h1>
      <label className={styles.formlabel}>
        <b>Tittel</b>
        <input type="text" name="tittel" defaultValue={behov.tittel} />
      </label>
      <label className={styles.formlabel}>
        <b>Tittel</b>
        <input type="text" name="tittel" defaultValue={behov.beskrivelse} />
      </label>
      <div className={styles.subsection}>
        <h2>Underbehov</h2>
        <button type="button" onClick={openModal}>
          Nytt underbehov
        </button>
        {behov.underbehov && createBehovOutput(behov.underbehov)}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className={styles.modal}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
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
          <input type="submit" value="Oprett behov" />
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

const mapDispatchToProps = (dispatch: any) => {
  const actions = {
    addUnderBehov: (behov: Behov) => dispatch(addUnderBehov(behov))
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
