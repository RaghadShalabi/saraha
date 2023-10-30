import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import initApp from "./src/modules/app.router.js";
const app = express()
const PORT = process.env.PORT || 3030
initApp(app, express)


app.listen(PORT, () => {
    console.log(`server is running, on port ${PORT}`)
})