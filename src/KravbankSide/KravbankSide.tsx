import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import { Behov } from '../models/Behov';
import uuid from 'uuid';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';

import { State } from '../store/index';
import { Link } from 'react-router-dom';
import styles from './KravbankSide.module.scss';
import { Katalog } from '../models/Katalog';
import { findByLabelText } from '@testing-library/dom';

interface IProps {
  selectedKravbank: number;
  kravbanker: Katalog;
  addBehov: any;
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

const mapList = (list: Behov[]) => {
  return list.map((element: Behov) => {
    return (
      <div className={styles.listitem} key={element.id}>
        <p>{element.tittel}</p>
        <Link to={'/katalog/'}>
          <button type="button" className={styles.editbutton}>
            Rediger
          </button>
        </Link>
      </div>
    );
  });
};

function KravbankSide(props: IProps): ReactElement {
  const { register, handleSubmit } = useForm<Behov>();
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const onSubmit = (data: Behov) => {
    const behov: Behov = {
      id: uuid.v4(),
      tittel: data.tittel,
      beskrivelse: data.beskrivelse
    };
    props.addBehov(behov);
    closeModal();
    console.log(behov);
  };
  return props.kravbanker[props.selectedKravbank] ? (
    <div>
      <h1>{props.kravbanker[props.selectedKravbank].tittel}</h1>
      <label className={styles.formlabel}>
        <b>Tittel</b>
        <input
          type="text"
          name="tittel"
          defaultValue={props.kravbanker[props.selectedKravbank].tittel}
        />
      </label>
      <label className={styles.formlabel}>
        <b>Tittel</b>
        <input
          type="text"
          name="tittel"
          defaultValue={props.kravbanker[props.selectedKravbank].beskrivelse}
        />
      </label>
      <div>
        <div className={styles.subsection}>
          <h2>Behov</h2>
          <button type="button" onClick={openModal}>
            Nytt behov
          </button>
        </div>
        {props.kravbanker[props.selectedKravbank].behov &&
          mapList(props.kravbanker[props.selectedKravbank].behov)}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
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

const addBehov = (behov: Behov) => ({
  type: '[BEHOV] NEW',
  payload: behov
});
const mapDispatchToProps = (dispatch: any) => {
  const actions = {
    addBehov: (behov: Behov) => dispatch(addBehov(behov))
  };
  return actions;
};

const mapStateToProps = (store: State) => {
  return {
    selectedKravbank: store.selectedkravbank,
    kravbanker: store.kravbanker
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(KravbankSide);
