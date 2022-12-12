import express from "express";
import cors from "cors";
import categoriesRouter from "./routes/categoriesRoutes.js";
import gamesRouter from "./routes/gamesRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(categoriesRouter);
app.use(gamesRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log("Server running in port: " + port));
