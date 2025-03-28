/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { paginationComponentOptions } from '../../../utils/optionsConfig'
import { useOrden } from '../../../hooks/useOrden'
import { ViewDollar } from '../../../utils'
import { CSpinner } from '@coreui/react'
import { Modal } from 'react-bootstrap'
import DetalleOrdenComponent from './DetalleOrdenComponent'

export default function ListOrdenes() {
  const { getAllOrdenes, data: ListOrder, abortController, loading } = useOrden()
  const [show, setShow] = useState(false)
  const [idOrden, setidOrden] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  useEffect(() => {
    getAllOrdenes()
    return () => {
      abortController.abort()
    }
  }, [])

  return (
    <div className="py-2 bg-white border-start  border-end border-bottom rounded-bottom">
      <div className="p-2">
        {loading && (
          <div className="text-center py-5" style={{ height: '300px' }}>
            <CSpinner color="primary" variant="border" />
          </div>
        )}

        {ListOrder && !loading && (
          <DataTable
            className="MyDataTableEvent"
            striped
            columns={[
              {
                name: 'Id',
                selector: (row) => row._id,
                width: '60px',
                cell: (row) => {
                  return (
                    <>
                      <button
                        onClick={() => {
                          console.log('test')
                          console.log(row)
                          handleShow()
                          setidOrden(row._id)
                        }}
                        className="btn btn-info btn-sm text-white"
                      >
                        <i className="fa-regular fa-pen-to-square"></i>
                      </button>
                    </>
                  )
                },
              },
              { name: 'Id Order', selector: (row) => row.createdTime },
              {
                name: 'Fecha',
                selector: (row) =>
                  `${new Date(row.createdTime).toLocaleDateString()} - ${new Date(row.createdTime).toLocaleTimeString()}`,
              },
              { name: 'Evento', selector: (row) => row?.evento?.name ?? '' },
              { name: 'Funcion', selector: (row) => row?.funcion?.name ?? '' },
              { name: 'M. Pago', selector: (row) => row?.payment_method ?? '' },

              {
                name: 'Total',
                selector: (row) => (row?.total_order ? ViewDollar(row?.total_order) : ''),
              },
              { name: 'Num .Boletos', selector: (row) => row?.boletos.length ?? '' },
            ]}
            data={ListOrder ?? []}
            pagination
            paginationComponentOptions={paginationComponentOptions}
            noDataComponent="No hay datos para mostrar"
          />
        )}

        <Modal backdrop={'static'} size="lg" centered show={show} onHide={handleClose}>
          <Modal.Body>
            <DetalleOrdenComponent
              onHide={() => {
                handleClose()
              }}
              idOrder={idOrden}
            />
          </Modal.Body>
        </Modal>
      </div>
    </div>
  )
}
