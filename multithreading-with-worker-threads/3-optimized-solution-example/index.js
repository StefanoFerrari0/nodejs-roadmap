import { PORT, THREAD_USAGE } from "../constants.js";
import express from "express";
import { Worker } from "worker_threads";
import morgan from "morgan";

function createWorker() {
    return new Promise((resolve, reject) => {
        const worker = new Worker("./multithreading-with-worker-threads/3-optimized-solution-example/worker.js", { workerData: { threadCount: total} });

        worker.on("message", (counter) => {
            resolve(counter);
        });
    
        worker.on("error", (error) => {
            reject(`An error ocurred ${error}`)
        });
    })
}
const app = express();

app.use(morgan("dev"));

app.use("/non-blocking/", (req,res) => {
    res.status(200).send("This page is non-blocking")
})

app.use("/blocking/", async (req, res) => {
    const workerPromises = [];
    for(let i = 0; i < THREAD_USAGE; i++){
        workerPromises.push(createWorker());

        const threadResults = await Promise.all(workerPromises);
        const total = threadResults.reduce((x, y) => x + y);
        res.status(200).send(`Result is ${total}`);
    }
})

app.listen(PORT, () => {
    console.log(`App listening on port: ${PORT}`);
})