import React, { ReactElement } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styles from './AlertModal.module.scss';

interface IProps {
  modalShow: boolean;
  setModalShow: (value: boolean) => void;
  text: string;
  title?: string;
}

export default function AlertModal({
  modalShow,
  setModalShow,
  text,
  title
}: IProps): ReactElement {
  const clsName = `modal__header--warning`;

  return (
    <Modal
      animation={false}
      show={modalShow}
      onHide={() => setModalShow(false)}
    >
      <Modal.Header closeButton className={`${styles[clsName]}`}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{text}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => setModalShow(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

AlertModal.defaultProps = {
  title: 'Error'
};
