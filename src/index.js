import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();

const PORT = process.env.PORT;
const APIKEY = process.env.APIKEY;

app.get("/currencies", async (req, res) => {
  const APIKEY = process.env.APIKEY;
  try {
    const response = await fetch(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
      {
        method: "GET",
        headers: {
          "X-CMC_PRO_API_KEY": APIKEY,
          Accept: "application/json",
        },
      }
    );

    const data = await response.json();
    console.log(data);

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error to connect API" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
