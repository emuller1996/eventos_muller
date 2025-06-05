/* eslint-disable prettier/prettier */

import axios from "axios";

export const postBoletoDispobileService = (id) => {
  return axios.post(`/boleto/${id}/disponible`, {});
};

export const postBoletoAccesoService = (id) => {
  return axios.post(`/boleto/${id}/acceso`, {});
};





