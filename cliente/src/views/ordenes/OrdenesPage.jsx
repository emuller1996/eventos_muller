/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { Nav, Table } from 'react-bootstrap'
import FormOrdenes from './components/FormOrdenes'
import ListOrdenes from './components/ListOrdenes'

export default function OrdenesPage() {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [Option, setOption] = useState('generate_order')

 

  const columns = [
    {
      name: 'Title',
      selector: (row) => row.title,
    },
    {
      name: 'Year',
      selector: (row) => row.year,
    },
  ]

  const data = [
    {
      id: 1,
      title: 'Beetlejuice',
      year: '1988',
    },
    {
      id: 2,
      title: 'Ghostbusters',
      year: '1984',
    },
  ]
  return (
    <div>
      <Nav
        onSelect={(e) => {
          console.log(e)
          setOption(e)
        }}
        justify
        variant="tabs"
        defaultActiveKey="generate_order"
      >
        <Nav.Item>
          <Nav.Link de eventKey="generate_order">
            <i className="fa-solid fa-cash-register me-2"></i>Generar Orden
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="order_history">
            <i className="fa-solid fa-timeline me-2"></i> Historial Ordenes
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <Modal backdrop={'static'} size="lg" centered show={show} onHide={handleClose}>
        <Modal.Body></Modal.Body>
      </Modal>
      {/* <div>
        <Button variant="primary" onClick={handleShow}>
          Crear Orden
        </Button>
      </div> */}

      {Option === 'generate_order' && <FormOrdenes />}

      {Option === 'order_history' && <ListOrdenes  />}

      {Option === 'order_history' && (
        <div>
         

          
        </div>
      )}
    </div>
  )
}
