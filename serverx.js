import express from "express";
import bodyParser from "body-parser";
import RedisConfig from "./config.js";

const app = express();
const jsonParser = bodyParser.json();

const sendMessageToChannelHome = async (req, res) => {
    try {
        const message = req.body;

        console.log(message);
        const redisConfig = new RedisConfig();
        redisConfig.produce('channelHome', JSON.stringify(message));

        res.status(200).send({ message: "Message sent to home successfully" });

    } catch (err) {
        console.log(err);
    }
}

const sendMessageToChannelWork = async (req, res) => {
    try {
        const message = req.body;

        console.log(message);
        const redisConfig = new RedisConfig();
        redisConfig.produce('channelWork', JSON.stringify(message));

        res.status(200).send({ message: "Message sent to work successfully" });

    } catch (err) {
        console.log(err);
    }
}

app.post("/send-to-home", jsonParser, sendMessageToChannelHome);
app.post("/send-to-work", jsonParser, sendMessageToChannelWork);


// Consume too
const redisConfig = new RedisConfig();
redisConfig.consume('channelMart', (message) => {
    console.log("Message recieved at channel mart: ", message);
})

app.listen(8080, () => {
    console.log("listening on 8080");
})