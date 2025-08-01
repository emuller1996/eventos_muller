/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react'
import { useFunciones } from '../../hooks/useFunciones'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { deleteFuncionByIdService } from '../../services/funciones.services'

export default function FuncionesPage() {
  const { getAllFunciones, data: ListFunciones } = useFunciones()

  useEffect(() => {
    getAllFunciones()
  }, [])

  return (
    <div>
      <div>
        <p className="text-muted">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint aliquam distinctio illo
          modi unde inventore veritatis iste cupiditate earum sit odit tempore nostrum a qui itaque
          accusantium, amet, reprehenderit eligendi.
        </p>

        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th width="200px">Imagen</th>
              <th width="">Nombre Funcion</th>
              <th width="400px">Fechas</th>
              <th width="20px">#</th>
            </tr>
          </thead>
          <tbody>
            {ListFunciones &&
              ListFunciones.map((eve) => (
                <tr key={eve._id}>
                  {/* <td>{eve._id}</td> */}
                  <td>
                    <div>
                      {eve?.image && (
                        <img
                          className="rounded-4 border  overflow-hidden"
                          src={eve?.image}
                          alt="Preview"
                          width="90px"
                        />
                      )}
                    </div>
                  </td>
                  <td>{eve.name}</td>
                  <td>
                    {eve.start_date} - {eve.start_date}
                  </td>
                  <td>
                    <div className="btn-group" role="group">
                      <Link to={`/d/funcion/det/${eve._id}/`} className="btn btn-sm btn-primary">
                        <i className="fa-solid fa-eye"></i>
                      </Link>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => {
                          toast.custom((t) => (
                            <div className={`${t.visible ? 'animate-enter' : 'animate-leave'}`}>
                              <div
                                className="alert alert-warning alert-dismissible fade show"
                                role="alert"
                              >
                                <strong>Hey!</strong> Seguro Quiere Borrar esta funcion?
                                <div className="d-block text-center">
                                  <div
                                    className="btn-group"
                                    role="group"
                                    aria-label="Button group name"
                                  >
                                    <button
                                      type="button"
                                      onClick={async () => {
                                        try {
                                          const result = await deleteFuncionByIdService(eve._id)
                                          toast.dismiss(t.id)
                                          toast.success(result.data.message)
                                          await getAllFunciones()
                                        } catch (error) {
                                          console.log(error)
                                        }
                                      }}
                                      className="btn btn-success"
                                    >
                                      SI
                                    </button>
                                    <button
                                      onClick={() => toast.dismiss(t.id)}
                                      type="button"
                                      className="btn btn-danger"
                                    >
                                      NO!!!
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        }}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  )
}
