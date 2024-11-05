/* eslint-disable prettier/prettier */
import React from 'react'
import PropTypes from 'prop-types'
import { ViewDollar } from '../../../utils'

export default function EventoDetalle({ evento }) {
  EventoDetalle.propTypes = {
    evento: PropTypes.object,
  }
  return (
    <div className="py-2 bg-white border-start  border-end border-bottom rounded-bottom  ">
      <div className="card m-2">
        <div className="card-body">
          
          <h4 className="card-title">{evento?.name}</h4>
          <p className="card-text m-0">
            <span>Categoria : </span> {evento?.category}
          </p>
          <p className="card-text m-0">
            <span>start_date : </span> {evento?.start_date}
          </p>
          <p className="card-text m-0">
            <span>end_date : </span> {evento?.end_date}
          </p>

          <p className="card-text text-center border-top mt-3">Recinto</p>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{evento?.recinto?.name}</h5>
              <p className="card-text m-0">
                <span>Categoria : </span> {evento?.recinto?.category}
              </p>
              <p className="card-text m-0">
                <span>Cuidad : </span> {evento?.recinto?.city}
              </p>
            </div>
          </div>
          <p className="card-text text-center border-top mt-3">Recinto</p>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{evento?.esquema?.name}</h5>
              <div className="mt-2">
                <div className="row">
                  {Array.isArray(evento?.sections_price) &&
                    evento?.sections_price?.map((set) => (
                      <div key={set.name_section} className="col-md-6 col-lg-4 col-xl-3">
                        <div className="card p-2 text-center">
                          <div className="d-flex flex-column">
                            <span>{set.name_section}</span>
                            <span>Boletos : {set.aforo}</span>
                            <span>Precio : {ViewDollar(set.price)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  <div className="card-body"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
