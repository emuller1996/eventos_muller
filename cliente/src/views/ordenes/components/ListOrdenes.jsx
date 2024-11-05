/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { paginationComponentOptions } from '../../../utils/optionsConfig'
import { useOrden } from '../../../hooks/useOrden'
import { ViewDollar } from '../../../utils'

export default function ListOrdenes() {
  const { getAllOrdenes, data: ListOrder } = useOrden()

  useEffect(() => {
    getAllOrdenes()
  }, [])

  return (
    <div className="py-2 bg-white border-start  border-end border-bottom rounded-bottom">
      <div className="p-2">
        {ListOrder && (
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
      </div>
    </div>
  )
}
