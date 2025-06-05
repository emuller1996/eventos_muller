/* eslint-disable prettier/prettier */

import React from 'react'
import DataTable from 'react-data-table-component'
import toast from 'react-hot-toast'

import './FuncionesBoletosComponen.css'
import {
  postBoletoAccesoService,
  postBoletoDispobileService,
} from '../../../services/boleto.services'
import { useParams } from 'react-router-dom'
import { Accordion, Button, Modal } from 'react-bootstrap'
import { useState } from 'react'
import QrReader from 'react-qr-scanner'
import BoletoTicketComponent from './BoletoTicketComponent'
import PropTypes from 'prop-types'

export default function FuncionesBoletosComponen({ boletos, getBoletosByFuncionById, estado }) {
  FuncionesBoletosComponen.propTypes = {
    boletos: PropTypes.array,
    getBoletosByFuncionById: PropTypes.func,
    estado: PropTypes.array,
  }

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
        let status = ''
        if (row.status === 'Vendido') {
          status = 'bg-success'
        }
        if (row.status === 'Disponible') {
          status = 'bg-info'
        }
        if (row.status === 'En Venta') {
          status = 'bg-warning'
        }

        return (
          <div>
            <span className={`badge ${status}`}>{row.status}</span>
          </div>
        )
      },
    },
    {
      name: 'status_acces',
      selector: (row) => row.status_acces,
    },
    {
      name: 'Accion',
      selector: (row) => row.status,
      cell: (row) => {
        return (
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

            <button
              type="button"
              className="btn btn-primary btn-sm ms-2"
              onClick={() => {
                setShowData(row)
                setShow(true)
              }}
            >
              Ver Boleto.
            </button>
          </div>
        )
      },
    },
  ]

  const paginationComponentOptions = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
  }

  console.log(Object.keys(Object.groupBy(boletos, ({ section }) => section)))
  const [show, setShow] = useState(false)
  const [showScan, setShowScan] = useState(false)
  const [showData, setShowData] = useState(null)
  const [showCamera, setShowCamera] = useState(false)

  return (
    <div
      className="py-2 bg-white border-start  border-end border-bottom rounded-bottom  "
      style={{ minHeight: '600px' }}
    >
      <div className="px-2">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            setShowScan(true)
          }}
        >
          Escanear Boletos (Registrar Entrada)
        </button>

        <button
          type="button"
          className="btn btn-info text-white ms-2"
          onClick={async () => {
            await getBoletosByFuncionById(idFuncion)
          }}
        >
          Recargar
        </button>
      </div>
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
        </Accordion>

        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>QR BOLETO</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            <BoletoTicketComponent showData={showData} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showScan} onHide={() => setShowScan(false)}>
          <Modal.Header closeButton>
            <Modal.Title>LEER BOLETO</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center " style={{ width: '-webkit-fill-available' }}>
              {showCamera && (
                <QrReader
                  facingMode={'rear'}
                  /*  legacyMode={true} */
                  style={{ width: '100%' }}
                  delay={500}
                  onScan={async (result) => {
                    if (result) {
                      try {
                        console.log(result)
                        setShowCamera(false)
                        const res = await postBoletoAccesoService(result.text)
                        console.log(res)
                        toast.success('Se Registro El Acceso Correctamente.')
                        await getBoletosByFuncionById(idFuncion)
                      } catch (error) {
                        console.log(error)
                        toast.error(error.response.data.message)
                        setShowCamera(false)
                      }
                    }
                  }}
                  onError={(error) => console.log(error?.message)}
                />
              )}
              <button className="btn btn-primary" onClick={() => setShowCamera(!showCamera)}>
                {showCamera ? 'Stop' : 'Start'}
              </button>
              {/* <p>Resultado: {data}</p> */}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowScan(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={() => {}}>
              generatePDF
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  )
}
