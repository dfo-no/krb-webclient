import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { Behov } from '../models/Behov';
import { Katalog } from '../models/Katalog';
import { Kravbank } from '../models/Kravbank';
import { State } from '../store/index';
import styles from './KravbankEditorSide.module.scss';
import { AiFillEdit, AiFillPlusSquare } from 'react-icons/ai';

interface IProps {
  selectedKravbank: number;
  kravbanker: Katalog<Kravbank>;
  addBehov: any;
  editBehov: any;
}

function KravbankEditorSide(props: IProps): ReactElement {
  const { register, handleSubmit } = useForm<Behov>();
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const history = useHistory();

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleEdit = (id: number) => (event: any) => {
    //const selectedKravbank = props.kravbanker.find((e) => e.id === id);
    props.editBehov(id);
    history.push(`/edit/behov/${id}`);
  };

  const createBehovOutput = (behovkatalog: Katalog<Behov>) => {
    let newlist = [];
    for (let key in behovkatalog) {
      let value = behovkatalog[key];
      newlist.push(value);
      // Use `key` and `value`
    }
    return newlist.map((element: Behov) => {
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

  const onSubmit = (data: Behov) => {
    const behov: Behov = {
      id: Math.random(),
      tittel: data.tittel,
      beskrivelse: data.beskrivelse
    };
    props.addBehov(behov);
    closeModal();
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
          <AiFillPlusSquare
            size={25}
            onClick={openModal}
            className={styles.icon}
          />
        </div>
        {props.kravbanker[props.selectedKravbank].behov &&
          createBehovOutput(props.kravbanker[props.selectedKravbank].behov)}
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
                pattern: /^[ÆØÅæøåA-Za-z0-9_ ]+$/i,
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

const editBehov = (behovid: number) => ({
  type: '[BEHOV] EDIT',
  payload: behovid
});

const addBehov = (behov: Behov) => ({
  type: '[BEHOV] NEW',
  payload: behov
});
const mapDispatchToProps = (dispatch: any) => {
  const actions = {
    addBehov: (behov: Behov) => dispatch(addBehov(behov)),
    editBehov: (behovid: number) => dispatch(editBehov(behovid))
  };
  return actions;
};

const mapStateToProps = (store: State) => {
  return {
    selectedKravbank: store.selectedkravbank,
    kravbanker: store.kravbanker
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(KravbankEditorSide);
