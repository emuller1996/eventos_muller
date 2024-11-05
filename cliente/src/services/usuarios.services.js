/* eslint-disable prettier/prettier */

import axios from "axios";

export const postCreateUsuariosService = (data) => {
  return axios.post("http://localhost:3001/usuarios", data);
};


export const getAllUsuariosService = (data) => {
  return axios.get("http://localhost:3001/usuarios", data);
};



