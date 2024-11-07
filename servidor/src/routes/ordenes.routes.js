import { Router } from "express";
import {
  buscarElasticByType,
  crearElasticByType,
  createInMasaDocumentByType,
  getDocumentById,
  updateElasticByType,
} from "../utils/index.js";
import { client } from "../db.js";
const INDEX_ES = "eventosmull";

const OrdenesRouters = Router();


OrdenesRouters.post("/", async (req, res) => {
  try {
    var order = {};
    const data = req.body;
    data.createdTime = new Date().getTime();


    const response = await crearElasticByType(data, "orden");
    order = response.body;

    const rrPromesas = data.boletos.map( async bol =>{
      const r =await updateElasticByType(bol._id,{status:"Vendido"})
      return r
    })
    await Promise.all(rrPromesas)
    return res.status(201).json({ message: "Orden Generada.", order });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

OrdenesRouters.get("/", async (req, res) => {
  try {
    var ordenes = await buscarElasticByType("orden");
    /* return res.json(searchResult.body.hits); */
    ordenes = ordenes.map( async or => {
      if(or.evento_id){
        await getDocumentById(or.evento_id)
        or.evento =  await getDocumentById(or.evento_id)
      }
      if(or.funcion_id){
        await getDocumentById(or.funcion_id)
        or.funcion =  await getDocumentById(or.funcion_id)
      }
      return {...or}
    })

    ordenes = await Promise.all(ordenes)
    return res.status(200).json(ordenes);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default OrdenesRouters;
