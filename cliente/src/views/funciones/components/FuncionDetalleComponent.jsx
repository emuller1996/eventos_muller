/* eslint-disable prettier/prettier */

import React from 'react'
import { ViewDollar } from '../../../utils'

export default function FuncionDetalleComponent({ funcion }) {
  return (
    <div
      className="py-2 bg-white border-start  border-end border-bottom rounded-bottom"
      style={{ minHeight: '600px' }}
    >
      <div className="card m-2">
        <div className="card-body">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-6">
              <h4 className="card-title">{funcion?.name}</h4>
              <p className="card-text m-0">
                <span>Categoria : </span> {funcion?.evento?.category}
              </p>
              <p className="card-text m-0">
                <span>Fecha Inicio : </span> {funcion?.start_date}
              </p>
              <p className="card-text m-0">
                <span>Fecha Fin : </span> {funcion?.end_date}
              </p>
              <p>{funcion?.evento?.description}</p>
              <button className="btn btn-info"></button>
            </div>
            <div className="col-md-6">
              <div className=" d-flex gap-4 justify-content-center">
                <div className="rounded-4 border overflow-hidden">
                  <img src={funcion?.image} alt="Preview" width="200px" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card mt-4 m-2">
        <div className="card-body">
          <p className="text-center fw-semibold">Cargos por Servicios</p>
          <div className="table-responsive">
            <table className="table table-striped table-borderless  align-middle">
              <thead className="table-light">
                <tr>
                  <th>SECCION</th>
                  <th>PRECIO</th>
                  <th>CARGO</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {funcion?.evento?.sections_price.map((sec) => (
                  <tr key={sec.name_section} className="">
                    <td scope="row">{sec.name_section}</td>
                    <td>{ViewDollar(sec.price)}</td>
                    <td width={"200px"}><input type="number"  className='form-control'/></td>
                  </tr>
                ))}
              </tbody>
              <tfoot></tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
