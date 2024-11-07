import { Router } from "express";
import { buscarElasticByType, crearElasticByType } from "../utils/index.js";
import { client } from "../db.js";
const INDEX_ES = "eventosmull";

const RecintosRouters = Router();

RecintosRouters.post("/", async (req, res) => {
  try {
    var recinto = {};
    const data = req.body;
    data.createdTime = new Date().getTime();
    const response = await crearElasticByType(data, "recinto");
    recinto = response.body;
    return res.status(201).json({ message: "Recinto Creado.", recinto });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

RecintosRouters.post("/:idRecinto/esquema", async (req, res) => {
  try {
    var esquema = {};
    const data = req.body;
    data.createdTime = new Date().getTime();
    data.recinto_id = req.params.idRecinto;
    const response = await crearElasticByType(data, "esquema");
    esquema = response.body;
    return res.status(201).json({ message: "Esquema Creado.", esquema });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

RecintosRouters.get("/:idRecinto/esquemas", async (req, res) => {
  try {
    var Recintos = await buscarElasticByType("esquema");
    const searchResult = await client.search({
      index: INDEX_ES,
      size: 1000,
      body: {
        query: {
          bool: {
            must: [
              {
                term: {
                  "type.keyword": {
                    value: "esquema",
                  },
                },
              },
              {
                term: {
                  "recinto_id.keyword": {
                    value: req.params.idRecinto,
                  },
                },
              },
            ],
          },
        },
        sort: [
          { createdTime: { order: "asc" } }, // Reemplaza con el campo por el que quieres ordenar
        ],
      },
    });
    let data = searchResult.body.hits.hits.map((c) => {
      return {
        ...c._source,
        _id: c._id,
      };
    });
    /* return res.json(searchResult.body.hits); */
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

RecintosRouters.get("/", async (req, res) => {
  try {
    var Recintos = await buscarElasticByType("recinto");
    /* return res.json(searchResult.body.hits); */
    return res.status(200).json(Recintos);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default RecintosRouters;
