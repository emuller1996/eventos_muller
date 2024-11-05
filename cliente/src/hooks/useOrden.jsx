/* eslint-disable prettier/prettier */

import { useState } from 'react'
import { getAllOrdenService } from '../services/ordenes.services'

export const useOrden = () => {
  const [data, setData] = useState(null)


  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)



  const getAllOrdenes = async (id) => {
    try {
      setLoading(true)
      const r = await getAllOrdenService()
      console.log(r.data)
      setData(r.data)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
      setError(error.message)
    }
  }

  

  

  return {
    data,
    error,
    loading,
    getAllOrdenes
  }
}
