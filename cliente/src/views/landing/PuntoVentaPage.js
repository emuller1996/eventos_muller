import React, { useEffect, useState } from 'react'
import { useFunciones } from '../../hooks/useFunciones'
import { Link } from 'react-router-dom'
import { usePuntoVenta } from '../../hooks/usePuntoVenta'

const PuntoVentaPage = () => {
  const { getAllPuntoVenta, data: ListPuntoVenta, loading, abortController } = usePuntoVenta()

  useEffect(() => {
    getAllPuntoVenta()

    return () => {
      console.log('test')
      console.log(abortController)
      abortController.abort()
    }
  }, [])
  return (
    <div>
      <div className="container mt-4">
        <h4 className="text-center ">Puntos Venta</h4>

        {ListPuntoVenta &&
          ListPuntoVenta.map((punto) => (
            <div
              key={punto._id}
              className="card  mb-3"
              style={{ border: '1px solid rgb(239 204 208)' }}
            >
              <div className="card-body">
                <div className="mt-3 d-flex justify-content-between ">
                  <h4 className="card-title">{punto?.name}</h4>
                  <span className="badge m-3 bg-secondary text-uppercase">
                    {punto?.type_sales_point}
                  </span>
                </div>

                <div className="mt-3 d-flex justify-content-start align-items-center">
                  <i className="fa-solid fa-map-location-dot fa-2x"></i>
                  <div>
                    <span className="ms-3 d-block">{punto?.name}</span>
                    <span className="ms-3 d-block">{punto?.city}</span>
                    <span className="ms-3 d-block">{punto?.address}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default PuntoVentaPage
