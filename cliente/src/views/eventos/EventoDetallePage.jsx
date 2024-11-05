/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { Nav } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useEvento } from '../../hooks/useEvento'
import EventoDetalle from './components/EventoDetalle'
import FuncionEvento from './components/FuncionEvento'
export default function EventoDetallePage() {
  const { idEvento } = useParams()

  const [Option, setOption] = useState('general_event')

  const { getEventoById, dataDetalle, getFuncionesByEvento,funcionesData } = useEvento()

  useEffect(() => {
    getEventoById(idEvento)
    getFuncionesByEvento(idEvento)
  }, [])

  return (
    <div>
      <Nav
        onSelect={(e) => {
          console.log(e)
          setOption(e)
        }}
        justify
        variant="tabs"
        defaultActiveKey="general_event"
      >
        <Nav.Item>
          <Nav.Link de eventKey="general_event">
            <i className="fa-solid fa-file-invoice me-2"></i>General
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="funciones_event">
            {' '}
            <i className="fa-solid fa-masks-theater me-2"></i>Funciones
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {Option === 'general_event' && <EventoDetalle evento={dataDetalle} />}

      {Option === 'funciones_event' && funcionesData && <FuncionEvento funciones={funcionesData}  getFuncionesByEvento={getFuncionesByEvento} />}
    </div>
  )
}
