/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { useRecintos } from '../../../hooks/useRecintos'

export default function EsquemaPage() {
  const { idRecinto } = useParams()

  const { getEsquemasByRecinto, esquemasRecinto } = useRecintos()

  useEffect(() => {
    getEsquemasByRecinto(idRecinto)
  }, [idRecinto])

  return (
    <div>
      <div className="d-flex justify-content-between">
        <Link to={`/recintos`} className="btn btn-danger text-white ">
          <i className="fa-solid fa-angles-left me-2"></i>Atras a Recintos
        </Link>
        <Link to={`crear`} className="btn btn-primary text-white ">
          <i className="fa-solid fa-plus me-2"></i>Crear Esquema
        </Link>
      </div>
      <div className="row mt-4">
        {esquemasRecinto &&
          esquemasRecinto.map((esque) => (
            <div key={esque._id} className="col-md-6">
              <div className="card text-muted">
                <div className="card-body">
                  <p className='text-primary fw-bold fs-5' >{esque.name}</p>
                  <ul className="list-group">
                    {esque.sections.map(sec =>(
                    <li key={sec?.name_section} className="list-group-item d-flex justify-content-between align-items-center">
                      {sec?.name_section} {`[ ${sec?.letra} ]`}
                      <span className="badge bg-secondary badge-pill">Aforo:  {sec?.aforo}</span>
                    </li>
                    ))}
                  </ul>

                  <div className="d-flex justify-content-between">
                    <span>{esque?.aforo}</span>
                    <span>{esque?.aforo}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
