import { PORT } from "../constants.js";
import express from "express";
import morgan from "morgan";

const app = express();
app.use(morgan("dev"));

app.use("/non-blocking/", (req,res) => {
    res.status(200).send("This page is non-blocking");
});

app.use("/blocking/", async (req, res) => {
    let counter = 0;
    for(let i = 0; i < 20_000_000_000; i++){
        counter++;
    }

    res.status(200).send(`Result is ${counter}`);
});

app.listen(PORT, () => {
    console.log(`App listening on port: ${PORT}`);
});