import { Router } from "express";
import { client } from "../db.js";

const DashboardRouters = Router();

DashboardRouters.get("/sales", async (req, res) => {
  try {
    const result = await client.search({
      index: "eventosmull",
      body: {
        size: 1,
        query: {
          bool: {
            must: [
              {
                term: {
                  "type.keyword": {
                    value: "orden",
                  },
                },
              },
              {
                range: {
                  createdTime: {
                    gte: 1736048592000,
                    lte: 1738727022000,
                  },
                },
              },
            ],
          },
        },
        aggs: {
          last30days: {
            date_histogram: {
              field: "createdTime",
              calendar_interval: "day",
            },
            aggs: {
              suma: {
                sum: {
                  field: "total_order",
                },
              },
            },
          },
        },
      },
    });

    return res.status(200).json(result.body.aggregations.last30days.buckets);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default DashboardRouters;
