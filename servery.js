import express from "express";
import bodyParser from "body-parser";
import RedisConfig from "./config.js";

const app = express();
const jsonParser = bodyParser.json();

const sendMessageToMart = async (req, res) => {
    try {
        const message = req.body;

        const redisConfig = new RedisConfig();
        redisConfig.produce('channelMart', JSON.stringify(message));

        res.status(200).send({ message: "Message sent to mart successfully" });

    } catch (err) {
        console.log(err);
    }
}

app.post("/send-to-mart", jsonParser, sendMessageToMart);



// Consume too
const redisConfig = new RedisConfig();
redisConfig.consume('channelHome', (message) => {
    console.log("Message recieved at channel home: ", message);
})

redisConfig.consume('channelWork', (message) => {
    console.log("Message recieved at channel home: ", message);
})

app.listen(8081, () => {
    console.log("listening on 8081");
})