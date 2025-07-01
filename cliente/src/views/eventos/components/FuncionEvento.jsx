/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link, useParams } from 'react-router-dom'
import { Button, ButtonGroup, Modal } from 'react-bootstrap'
import FormEventoFuncion from './FormEventoFuncion'
import './FuncionEvento.css'

export default function FuncionEvento({ funciones, getFuncionesByEvento }) {
  FuncionEvento.propTypes = {
    funciones: PropTypes.array,
    getFuncionesByEvento: PropTypes.func,
  }
  const [FuncionSeleciona, setFuncionSeleciona] = useState(null)

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const { idEvento } = useParams()

  return (
    <div className="py-3 bg-white border-start  border-end border-bottom rounded-bottom">
      <div className="mb-3 text-center">
        <button
          className="btn btn-primary"
          onClick={() => {
            setShow(true)
            setFuncionSeleciona(null)
          }}
        >
          {' '}
          <i className="fa-solid fa-plus me-2"></i> Crear Funcion
        </button>
      </div>
      {funciones &&
        funciones.map((fun) => (
          <div key={fun._id} className="card card-show mx-3 mb-3">
            <div className="card-body ">
              <div className="d-flex align-items-center">
                <div className="w-100">
                  <h5 className="card-title">{fun?.name}</h5>
                  <p className="card-text m-0">
                    <span>start_date : </span> {fun?.start_date}
                  </p>
                  <p className="card-text m-0">
                    <span>end_date : </span> {fun?.end_date}
                  </p>
                  <p className="card-text m-0">
                    <span>description : </span> {fun?.description}
                  </p>
                </div>
                <div className="flex-shrink-1 col-2">
                  <ButtonGroup>
                    <Link to={`/d/funcion/det/${fun?._id}/`} className="btn btn-primary">
                      <i className="fa-solid fa-eye"></i>
                    </Link>
                    <Button
                      onClick={() => {
                        setFuncionSeleciona(fun)
                        setShow(true)
                      }}
                      variant="info text-white"
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Button>
                  </ButtonGroup>
                </div>
              </div>
            </div>
          </div>
        ))}

      <Modal backdrop={'static'} size="lg" centered show={show} onHide={handleClose}>
        <Modal.Body>
          <FormEventoFuncion
            idEvento={idEvento}
            onHide={handleClose}
            Funcion={FuncionSeleciona}
            getAllFuncion={getFuncionesByEvento}
          />
        </Modal.Body>
      </Modal>
    </div>
  )
}
