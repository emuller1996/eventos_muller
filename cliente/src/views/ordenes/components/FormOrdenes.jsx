/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { useEvento } from '../../../hooks/useEvento'
import DataTable from 'react-data-table-component'
import Select from 'react-select'
import { getBoletoBySeccionByidService } from '../../../services/funciones.services'
import { useForm } from 'react-hook-form'
import { Form } from 'react-bootstrap'
import { ViewDollar } from '../../../utils'
import toast from 'react-hot-toast'
import { postCrearOrdenService } from '../../../services/ordenes.services'

export default function FormOrdenes() {
  const {
    getAllEvento,
    data: ListEventos,
    funcionesData: FuncionesEventos,
    getFuncionesByEvento,
  } = useEvento()

  useEffect(() => {
    getAllEvento()
  }, [])

  const [EventoSelecionado, setEventoSelecionado] = useState(null)
  const [FuncionSelecionado, setFuncionSelecionado] = useState(null)
  const [OpcionesBoletos, setOpcionesBoletos] = useState(null)
  const [BoletosSelecionados, setBoletosSelecionados] = useState([])

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm()

  useEffect(() => {}, [])

  const onSubmit = async (data) => {
    if (BoletosSelecionados.length === 0) {
      return toast.error('Debe Agregar almenos un Boleto.')
    }
    console.log(data)
    console.log(
      BoletosSelecionados.map((bol) => {
        return {
          _id: bol._id,
          price: bol.price,
          num_ticket: bol.num_ticket,
        }
      }),
    )
    data.boletos = BoletosSelecionados.map((bol) => {
      return {
        _id: bol._id,
        price: bol.price,
        num_ticket: bol.num_ticket,
        section: bol.section,
      }
    })
    data.evento_id = EventoSelecionado._id
    data.funcion_id = FuncionSelecionado._id
    data.total_order = parseFloat(BoletosSelecionados.reduce((prev, curr) => prev + curr.price, 0))
    console.log(data)

    try {
      const res = await postCrearOrdenService(data)
      toast.success(res.data.message)
      reset()
      setBoletosSelecionados([])
      setEventoSelecionado(null)
      setFuncionSelecionado(null)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-2 bg-white border-start  border-end border-bottom rounded-bottom"
    >
      {EventoSelecionado && !FuncionSelecionado && (
        <div className="text-center">
          <button
            className="btn btn-sm btn-danger text-white"
            onClick={(e) => {
              setEventoSelecionado(null)
            }}
          >
            <i className="fa-solid fa-angle-right me-2"></i>Cancelar
          </button>
        </div>
      )}
      {FuncionSelecionado && (
        <div className="text-center">
          <button
            className="btn btn-sm btn-danger text-white"
            onClick={(e) => {
              setFuncionSelecionado(null)
            }}
          >
            <i className="fa-solid fa-angle-right me-2"></i>Cancelar
          </button>
        </div>
      )}
      {!EventoSelecionado && (
        <div className="row  g-3">
          {ListEventos.map((eve) => (
            <div key={eve._id} className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex gap-2 flex-column align-items-center">
                    <span>{eve.name}</span>
                    <button
                      className="btn btn-sm btn-info text-white"
                      onClick={async (e) => {
                        setEventoSelecionado(eve)
                        setOpcionesBoletos(
                          eve.sections_price.map((sec) => {
                            return {
                              label: `${sec.name_section}`,
                              value: `${sec.name_section}`,
                              data: sec,
                            }
                          }),
                        )
                        await getFuncionesByEvento(eve._id)
                      }}
                    >
                      <i className="fa-solid fa-angle-right me-2"></i>Selecionar Evento
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {EventoSelecionado && !FuncionSelecionado && (
        <div className="row  g-3 mt-3">
          {FuncionesEventos &&
            FuncionesEventos.map((eve) => (
              <div key={eve._id} className="col-md-4">
                <div className="card">
                  <img
                    className="card-img-top img-fluid"
                    style={{ height: '150px' }}
                    src={eve.image}
                    alt="Title"
                  />
                  <div className="card-body">
                    <div className="d-flex gap-2 flex-column align-items-center">
                      <span>{eve.name}</span>
                      <button
                        className="btn btn-sm btn-info text-white"
                        onClick={(e) => {
                          console.log(eve)
                          setFuncionSelecionado(eve)
                        }}
                      >
                        <i className="fa-solid fa-angle-right me-2"></i>Selecionar Funcion
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      {EventoSelecionado && FuncionSelecionado && (
        <div className="py-1">
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3" controlId="name_client">
                <Form.Label>Nombre Cliente</Form.Label>
                <Form.Control
                  {...register('name_client')}
                  type="text"
                  placeholder="Ingrese el Nombre del cliente aca"
                />
              </Form.Group>
            </div>

            <div className="col-md-6">
              <Form.Group className="mb-3" controlId="email_client">
                <Form.Label>Correo Cliente</Form.Label>
                <Form.Control
                  {...register('email_client')}
                  type="text"
                  placeholder="Ingrese el Nombre del cliente aca"
                />
              </Form.Group>
            </div>
          </div>
          <hr />
          <div className="col-md-4 mx-auto">
            <Select
              /*  getOptionValue={(e) => {
                console.log(e)
              }} */
              onChange={async (e) => {
                console.log(e)
                console.log(FuncionSelecionado._id)

                try {
                  const result = await getBoletoBySeccionByidService(FuncionSelecionado._id, {
                    section: e.value,
                  })

                  setBoletosSelecionados((status) => {
                    return [...status, { ...result.data.boleto, price: e.data.price }]
                  })
                } catch (error) {
                  if (error.status === 400) {
                    toast.error(error.response.data.message)
                  }
                  console.log(error)
                }
              }}
              placeholder="Selecione una Secion"
              options={OpcionesBoletos}
            />
          </div>
          <div className="border p-2 rounded mt-3">
            <DataTable
              noDataComponent="No Hay Boletos en la Orden."
              columns={[
                { name: 'Seccion', selector: (row) => row.section },
                { name: 'Numero Boleto', selector: (row) => row.num_ticket },
                { name: 'Precio', selector: (row) => row.price },
              ]}
              data={BoletosSelecionados}
            />
          </div>
          <div className="row g-5 mt-2">
            {['Efectivo', 'Tarjeta'].map((type) => (
              <div key={type} className="col-md-3 mt-0">
                <Form.Check type={type} id={`check-api-${type}`}>
                  <Form.Check.Input
                    {...register('payment_method', { required: true })}
                    /* style={{ display: 'none' }} */
                    value={type}
                    type="radio"
                    name="payment_method"
                  />
                  <Form.Check.Label>
                    <div>{`${type}`}</div>
                  </Form.Check.Label>
                </Form.Check>
              </div>
            ))}
          </div>
          <div className="d-flex justify-content-center align-items-center gap-4 mt-4">
            <span> Total </span>
            <span className="fw-bold fs-5 text-success">
              {' '}
              {ViewDollar(BoletosSelecionados.reduce((prev, curr) => prev + curr.price, 0))}
            </span>
          </div>
          <div className="text-center mt-4">
            <button className="btn btn-primary">General Orden</button>
          </div>
        </div>
      )}
    </form>
  )
}
