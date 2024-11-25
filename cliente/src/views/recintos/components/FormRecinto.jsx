/* eslint-disable prettier/prettier */
import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import axios from "axios"
import toast from 'react-hot-toast'
export default function FormRecinto({ onHide, getAllRecintos }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = async(data) => {
    console.log(data)
    try {
      const result = await axios.post("/recinto",data)
      console.log(result);
      await getAllRecintos()
      onHide()
      toast.success("Recinto Creado.")
    } catch (error) {
      console.log(error);
      
    }
  
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className="text-center border-bottom pb-2">Creando Nuevo Recinto</p>

      <p className="text-primary text-center border-bottom border-primary pb-2">
        Informacion Basica
      </p>
      <div className="row">
        <div className="col-md-6">
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Nombre Recinto</Form.Label>
            <Form.Control
              {...register('name', { required: true })}
              type="text"
              placeholder="Movistar Arena"
            />
          </Form.Group>
        </div>
        <div className="col-md-6">
          <Form.Group className="mb-3" controlId="category">
            <Form.Label>Categoria</Form.Label>
            <Form.Control
              {...register('category', { required: true })}
              type="text"
              placeholder="Estadio, Coliceo, Arena, Teatro, Plaza, ...."
            />
          </Form.Group>
        </div>
      </div>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Descripcion del Recinto</Form.Label>
        <Form.Control {...register('description')} as="textarea" rows={3} />
      </Form.Group>

      <p className="text-primary text-center border-bottom border-primary pb-2">Ubicacion</p>

      <div className="row">
        <div className="col-md-6">
          <Form.Group className="mb-3" controlId="city">
            <Form.Label>Cuidad</Form.Label>
            <Form.Control {...register('city')} type="text" placeholder="Bogota" />
          </Form.Group>
        </div>
        <div className="col-md-6">
          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Direccion</Form.Label>
            <Form.Control {...register('address')} type="text" placeholder="Cra 43" />
          </Form.Group>
        </div>
      </div>

      <div className="mt-5 d-flex gap-4 justify-content-center">
        <button onClick={onHide} className="btn btn-danger text-white">
          Cancelar
        </button>
        <Button type="submit" className="text-white" variant="success">
          Guardar Recinto
        </Button>
      </div>
    </form>
  )
}
