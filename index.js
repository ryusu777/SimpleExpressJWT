import express, { json } from "express";
import 'dotenv/config';

import authRouter from "./endpoints/auth/installer.js";

const app = express();

const port = process.env.PORT ?? 8080;

app.use(json())
app.use("/api/", authRouter);

app.listen(port, () => {
    console.log(`API is listening on port ${port}`);
});

