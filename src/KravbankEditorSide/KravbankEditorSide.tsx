import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { AiFillEdit, AiFillPlusSquare } from 'react-icons/ai';

import { Behov } from '../models/Behov';
import styles from './KravbankEditorSide.module.scss';
import { RootState } from '../store/configureStore';
import { addBehov, editBehov } from '../store/reducers/kravbank-reducer';
import { Col, Row } from 'react-bootstrap';
import SideBar from '../SideBar/SideBar';

function KravbankEditorSide(): ReactElement {
  const dispatch = useDispatch();
  const { kravbanker, selectedKravbank } = useSelector(
    (state: RootState) => state.kravbank
  );

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
    dispatch(editBehov(id));
    history.push(`/edit/behov/${id}`);
  };

  const createBehovOutput = (behovList: Behov[]) => {
    return behovList.map((element: Behov) => {
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
    dispatch(addBehov(behov));
    closeModal();
  };

  return kravbanker[selectedKravbank] ? (
<<<<<<< HEAD
    <Row>
      <Col className="col-2 p-0">
        <SideBar />
      </Col>
      <Col className="col-10 p-5">
        <h1>{kravbanker[selectedKravbank].tittel}</h1>
        <label className={styles.formlabel}>
          <b>Tittel</b>
          <input
            type="text"
            name="tittel"
            defaultValue={kravbanker[selectedKravbank].tittel}
          />
        </label>
        <label className={styles.formlabel}>
          <b>Beskrivelse</b>
          <input
            type="text"
            name="tittel"
            defaultValue={kravbanker[selectedKravbank].beskrivelse}
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
          {kravbanker[selectedKravbank].behov &&
            createBehovOutput(kravbanker[selectedKravbank].behov)}
=======
    <Col className="col-20 p-5">
      <h1>{kravbanker[selectedKravbank].tittel}</h1>
      <label className={styles.formlabel}>
        <b>Tittel</b>
        <input
          type="text"
          name="tittel"
          defaultValue={kravbanker[selectedKravbank].tittel}
        />
      </label>
      <label className={styles.formlabel}>
        <b>Beskrivelse</b>
        <input
          type="text"
          name="tittel"
          defaultValue={kravbanker[selectedKravbank].beskrivelse}
        />
      </label>
      <div>
        <div className={styles.subsection}>
          <h2>Behov</h2>
          <AiFillPlusSquare onClick={openModal} className={styles.icon} />
>>>>>>> bc9d57f755d5345995cb8997f363c16d2f0a895e
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
            autoComplete="off"
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
            <input type="submit" value="Oprett behov" />
          </form>
        </Modal>
      </Col>
    </Row>
  ) : (
    <div></div>
  );
}

export default KravbankEditorSide;
