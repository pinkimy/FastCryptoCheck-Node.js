import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());

const PORT = process.env.PORT;
const APIKEY = process.env.APIKEY;

const baseUrl = `https://pro-api.coinmarketcap.com`;
const headersCfg = {
  "X-CMC_PRO_API_KEY": APIKEY,
  Accept: "application/json",
};

app.get("/currencies", async (req, res) => {
  try {
    const response = await fetch(
      `${baseUrl}/v1/cryptocurrency/listings/latest`,
      {
        method: "GET",
        headers: headersCfg,
      }
    );

    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error to connect API" });
  }
});

app.get("/currencies/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const response = await fetch(
      `${baseUrl}/v2/cryptocurrency/quotes/latest?id=${id}`,
      {
        method: "GET",
        headers: headersCfg,
      }
    );

    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error to connect API" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
