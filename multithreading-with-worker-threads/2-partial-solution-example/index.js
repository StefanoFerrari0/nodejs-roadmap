import { PORT } from "../constants.js";
import express from "express";
import morgan from "morgan";
import { Worker } from "worker_threads";

const app = express();
app.use(morgan("dev"));

app.use("/non-blocking/", (req,res) => {
    res.status(200).send("This page is non-blocking");
})

app.use("/blocking/", async (req, res) => {
    const worker = new Worker("./multithreading-with-worker-threads/2-partial-solution-example/worker.js", { transferList: []});

    worker.on("message", (counter) => {
        res.status(200).send(`Result is ${counter}`);
    });

    worker.on("error", (error) => {
        res.status(404).send(`An error ocurred ${error}`);
    });
})

app.listen(PORT, () => {
    console.log(`App listening on port: ${PORT}`);
})