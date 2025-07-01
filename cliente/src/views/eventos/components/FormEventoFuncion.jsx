/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useRecintos } from '../../../hooks/useRecintos'
import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import { postFuncionesByEventoIdService } from '../../../services/eventos.services'
import toast from 'react-hot-toast'
import { patchFuncionByIdService } from '../../../services/funciones.services'

export default function FormEventoFuncion({ onHide, getAllFuncion, Funcion, idEvento }) {
  FormEventoFuncion.propTypes = {
    onHide: PropTypes.func,
    getAllFuncion: PropTypes.func,
    Funcion: PropTypes.object,
    idEvento: PropTypes.string,
  }

  const [Secciones, setSecciones] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [base64Image, setBase64Image] = useState(Funcion?.image ? Funcion : '')
  /* const { idEvento } = useParams() */

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  console.log(Funcion)

  const onSubmit = async (data) => {
    if (Funcion) {
      if (selectedImage) {
        data.image = base64Image ?? null
      }
      try {
        const res = await patchFuncionByIdService(Funcion._id, data)
        toast.success(res.data.message)
        onHide()
        await getAllFuncion(idEvento)
      } catch (error) {
        console.log(error)
      }
    } else {
      data.image = base64Image ?? null
      console.log(data)
      try {
        const res = await postFuncionesByEventoIdService(idEvento, data)
        toast.success(res.data.message)
        onHide()
        await getAllFuncion(idEvento)
      } catch (error) {
        console.log(error)
      }
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
      <p className="text-center border-bottom pb-2">Crea un Nueva Funcion</p>
      <div className="row">
        <div className="col-md-6">
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Nombre Funcion</Form.Label>
            <Form.Control
              {...register('name_function', { required: true })}
              defaultValue={Funcion && Funcion.name}
              type="text"
              placeholder="Liga, Concierto ..... Aventura, Feid"
            />
          </Form.Group>
        </div>
        <div className="col-md-6">
          <Form.Label>Estado</Form.Label>
          <Form.Select {...register('status', { required: true })} defaultValue={Funcion && Funcion.status} >
            <option selected={Funcion ? true : false} disabled={Funcion ? true : false}>Selecionar un Estado </option>
            <option value="en_venta">En Venta</option>
            <option value="finalizado">Finalizado</option>
            <option value="cancelado">Cancelado</option>
            <option value="proximamente">Proximamente</option>
          </Form.Select>
        </div>
        <div className="col-md-6">
          <Form.Group className="mb-3" controlId="start_date">
            <Form.Label>Fecha Inicio</Form.Label>
            <Form.Control
              defaultValue={Funcion && Funcion.start_date}
              {...register('start_date_function', { required: true })}
              type="date"
            />
          </Form.Group>
        </div>
        <div className="col-md-6">
          <Form.Group className="mb-3" controlId="end_date">
            <Form.Label>Fecha Fin</Form.Label>
            <Form.Control
              {...register('end_date_function', { required: true })}
              defaultValue={Funcion && Funcion.end_date}
              type="date"
            />
          </Form.Group>
        </div>
      </div>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Descripcion del Funcion</Form.Label>
        <Form.Control
          {...register('description_function')}
          defaultValue={Funcion && Funcion.description}
          as="textarea"
          rows={3}
        />
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
      {Funcion && Funcion.image && (
        <div className=" d-flex gap-4 justify-content-center">
          <div className="rounded-4 border overflow-hidden">
            <img src={Funcion.image} alt="Preview" width="300px" />
          </div>
        </div>
      )}

      <div className="mt-5 d-flex gap-4 justify-content-center">
        <button onClick={onHide} type='button' className="btn btn-danger text-white">
          Cancelar
        </button>
        <Button className="text-white" type="submit" variant="success">
          Guardar Funcion
        </Button>
      </div>
    </form>
  )
}
