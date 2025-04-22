const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

// TU URL DEL WEBHOOK DE GOOGLE SHEETS
const SHEET_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbxvonoHu-QfQuHKwgtGzgon33foe0-iCcoHf_45r9i-4dCW_QZI6y-bJ5g1ZdN9l20g4g/exec";

app.post("/enviar-lead", async (req, res) => {
  try {
    const data = req.body;
    await axios.post(SHEET_WEBHOOK_URL, data);
    res.status(200).json({ status: "ok", mensaje: "Lead registrado en Google Sheets" });
  } catch (error) {
    res.status(500).json({ status: "error", mensaje: "Falló el envío", error: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("Amparito backend operativo");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor en ejecución en el puerto", PORT);
});
