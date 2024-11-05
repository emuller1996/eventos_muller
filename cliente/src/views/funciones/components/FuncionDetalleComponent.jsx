/* eslint-disable prettier/prettier */

import React from 'react'

export default function FuncionDetalleComponent({funcion}) {
  return (
    <div  className="py-2 bg-white border-start  border-end border-bottom rounded-bottom" style={{minHeight:"600px"}}>
      <div className="card m-2">
        <div className="card-body">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-6">
          <h4 className="card-title">{funcion?.name}</h4>
          <p className="card-text m-0">
            <span>Categoria : </span> {funcion?.category}
          </p>
          <p className="card-text m-0">
            <span>start_date : </span> {funcion?.start_date}
          </p>
          <p className="card-text m-0">
            <span>end_date : </span> {funcion?.end_date}
          </p>
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
    </div>
  )
}
