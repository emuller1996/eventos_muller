/* eslint-disable prettier/prettier */

import React, { useEffect, useState } from 'react'
import { Nav } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import FuncionDetalleComponent from './components/FuncionDetalleComponent'
import { useFunciones } from '../../hooks/useFunciones'
import FuncionesBoletosComponen from './components/FuncionesBoletosComponen'
import FuncionOrdendesComponent from './components/FuncionOrdendesComponent'

export default function FuncionDetallePage() {
  const { idFuncion } = useParams()
  const [Option, setOption] = useState('general_funcion')

  const {
    getFuncionById,
    dataDetalle,
    dataBoletos,
    getBoletosByFuncionById,
    getOrdenesByFuncionById,
    dataOrdenes,
  } = useFunciones()

  useEffect(() => {
    getFuncionById(idFuncion)
    getBoletosByFuncionById(idFuncion)
    getOrdenesByFuncionById(idFuncion)
  }, [])

  return (
    <div className="mb-3">
      <Nav
        onSelect={(e) => {
          console.log(e)
          setOption(e)
        }}
        justify
        variant="tabs"
        defaultActiveKey="general_funcion"
      >
        <Nav.Item>
          <Nav.Link de eventKey="general_funcion">
            <i className="fa-solid fa-file-invoice me-2"></i>General
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="funcion_tickets">
            <i className="fa-solid fa-ticket me-2"></i>Boletos
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="funcion_ordenes">
            <i className="fa-solid fa-receipt me-2"></i>Ordenes
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="funcion_metricas">
            <i className="fa-solid fa-chart-bar  me-2"></i>Metricas
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {Option === 'general_funcion' && (
        <FuncionDetalleComponent funcion={dataDetalle && dataDetalle} />
      )}
      {Option === 'funcion_tickets' && dataBoletos && (
        <FuncionesBoletosComponen
          getBoletosByFuncionById={getBoletosByFuncionById}
          boletos={dataBoletos && dataBoletos.boletos}
          estado={dataBoletos && dataBoletos.estado}
          funcion={dataDetalle && dataDetalle}
        />
      )}
      {Option === 'funcion_ordenes' && <FuncionOrdendesComponent ordenes={dataOrdenes} />}
    </div>
  )
}
