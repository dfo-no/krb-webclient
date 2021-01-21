import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { AiFillEdit, AiFillPlusSquare } from 'react-icons/ai';

import { Need } from '../models/Need';
import styles from './KravbankEditorSide.module.scss';
import { RootState } from '../store/configureStore';
import { addNeed, editNeed } from '../store/reducers/kravbank-reducer';
import { Col, Row } from 'react-bootstrap';

function KravbankEditorSide(): ReactElement {
  const dispatch = useDispatch();
  const { projects, selectedProject } = useSelector(
    (state: RootState) => state.kravbank
  );

  const { register, handleSubmit } = useForm<Need>();
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const history = useHistory();

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleEdit = (id: number) => (event: any) => {
    dispatch(editNeed(id));
    history.push(`/workbench/${id}/need`);
  };

  const createNeedOutput = (needList: Need[]) => {
    return needList.map((element: Need) => {
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

  const onSubmit = (data: Need) => {
    const need: Need = {
      id: Math.random(),
      tittel: data.tittel,
      beskrivelse: data.beskrivelse,
      requirements: []
    };
    dispatch(addNeed(need));
    closeModal();
  };

  return selectedProject ? (
    <Row>
      <Col className="col-12 p-5">
        <h1>{projects[selectedProject.id].title}</h1>
        <label className={styles.formlabel}>
          <b>Tittel</b>
          <input
            type="text"
            name="tittel"
            defaultValue={projects[selectedProject.id].title}
          />
        </label>
        <label className={styles.formlabel}>
          <b>Beskrivelse</b>
          <input
            type="text"
            name="tittel"
            defaultValue={projects[selectedProject.id].description}
          />
        </label>
        <div>
          <div className={styles.subsection}>
            <h2>Behov</h2>
            <AiFillPlusSquare onClick={openModal} className={styles.icon} />
          </div>
          {projects[selectedProject.id].needs &&
            createNeedOutput(projects[selectedProject.id].needs)}
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
            <input type="submit" value="New need" />
          </form>
        </Modal>
      </Col>
    </Row>
  ) : (
    <div></div>
  );
}

export default KravbankEditorSide;
