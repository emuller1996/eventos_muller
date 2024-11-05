/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useRecintos } from '../../../hooks/useRecintos'
import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import { postCreateEventoService } from '../../../services/eventos.services'
import toast from 'react-hot-toast'
import DataTable from 'react-data-table-component'

export default function FormEventos({ onHide, getAllEvento }) {
  FormEventos.propTypes = {
    onHide: PropTypes.func,
    getAllEvento: PropTypes.func,
  }

  const { getAllRecintos, getEsquemasByRecinto, data: Recintos, esquemasRecinto } = useRecintos()

  const [Secciones, setSecciones] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [base64Image, setBase64Image] = useState('')

  useEffect(() => {
    getAllRecintos()
  }, [])

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    console.log(data)
    data.sections_price = Secciones
    data.image = base64Image ?? null
    try {
      const res = await postCreateEventoService(data)
      console.log(res.data)
      toast.success(res.data.message)
      onHide()
      await getAllEvento()
    } catch (error) {
      console.log(error)
    }
  }

  // Función para manejar la selección de archivo
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedImage(file)
      convertToBase64(file)
    }
  }

  // Convertir imagen a Base64
  const convertToBase64 = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setBase64Image(reader.result)
    }
    reader.onerror = (error) => {
      console.error('Error al convertir la imagen a Base64:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className="text-center border-bottom pb-2">Crea un Nuevo Evento</p>

      <p className="text-primary text-center border-bottom border-primary pb-2">
        Informacion Basica
      </p>
      <div className="row">
        <div className="col-md-6">
          <Form.Group className="mb-3" controlId="name_event">
            <Form.Label>Nombre Evento</Form.Label>
            <Form.Control
              {...register('name_event', { required: true })}
              type="text"
              placeholder="Liga, Concierto ..... Aventura, Feid"
            />
          </Form.Group>
        </div>
        <div className="col-md-6">
          <Form.Group className="mb-3" controlId="category">
            <Form.Label>Categoria</Form.Label>
            <Form.Control
              {...register('category', { required: true })}
              type="text"
              placeholder="Musica, Deportivo, Futbol, Trap, ...."
            />
          </Form.Group>
        </div>
        <div className="col-md-6">
          <Form.Group className="mb-3" controlId="start_date">
            <Form.Label>Fecha Inicio</Form.Label>
            <Form.Control {...register('start_date', { required: true })} type="date" />
          </Form.Group>
        </div>
        <div className="col-md-6">
          <Form.Group className="mb-3" controlId="end_date">
            <Form.Label>Fecha Fin</Form.Label>
            <Form.Control {...register('end_date', { required: true })} type="date" />
          </Form.Group>
        </div>
      </div>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Descripcion del Evento</Form.Label>
        <Form.Control {...register('description')} as="textarea" rows={3} />
      </Form.Group>

      <p className="text-primary text-center border-bottom border-primary pb-2">Ubicacion</p>

      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <span className="text-muted">Selecione un Recinto</span>
            {Recintos &&
              Recintos.map((recinto) => (
                <Form.Check key={recinto._id} type={'radio'} id={recinto._id}>
                  <Form.Check.Input
                    onChange={async (e) => {
                      console.log(e.target.value)
                      await getEsquemasByRecinto(e.target.value)
                      setValue('recinto_id', e.target.value)
                    }}
                    //{...register('recinto_id', { required: true })}
                    value={recinto._id}
                    name="recinto"
                    type={'radio'}
                  />
                  <Form.Check.Label>{recinto.name}</Form.Check.Label>
                </Form.Check>
              ))}
            {/*  <Form.Check type={'radio'} id={`check-api1`}>
              <Form.Check.Input name="recinto" type={'radio'} />
              <Form.Check.Label>{`Custom api 2`}</Form.Check.Label>
            </Form.Check>
            <Form.Check type={'radio'} id={`check-api2`}>
              <Form.Check.Input name="recinto" type={'radio'} />
              <Form.Check.Label>{`Custom api 3`}</Form.Check.Label>
            </Form.Check> */}
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <span className="text-muted">Selecione un Esquema</span>
            {esquemasRecinto &&
              esquemasRecinto.map((esque) => (
                <Form.Check key={esque._id} type={'radio'} id={esque._id}>
                  <Form.Check.Input
                    name="esquema"
                    value={esque._id}
                    //{...register('esquema_id', { required: true })}
                    type={'radio'}
                    onChange={async (e) => {
                      setValue('esquema_id', e.target.value)
                      console.log(esque)
                      setSecciones(
                        esque.sections.map((sec) => {
                          return {
                            ...sec,
                            price: 1,
                          }
                        }),
                      )
                    }}
                  />
                  <Form.Check.Label>{esque.name}</Form.Check.Label>
                </Form.Check>
              ))}
            {/* <Form.Check type={'radio'} id={`check-api1`}>
              <Form.Check.Input name="recinto" type={'radio'} />
              <Form.Check.Label>{`Custom api 2`}</Form.Check.Label>
            </Form.Check>
            <Form.Check type={'radio'} id={`check-api2`}>
              <Form.Check.Input name="recinto" type={'radio'} />
              <Form.Check.Label>{`Custom api 3`}</Form.Check.Label>
            </Form.Check> */}
          </div>
        </div>
      </div>
      <div>
        {Secciones && (
          <DataTable
            className="MyDataTableEvent"
            columns={[
              { name: 'Seccion', selector: (row) => row.name_section },
              { name: 'Aforo', selector: (row) => row.aforo },
              {
                name: 'Precio',
                cell: (row) => {
                  return (
                    <>
                      <div style={{ width: '250px' }}>
                        <input
                          className="form-control"
                          type="number"
                          defaultValue={1}
                          min={1}
                          onChange={(e) => {
                            console.log(e.target.value)
                            const nuevosItems = Secciones.map((item) => {
                              // Si el id del objeto coincide con el id que queremos modificar
                              if (item.name_section === row.name_section) {
                                // Retornar un nuevo objeto con las propiedades actualizadas
                                return {
                                  ...item,
                                  price: parseFloat(e.target.value),
                                }
                              }
                              return item
                            })
                            setSecciones(nuevosItems)
                          }}
                        />
                      </div>
                    </>
                  )
                },
              },
            ]}
            data={Secciones && Secciones}
          />
        )}
      </div>

      <p className="text-primary text-center border-bottom border-primary pb-2">
        Informacion Funcion
      </p>
      <div className="row">
        <div className="col-md-6">
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Nombre Funcion</Form.Label>
            <Form.Control
              {...register('name_function', { required: true })}
              type="text"
              placeholder="Liga, Concierto ..... Aventura, Feid"
            />
          </Form.Group>
        </div>
        <div className="col-md-6"></div>
        <div className="col-md-6">
          <Form.Group className="mb-3" controlId="start_date">
            <Form.Label>Fecha Inicio</Form.Label>
            <Form.Control {...register('start_date_function', { required: true })} type="date" />
          </Form.Group>
        </div>
        <div className="col-md-6">
          <Form.Group className="mb-3" controlId="end_date">
            <Form.Label>Fecha Fin</Form.Label>
            <Form.Control {...register('end_date_function', { required: true })} type="date" />
          </Form.Group>
        </div>
      </div>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Descripcion del Funcion</Form.Label>
        <Form.Control {...register('description_function')} as="textarea" rows={3} />
      </Form.Group>

      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Imagen de la Funcion</Form.Label>
        <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
      </Form.Group>

      {selectedImage && (
        <div className=" d-flex gap-4 justify-content-center">
          <div className="rounded-4 border overflow-hidden">
            <img src={URL.createObjectURL(selectedImage)} alt="Preview" width="300px" />
          </div>
        </div>
      )}

      <div className="mt-5 d-flex gap-4 justify-content-center">
        <button onClick={onHide} className="btn btn-danger text-white">
          Cancelar
        </button>
        <Button className="text-white" type="submit" variant="success">
          Guardar Evento
        </Button>
      </div>
    </form>
  )
}
