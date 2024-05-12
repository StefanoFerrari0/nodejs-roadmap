import os from "os";

export const PORT = process.env.PORT || 3000;

//I have 16 so I want to use the half
const TOTAL_CPU_THREADS = os.cpus().length;
export const THREAD_USAGE = Math.ceil(TOTAL_CPU_THREADS / 2);

console.log(`Your CPU has ${TOTAL_CPU_THREADS} threads, and the backend is configured to use ${THREAD_USAGE} threads. You can manage this on constants.js`);