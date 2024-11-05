/* eslint-disable prettier/prettier */

import axios from 'axios'

export const getAllFuncionService = () => {
  return axios.get('http://localhost:3001/funcion')
}

export const getFuncionByidService = (id) => {
  return axios.get(`http://localhost:3001/funcion/${id}`)
}

export const getBoletosByFuncionByidService = (id) => {
  return axios.get(`http://localhost:3001/funcion/${id}/boletos`)
}

export const getOrdenesByFuncionByidService = (id) => {
  return axios.get(`http://localhost:3001/funcion/${id}/ordenes`)
}


export const getBoletoBySeccionByidService = (id,data) => {
  return axios.post(`http://localhost:3001/funcion/get/${id}/boletos`,data)
}
