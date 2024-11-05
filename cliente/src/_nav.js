import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/d/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Gestion de Eventos',
  },
  {
    component: CNavItem,
    name: 'Eventos',
    to: '/d/eventos',
    icon: <i style={{ width: '30px' }} className="fa-solid fa-calendar-days nav-icon"></i>,
  },
  {
    component: CNavItem,
    name: 'Funciones',
    to: '/d/funciones',
    icon: <i style={{ width: '30px' }} className="fa-solid fa-masks-theater nav-icon"></i>,
  },
  {
    component: CNavItem,
    name: 'Recintos',
    to: '/d/recintos',
    icon: <i style={{ width: '30px' }} className="fa-solid fa-location-dot nav-icon"></i>,
  },
  {
    component: CNavTitle,
    name: 'Tabla de Control',
  },
  {
    component: CNavItem,
    name: 'Ordenes',
    to: '/d/ordenes',
    icon: <i style={{ width: '30px' }} className="fa-solid fa-receipt nav-icon"></i>,
  },

  {
    component: CNavTitle,
    name: 'Configuraciones',
  },
  {
    component: CNavItem,
    name: 'Usuarios',
    to: '/d/usuarios',
    icon: <i style={{ width: '30px' }} className="fa-solid fa-users nav-icon"></i>,
  },
  {
    component: CNavItem,
    name: 'Puntos de Venta',
    to: '/d/puntos-ventas',
    icon: <i style={{ width: '30px' }} className="fa-solid fa-store nav-icon"></i>,
  },
]

export default _nav
