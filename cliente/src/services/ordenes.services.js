/* eslint-disable prettier/prettier */

import axios from 'axios'

export const postCrearOrdenService = (data) => {
  return axios.post(`http://localhost:3001/ordenes/`, data)
}

export const getAllOrdenService = () => {
  return axios.get('http://localhost:3001/ordenes')
}
