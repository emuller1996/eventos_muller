import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import FormPuntosVenta from './components/FormPuntosVenta'
import { usePuntoVenta } from '../../hooks/usePuntoVenta'
import DataTable from 'react-data-table-component'
import { ViewDollar } from '../../utils'
import { paginationComponentOptions } from '../../utils/optionsConfig'

const PuntosVentaPage = () => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

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
      <div>
        <Button variant="primary" onClick={handleShow}>
          Crear Puntos Venta
        </Button>
      </div>

      <div className="rounded overflow-hidden border border-ligth shadow-sm mt-3">
        <DataTable
          className="MyDataTableEvent"
          striped
          columns={[
            { name: 'Id', selector: (row) => row._id },
            { name: 'Nombre', selector: (row) => row?.name ?? '', width: '250px' },
            {
              name: 'Tipo',
              selector: (row) => row?.type_sales_point ?? '',
              cell: (row) => {
                return (
                  <>
                    <span className="badge bg-primary text-uppercase">
                      {row?.type_sales_point.replace('_', ' ')}
                    </span>
                  </>
                )
              },
            },
            { name: 'Direccion', selector: (row) => row?.address ?? '', width: '150px' },
            { name: 'Cuidad', selector: (row) => row?.city ?? '' },
          ]}
          data={ListPuntoVenta ?? []}
          pagination
          paginationComponentOptions={paginationComponentOptions}
          noDataComponent="No hay datos para mostrar"
        />
      </div>

      <Modal backdrop={'static'} size="lg" centered show={show} onHide={handleClose}>
        <Modal.Body>
          <FormPuntosVenta onHide={handleClose} />
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default PuntosVentaPage
