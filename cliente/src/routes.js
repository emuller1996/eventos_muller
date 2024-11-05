import React from 'react'
import OrdenesPage from './views/ordenes/OrdenesPage'
import FuncionDetallePage from './views/funciones/FuncionDetallePage'
import PuntosVentaPage from './views/puntos-venta/PuntosVentaPage'
import UsuariosPage from './views/usuarios/UsuariosPage'
const EventosPage = React.lazy(() => import('./views/eventos/EventosPage'))
const FuncionesPage = React.lazy(() => import('./views/funciones/FuncionesPage'))
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const RecintoPage = React.lazy(() => import('./views/recintos/RecintoPage'))
const EsquemaPage = React.lazy(() => import('./views/recintos/esquemas/EsquemaPage'))
const FormEsquemaPage = React.lazy(
  () => import('./views/recintos/esquemas/components/FormEsquemaPage'),
)
const EventoDetallePage = React.lazy(() => import('./views/eventos/EventoDetallePage'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/eventos', name: 'Eventos', element: EventosPage },
  { path: '/eventos/det/:idEvento', name: 'Evento Detalle', element: EventoDetallePage },
  { path: '/funciones', name: 'Funciones', element: FuncionesPage },
  { path: '/funcion/det/:idFuncion', name: 'funciones', element: FuncionDetallePage },
  { path: '/recintos/:idRecinto/esquemas', name: 'Recintos / Esquemas', element: EsquemaPage },
  {
    path: '/recintos/:idRecinto/esquemas/crear',
    name: 'Recintos / Esquemas / Crear',
    element: FormEsquemaPage,
  },
  { path: '/recintos', name: 'Recintos', element: RecintoPage },
  { path: '/ordenes', name: 'Ordenes', element: OrdenesPage },
  { path: '/puntos-ventas', name: 'Ordenes', element: PuntosVentaPage },
  { path: '/usuarios', name: 'Ordenes', element: UsuariosPage },
]

export default routes
