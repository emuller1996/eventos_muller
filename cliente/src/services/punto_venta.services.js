/* eslint-disable prettier/prettier */

import axios from "axios";

export const postCreatePuntoVentaService = (data) => {
  return axios.post("http://localhost:3001/punto_venta", data);
};


export const getAllPuntoVentaService = (data) => {
  return axios.get("http://localhost:3001/punto_venta", data);
};



