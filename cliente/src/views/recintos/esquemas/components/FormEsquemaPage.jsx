/* eslint-disable prettier/prettier */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function FormEsquemaPage() {
  const { idRecinto } = useParams()
  const [selectedImage, setSelectedImage] = useState(null)
  const [base64Image, setBase64Image] = useState('')

  const [rows, setRows] = useState(1) // Número de filas
  const [seatStates, setSeatStates] = useState({}) // Estado de habilitación de asientos

  const [columns, setColumns] = useState(3) // Número de columnas

  const [occupiedSeats, setOccupiedSeats] = useState(0)

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' // Alfabeto para las filas

  console.log(rows, columns)
  console.log(seatStates, columns)
  console.log(occupiedSeats)

  const [listSection, setlistSection] = useState([])
  const [nameEquema, setNameEquema] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm()

  const navigate = useNavigate()
  const onSubmit = (data) => {
    console.log(data)

    data.aforo = parseInt(data.aforo)
    setlistSection((status) => {
      return [...status, data]
    })
    reset()
  }

  // Función para manejar el cambio en el input de filas
  const handleRowsChange = (e) => {
    setRows(Number(e.target.value))
  }
  console.log(listSection)

  // Función para manejar el cambio en el input de columnas
  const handleColumnsChange = (e) => {
    setColumns(Number(e.target.value))
  }

  useEffect(() => {
    const initialSeatStates = {}
    for (let row = 0; row < rows; row++) {
      for (let col = 1; col <= columns; col++) {
        const seatLabel = `${alphabet[row]}${col}`
        initialSeatStates[seatLabel] = { disabled: true, disponible: true } // Inicialmente, todos los checkboxes en true
      }
    }
    setSeatStates(initialSeatStates)
  }, [columns, rows])

  useEffect(() => {
    const occupiedCount = Object.values(seatStates).filter(
      (isOccupied) => isOccupied.disabled,
    ).length
    setOccupiedSeats(occupiedCount)
  }, [seatStates])

  const handleCheckboxChange = (seatLabel) => {
    setSeatStates((prevState) => ({
      ...prevState,
      [seatLabel]: {
        disabled: !prevState[seatLabel]?.disabled,
        disponible: !prevState[seatLabel]?.disponible,
      }, // Cambia el estado actual
    }))
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

  const renderSeatTable = () => {
    const tableRows = []
    const tableRowsData = []

    let status = false
    // Crear cada fila
    for (let row = 0; row < rows; row++) {
      const seatRow = []
      const seatRowData = []
      // Crear cada columna dentro de la fila
      for (let col = 1; col <= columns; col++) {
        const seatLabel = `${alphabet[row]}${col}`
        seatRow.push(
          <td key={seatLabel}>
            <div
              style={{
                padding: '10px',
                margin: '4px',
                backgroundColor: seatStates[seatLabel]?.disabled ? 'lightblue' : 'white',
                textAlign: 'center',
                border: seatStates[seatLabel]?.disabled ? '1px solid black' : 'none',
                borderRadius: '4px',
                width: '50px',
                height: '60px',
              }}
            >
              <input
                type="checkbox"
                name=""
                checked={seatStates[seatLabel]?.disabled || false} // Verifica el estado del asiento
                onChange={() => handleCheckboxChange(seatLabel)}
                id=""
              />
              <span>{seatLabel}</span>
            </div>
          </td>,
        )
        seatRowData.push({ row, col })
      }
      // Agregar la fila completa a la tabla
      tableRows.push(<tr key={row}>{seatRow}</tr>)
      tableRowsData.push(seatRowData)
    }

    return tableRows
  }
  return (
    <div>
      {/* <div className="d-block">
        <Link to={`/recintos`} className="btn btn-danger text-white ">
          <i className="fa-solid fa-angles-left me-2"></i>Atras a Recintos
        </Link>
      </div> */}
      <div>
        <Form.Group className="mb-3 w-100" controlId="name">
          <Form.Label>Nombre Esquema</Form.Label>

          <div className="d-flex gap-3">
            <Form.Control
              type="text"
              value={nameEquema}
              onChange={(e) => {
                setNameEquema(e.target.value)
              }}
              placeholder="Movistar Arena"
            />
            <div className="flex-shrink-1">
              <button
                type="button"
                onClick={async () => {
                  console.log(listSection)
                  console.log(nameEquema)
                  console.log({
                    name: nameEquema,
                    sections: listSection,
                    recinto_id: idRecinto,
                    image: base64Image ?? null,
                  })
                  try {
                    const r = await axios.post(`/recinto/${idRecinto}/esquema`, {
                      name: nameEquema,
                      sections: listSection,
                      recinto_id: idRecinto,
                      image: base64Image ?? null,
                    })
                    console.log(r.data)
                    toast.success('Se creo el esquema correctamente.')
                    navigate(`/d/recintos/${idRecinto}/esquemas`)
                  } catch (error) {
                    console.log(error)
                  }
                }}
                className="btn btn-primary text-nowrap"
              >
                Crear Esquema
              </button>
            </div>
          </div>
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

        <hr />
        <div>
          <div className="card text-primary bg-50-primary">
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)} className="row">
                <div className="col-md-5">
                  <Form.Group className="mb-3" controlId="name_section">
                    <Form.Label>Nombre Seccion</Form.Label>
                    <Form.Control
                      {...register('name_section', { required: true })}
                      type="text"
                      placeholder="General"
                    />
                  </Form.Group>
                </div>
                <div className="col-md-2">
                  <Form.Group className="mb-3" controlId="aforo">
                    <Form.Label>Aforo </Form.Label>
                    <Form.Control
                      {...register('aforo', { required: true })}
                      type="number"
                      placeholder="500"
                    />
                  </Form.Group>
                </div>
                <div className="col-md-2">
                  <Form.Label htmlFor="type_sales_point">Tipo de Distribución</Form.Label>
                  <Form.Select
                    {...register('role', { required: true })}
                    aria-label="Default select example"
                    id="type_sales_point"
                  >
                    <option selected value="pie">
                      De Pie
                    </option>
                    <option value="asiento">Asiento</option>
                  </Form.Select>
                </div>
                <div className="col-md-2">
                  <Form.Group className="mb-3" controlId="nletraame">
                    <Form.Label>Letra </Form.Label>
                    <Form.Control
                      {...register('letra', { required: true })}
                      type="text"
                      placeholder="A"
                    />
                  </Form.Group>
                </div>
                <div className="col-md-1">
                  <Form.Group className="mb-3" controlId="puerta">
                    <Form.Label>Puerta </Form.Label>
                    <Form.Control {...register('puerta')} type="text" placeholder="F12" />
                  </Form.Group>
                </div>
                {/* <div className="col-md-4">
                  <label>Filas: </label>
                  <input
                    type="number"
                    className="form-control"
                    value={rows}
                    {...register('row', { required: true })}
                    onChange={handleRowsChange}
                    min="1"
                    max="26"
                  />
                </div>
                <div className="col-md-4">
                  <label> Columnas: </label>
                  <input
                    type="number"
                    className="form-control"
                    value={columns}
                    onChange={handleColumnsChange}
                    min="1"
                  />
                </div>
                <div style={{ marginTop: '20px', maxWidth: '100%',  overflow:"auto"}}>
                  <table style={{ borderCollapse: 'collapse', marginTop: '20px' }}>
                    <tbody>{renderSeatTable()}</tbody>
                  </table>
                </div> */}
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">
                    Agregar Seccion
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <hr />
        <div>
          {listSection.map((section) => (
            <div key={section.letra}>
              <div className="card  bg-50-primary mb-3">
                <div className="card-body">
                  <p className="fs-2 text-primary m-0">{section?.name_section}</p>
                  <div className="d-flex gap-5">
                    <span>Aforo : {section?.aforo}</span>
                    <span>letra : {section?.letra}</span>
                    <span>puerta : {section?.puerta}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* <div>
          <div className="row">
            <div className="col-md-4">
              <label>Filas: </label>
              <input
                type="number"
                className="form-control"
                value={rows}
                onChange={handleRowsChange}
                min="1"
                max="26"
              />
            </div>
            <div className="col-md-4">
              <label> Columnas: </label>
              <input
                type="number"
                className="form-control"
                value={columns}
                onChange={handleColumnsChange}
                min="1"
              />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  )
}
