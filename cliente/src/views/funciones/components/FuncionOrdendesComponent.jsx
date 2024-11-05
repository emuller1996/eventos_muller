/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import { paginationComponentOptions } from '../../../utils/optionsConfig'
import { ViewDollar } from '../../../utils'
import { Modal } from 'react-bootstrap'
export default function FuncionOrdendesComponent({ ordenes }) {
  const [show, setShow] = useState(false)

  const [OrderDetail, setOrderDetail] = useState(null)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const onClickDetailOrder = (order) => {
    handleShow()
    setOrderDetail(order)
    console.log(order)
  }

  return (
    <div className="py-2 bg-white border-start  border-end border-bottom rounded-bottom" style={{minHeight:"600px"}}>
      <div className="px-2">
        <DataTable
          className="MyDataTableEvent"
          striped
          columns={[
            { name: 'Id Order', selector: (row) => row.createdTime },
            {
              name: 'Fecha',
              selector: (row) =>
                `${new Date(row.createdTime).toLocaleDateString()} - ${new Date(row.createdTime).toLocaleTimeString()}`,
            },
            { name: 'Evento', selector: (row) => row?.evento?.name ?? '' },
            { name: 'Funcion', selector: (row) => row?.funcion?.name ?? '' },
            {
              name: 'Total',
              selector: (row) => (row?.total_order ? ViewDollar(row?.total_order) : ''),
            },
            { name: 'Num .Boletos', selector: (row) => row?.boletos.length ?? '' },
            {
              name: '',
              cell: (row) => {
                return (
                  <div>
                    <button
                      onClick={() => {
                        onClickDetailOrder(row)
                      }}
                      className="btn btn-sm btn-info text-white"
                    >
                      <i className="fa-solid fa-eye"></i>
                    </button>
                  </div>
                )
              },
            },
          ]}
          data={ordenes && ordenes}
          pagination
          paginationComponentOptions={paginationComponentOptions}
          noDataComponent="No hay datos para mostrar"
        />

        <Modal backdrop={'static'} size="lg" centered show={show} onHide={handleClose}>
          <Modal.Body>
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
              <div>
              <hr className='border-info' />
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
              <hr className='border-info' />
                <p className="fw-bold fs-5"> {ViewDollar(OrderDetail?.total_order)}</p>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  )
}
