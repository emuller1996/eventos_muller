/* eslint-disable prettier/prettier */

import axios from "axios";

export const postBoletoDispobileService = (id) => {
  return axios.post(`http://localhost:3001/boleto/${id}/disponible`, {});
};





