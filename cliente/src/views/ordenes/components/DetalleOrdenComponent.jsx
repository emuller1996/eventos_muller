/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react'
import { useOrden } from '../../../hooks/useOrden'
import PropTypes from 'prop-types'
import DataTable from 'react-data-table-component'
import { ViewDollar } from '../../../utils'
import { CSpinner } from '@coreui/react'

export default function DetalleOrdenComponent({ idOrder, onHide }) {
  DetalleOrdenComponent.propTypes = {
    idOrder: PropTypes.object,
    onHide: PropTypes.func,
  }

  const { getOrdenById, dataDetalle: OrderDetail, loading } = useOrden()

  useEffect(() => {
    getOrdenById(idOrder)
  }, [])

  return (
    <>
      {loading && (
        <>
          <div className="text-center py-5" style={{ height: '300px' }}>
            <CSpinner color="primary" variant="border" />
          </div>
        </>
      )}
      {OrderDetail && (
        <>
          <div className="bg-info p-2 rounded text-white mb-3">Order Id : {OrderDetail?._id}</div>
          <div className="row">
            <div className="col-md-6">
              <span className="d-block">
                Fecha : {new Date(OrderDetail?.createdTime).toLocaleDateString()}
              </span>
              <span className="d-block">Nombre Cliente : {OrderDetail?.name_client}</span>
              <span className="d-block">Correo Cliente : {OrderDetail?.email_client}</span>
            </div>
            <div className="col-md-6">
              <span className="d-block">Evento : {OrderDetail?.evento?.name}</span>
              <span className="d-block">Funcion : {OrderDetail?.evento?.name}</span>
              <span className="d-block">Correo Cliente : {OrderDetail?.email_client}</span>
            </div>
            {OrderDetail?.mercadopago_data && (
              <div className="col-md-6 mt-2">
                <span className="d-block fw-semibold">Datos de Pago </span>
                <span className="d-block">
                  Metodo de Pago : {OrderDetail?.mercadopago_data?.payment_method_id}
                </span>
                <span className="d-block">
                  Ultimos Numero de la Tarjeta :{' '}
                  {OrderDetail?.mercadopago_data?.card?.last_four_digits}
                </span>
                <span className="d-block">Estado : {OrderDetail?.mercadopago_data?.status}</span>
                <span className="d-block">
                  Monto Neto Recibido :{' '}
                  {ViewDollar(
                    OrderDetail?.mercadopago_data?.transaction_details?.net_received_amount,
                  )}
                </span>

                <span className="d-block">Correo Cliente : {OrderDetail?.email_client}</span>
              </div>
            )}
            <div>
              <hr className="border-info" />
              <DataTable
                className="MyDataTableEvent"
                striped
                columns={[
                  { name: 'Num. Boleto', selector: (row) => row.num_ticket },
                  { name: 'Seccion', selector: (row) => row?.section ?? '' },
                  { name: 'Precio', selector: (row) => ViewDollar(row?.price) ?? '' },
                ]}
                data={OrderDetail?.boletos && OrderDetail?.boletos}
              />
            </div>
            <div className="text-center ">
              <hr className="border-info" />
              <p className="fw-bold fs-5"> {ViewDollar(OrderDetail?.total_order)}</p>
            </div>
          </div>
        </>
      )}
      <div className="text-center">
        <button onClick={onHide} className="btn btn-danger">
          Cerrar
        </button>
      </div>
    </>
  )
}
