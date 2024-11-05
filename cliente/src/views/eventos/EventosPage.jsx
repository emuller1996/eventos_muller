/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import FormEventos from './components/FormEventos'
import { Table } from 'react-bootstrap'
import { useEvento } from '../../hooks/useEvento'
import { Link } from 'react-router-dom'

export default function EventosPage() {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const { getAllEvento, data: ListEvent } = useEvento()

  useEffect(() => {
    getAllEvento()
  }, [])

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
    <div className='card'>
      <div className="card-body">

      <Modal backdrop={'static'} size="lg" centered show={show} onHide={handleClose}>
        <Modal.Body>
          <FormEventos getAllEvento={getAllEvento} onHide={handleClose} />
        </Modal.Body>
      </Modal>
      <div>
        <Button variant="primary" onClick={handleShow}>
          Crear Evento
        </Button>
      </div>

      <div className='mt-3'>
        {/* <p className="text-muted ">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint aliquam distinctio illo
          modi unde inventore veritatis iste cupiditate earum sit odit tempore nostrum a qui itaque
          accusantium, amet, reprehenderit eligendi.
        </p> */}

        {/* <DataTable columns={columns} data={data} /> */}

        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th width="200px">ID</th>
              <th>Nombre Evento</th>
              <th>Categoria</th>
              <th>Fechas</th>
              <th>#</th>
            </tr>
          </thead>
          <tbody>
            {ListEvent &&
              ListEvent.map((eve) => (
                <tr key={eve._id}>
                  <td>{eve._id}</td>
                  <td>{eve.name}</td>
                  <td>{eve.category}</td>
                  <td>
                    {eve.start_date} - {eve.start_date}
                  </td>
                  <td>
                    <Link to={`/d/eventos/det/${eve._id}/`} className="btn btn-sm btn-primary">
                      <i className="fa-solid fa-eye"></i>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
      </div>
    </div>
  )
}
