/* eslint-disable prettier/prettier */
import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import toast from 'react-hot-toast'
import { postCreatePuntoVentaService } from '../../../services/punto_venta.services'
export default function FormPuntosVenta({ onHide, getAllPuntosVenta }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    console.log(data)
    try {
      const result = await postCreatePuntoVentaService(data)
      console.log(result.data);
      toast.success(result.data.message)
      onHide()
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className="text-center border-bottom pb-2">Creando Punto Venta</p>
      <div className="row">
        <div className="col-md-6">
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Nombre Punto Venta</Form.Label>
            <Form.Control
              {...register('name', { required: true })}
              type="text"
              placeholder="Movistar Arena"
            />
          </Form.Group>
        </div>
        <div className="col-md-6">
            <Form.Label>Tipo</Form.Label>
          <Form.Select {...register('type_sales_point', { required: true })} aria-label="Default select example">
            <option selected value="punto_venta">Punto de Venta</option>
            <option value="taquilla">Taquilla</option>
          </Form.Select>
        </div>
      </div>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Descripcion del Punto Venta</Form.Label>
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
        <button type="button" onClick={onHide} className="btn btn-danger text-white">
          Cancelar
        </button>
        <Button type="submit" className="text-white" variant="success">
          Guardar Punto Venta.
        </Button>
      </div>
    </form>
  )
}
