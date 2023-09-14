//importando dependencias
import express from "express";
import dotenv from "dotenv";

//importando elementos
import router from "./app/routes/index.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000


// Ruta principal
app.use('/api', router);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});