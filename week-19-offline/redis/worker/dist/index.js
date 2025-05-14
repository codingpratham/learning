"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const client = (0, redis_1.createClient)();
client.on('error', (err) => {
    console.log('Redis Client Error', err);
});
function processSubmission(job) {
    return __awaiter(this, void 0, void 0, function* () {
        const { code, language, problemId, userId } = JSON.parse(job);
        console.log("Processing submission", {
            userId,
            code,
            language,
            problemId
        });
        // Simulate processing time
        yield new Promise((resolve) => setTimeout(resolve, 2000));
        console.log("Submission processed", problemId);
        client.publish("problem_done", JSON.stringify({
            problemId,
            status: "TLE"
        }));
    });
}
function startWorker() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            console.log("Connected to Redis");
            while (true) {
                try {
                    const job = yield yield client.brPop("problems", 0);
                    yield processSubmission(job.element);
                }
                catch (error) {
                    console.log("Error processing job", error);
                }
            }
        }
        catch (error) {
            console.log("Error starting worker", error);
        }
    });
}
startWorker();
