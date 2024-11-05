/* eslint-disable prettier/prettier */

import axios from "axios";

export const postCreateEventoService = (data) => {
  return axios.post("http://localhost:3001/eventos", data);
};


export const getAllEventoService = (data) => {
  return axios.get("http://localhost:3001/eventos", data);
};

export const getAllEventoByIdService = (id) => {
  return axios.get(`http://localhost:3001/eventos/${id}`);
};

export const getAlFuncionesByEventoIdService = (id) => {
  return axios.get(`http://localhost:3001/eventos/${id}/funciones`);
};

export const postFuncionesByEventoIdService = (id, data) => {
  return axios.post(`http://localhost:3001/eventos/${id}/funcion`, data);
};




