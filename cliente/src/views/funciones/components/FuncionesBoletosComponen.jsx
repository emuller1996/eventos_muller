/* eslint-disable prettier/prettier */

import React from 'react'
import DataTable from 'react-data-table-component'
import toast from 'react-hot-toast'

import './FuncionesBoletosComponen.css'
import { postBoletoDispobileService } from '../../../services/boleto.services'
import { useParams } from 'react-router-dom'
import { Accordion } from 'react-bootstrap'

export default function FuncionesBoletosComponen({ boletos, getBoletosByFuncionById, estado }) {
  const { idFuncion } = useParams()

  const columns = [
    {
      name: 'Numero de Boleto',
      selector: (row) => row.num_ticket,
    },
    {
      name: 'Seccion',
      selector: (row) => row.section,
    },
    {
      name: 'Estado',
      selector: (row) => row.status,
      cell: (row) => {
        let status = ""
        if(row.status === 'Vendido'){
          status ='bg-success';
        }
        if(row.status === 'Disponible'){
          status ='bg-info';
        }
        if(row.status === 'En Venta'){
          status ='bg-warning';
        }

        return (
          <div>
            <span className={`badge ${status}`}>{row.status}</span>
          </div>
        )
      },
    },
    {
      name: 'Accion',
      selector: (row) => row.status,
      cell: (row) => (
        <div>
          <button
            disabled={row.status !== 'En Venta'}
            className="btn btn-sm btn-info"
            onClick={async () => {
              try {
                const res = await postBoletoDispobileService(row._id)
                await getBoletosByFuncionById(idFuncion)
                toast.success(res.data.message)
              } catch (error) {
                console.log(error)
              }
            }}
          >
            Poner Disponible
          </button>
        </div>
      ),
    },
  ]

  const paginationComponentOptions = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
  }

  console.log(Object.keys(Object.groupBy(boletos, ({ section }) => section)))

  return (
    <div className="py-2 bg-white border-start  border-end border-bottom rounded-bottom  " style={{minHeight:"600px"}}>
      <div className="px-2">
        <div className="my-2 d-flex gap-2">
          {estado &&
            estado.map((c) => (
              <div key={c.key} className="card p-1 text-center">
                <span>{c.key}</span>
                <span className="d-block ">{c.doc_count}</span>
              </div>
            ))}
        </div>

        <Accordion>
          {Object.keys(Object.groupBy(boletos, ({ section }) => section)).map((sec) => (
            <>
              <Accordion.Item eventKey={sec}>
                <Accordion.Header>{sec}</Accordion.Header>
                <Accordion.Body>
                  <div className="0">
                    <DataTable
                      className="Table_Boletos"
                      striped
                      columns={columns}
                      data={Object.groupBy(boletos, ({ section }) => section)[sec].sort(
                        (a, b) => a.order_num_ticket - b.order_num_ticket,
                      )}
                      pagination
                      paginationComponentOptions={paginationComponentOptions}
                      noDataComponent="No hay datos para mostrar"
                    />
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </>
          ))}
          {/* <Accordion.Item eventKey="0">
            <Accordion.Header>GENERAL</Accordion.Header>
            <Accordion.Body>
              <div className='0'>

              <DataTable
                className="Table_Boletos"
                striped
                columns={columns}
                data={boletos}
                pagination
                paginationComponentOptions={paginationComponentOptions}
                noDataComponent="No hay datos para mostrar"
              />
              </div>
            </Accordion.Body>
          </Accordion.Item> */}
        </Accordion>
        {/*  <DataTable
          className="Table_Boletos"
          striped
          columns={columns}
          data={boletos}
          pagination
          paginationComponentOptions={paginationComponentOptions}
          noDataComponent="No hay datos para mostrar"
        /> */}
      </div>
    </div>
  )
}
