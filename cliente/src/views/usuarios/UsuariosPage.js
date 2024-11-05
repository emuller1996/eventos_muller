import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import FormUsuarios from './components/FormUsuarios'

const UsuariosPage = () => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  return (
    <div>
      <div>
        <Button variant="primary" onClick={handleShow}>
          Crear Usuarios
        </Button>
      </div>
      <p>UsuariosPage </p>

      <Modal backdrop={'static'} size="lg" centered show={show} onHide={handleClose}>
        <Modal.Body>
          <FormUsuarios onHide={handleClose} />
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default UsuariosPage
