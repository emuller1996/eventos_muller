/* eslint-disable prettier/prettier */
import { useEffect, useRef } from 'react'
import { jsPDF } from 'jspdf'
import { QRCodeCanvas } from 'qrcode.react'
import Button from 'react-bootstrap/Button'
import html2canvas from 'html2canvas'
import React from 'react'
import { useFunciones } from '../../../hooks/useFunciones'
import PropTypes from 'prop-types'

export default function BoletoTicketComponent({ showData }) {
  BoletoTicketComponent.propTypes = {
    showData: PropTypes.object,
  }
  const ticketRef = useRef(null) // Referencia para todo el contenido del ticket

  const generatePDF = async () => {
    try {
      // 1. Convertir el contenido del ticket a imagen
      const canvas = await html2canvas(ticketRef.current)
      const imgData = canvas.toDataURL('image/png')

      // 2. Crear PDF
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [90, 163], // Tamaño aproximado de un ticket
      })

      // 3. Agregar el contenido del ticket (ajustado al tamaño del PDF)
      const imgWidth = doc.internal.pageSize.getWidth() - 10 // Margen de 5mm cada lado
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      doc.addImage(imgData, 'PNG', 5, 5, imgWidth, imgHeight)

      // 4. Guardar el PDF
      //doc.save(`ticket-${showData?._id || 'boleto'}.pdf`)

      // Alternativa para vista previa (opcional):
      const pdfUrl = URL.createObjectURL(doc.output('blob'))
      window.open(pdfUrl, '_blank')
    } catch (error) {
      console.error('Error al generar PDF:', error)
      alert('Ocurrió un error al generar el PDF')
    }
  }

  const { getFuncionById, dataDetalle } = useFunciones()

  useEffect(() => {
    getFuncionById(showData.function_id)
  }, [showData.function_id])

  return (
    <>
      <div ref={ticketRef} className="border rounded p-3 mb-4 mx-auto" style={{ width: '300px' }}>
        <div className="text-center">
          <h5 className="fw-bold text-uppercase ">Ticket</h5>
          <hr />

          <p>
            <strong className="text-primary fw-semibol fs-4">{dataDetalle?.name}</strong>
          </p>
          <p>
            <strong>Fecha:</strong> {dataDetalle?.start_date}
          </p>
          <div className="d-flex justify-content-between">
            <strong>Sección:</strong>
            <span>{showData?.section}</span>
          </div>
          <div className="d-flex justify-content-between">
            <strong>Número de Ticket:</strong>
            <span>{showData?.num_ticket}</span>
          </div>
          <hr />
        </div>
        <div className="text-center mt-3">
          <QRCodeCanvas value={showData?._id || ''} size={150} />
          <hr />
          <p className="mt-2">Presentate con este Codigo QR en la entrada.</p>
        </div>

        <p className="lh-1 m-0 text-center text-secondary" style={{ fontSize: '0.7em' }}>
          Este Boleto es <b>INTRANSFERIBLE</b>. no compartir con nadie su boleto.
        </p>
      </div>
      <Button variant="primary" onClick={generatePDF} className="mt-3">
        Descargar Ticket PDF
      </Button>
    </>
  )
}
