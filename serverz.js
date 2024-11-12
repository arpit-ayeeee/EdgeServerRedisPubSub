import express from "express";
import bodyParser from "body-parser";
import RedisConfig from "./config.js";

const app = express();
const jsonParser = bodyParser.json();

// Consume too
const redisConfig = new RedisConfig();
redisConfig.consume('channelHome', (message) => {
    console.log("Message recieved at channel home: ", message);
})

redisConfig.consume('channelWork', (message) => {
    console.log("Message recieved at channel home: ", message);
})

redisConfig.consume('channelMart', (message) => {
    console.log("Message recieved at channel home: ", message);
})

app.listen(8082, () => {
    console.log("listening on 8082");
})