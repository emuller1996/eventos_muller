/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import FormRecinto from './components/FormRecinto'
import { useRecintos } from '../../hooks/useRecintos'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

export default function RecintoPage() {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const { getAllRecintos, data: ListRecintos } = useRecintos()

  useEffect(() => {
    getAllRecintos()
  }, [])

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Crear Recinto
      </Button>

      <Modal backdrop={'static'} size="lg" centered show={show} onHide={handleClose}>
        <Modal.Body>
          <FormRecinto onHide={handleClose} getAllRecintos={getAllRecintos} />
        </Modal.Body>
      </Modal>
      <div>
        <p className="text-muted">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint aliquam distinctio illo
          modi unde inventore veritatis iste cupiditate earum sit odit tempore nostrum a qui itaque
          accusantium, amet, reprehenderit eligendi.
        </p>
        <div className="table-responsive">
          <table className="table  ">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Nombre</th>
                <th scope="col">Cartegoria</th>
                <th scope="col">Ciudad</th>
                <th scope="col">Direccion</th>
                <th scope="col" width="200px" >Acciones</th>
              </tr>
            </thead>
            <tbody>
              {ListRecintos &&
                ListRecintos.map((recinto) => (
                  <tr key={recinto?._id} className="">
                    <td scope="row">{recinto?._id}</td>
                    <td>{recinto?.name}</td>
                    <td>{recinto?.category}</td>
                    <td>{recinto?.city}</td>
                    <td>{recinto?.address}</td>
                    <td>
                      <div className="input-group mb-3">
                          <Link className="btn btn-sm btn-outline-info" to={`/d/recintos/${recinto._id}/esquemas`}>
                          <i className="fa-solid fa-person-rays"></i>Esquemas
                          </Link>
                        <button className="btn btn-sm btn-outline-primary" type="button" id="">
                        <i className="fa-regular fa-pen-to-square"></i>
                        </button>
                        <button className="btn btn-sm btn-outline-danger" type="button" id="">
                        <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
