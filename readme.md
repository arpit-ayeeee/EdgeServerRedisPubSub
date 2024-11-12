# Message Broadcast across servers using Star Topology leveraging Redis PubSub

## Overview

This repository contains a simple Redis Pub/Sub system implemented using Node.js, Express, and Redis. There are three servers (`serverx.js`, `servery.js`, `serverz.js`) that communicate with each other by publishing and subscribing to specific Redis channels. Each server can send messages to channels and receive messages from other channels.

## Project Structure

- `serverx.js`: Sends messages to `channelHome` and `channelWork`, and listens to messages from `channelMart`.
- `servery.js`: Sends messages to `channelMart`, and listens to messages from `channelHome` and `channelWork`.
- `serverz.js`: Listens to messages from `channelHome`, `channelWork`, and `channelMart`.
- `config.js`: Contains the Redis configuration and utility functions for producing (publishing) and consuming (subscribing) messages.

## Requirements

- Node.js (v14 or higher)
- Redis (running locally on port 6379)

## Installation

1. Clone this repository.

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Ensure Redis is installed and running on your system. You can install Redis using:

   - For macOS: `brew install redis`
   - For Linux: Follow instructions [here](https://redis.io/docs/getting-started/installation/).
   - For Windows: Follow instructions [here](https://redis.io/docs/getting-started/installation/).

4. Start Redis:

   ```bash
   redis-server
   ```

## Running the Servers

There are three servers, each running on different ports and consuming/publishing to Redis channels.

1. **Start `serverx.js`:**

   ```bash
   node serverx.js
   ```

   - Runs on `http://localhost:8080`.
   - Sends messages to `channelHome` and `channelWork`.
   - Consumes messages from `channelMart`.

2. **Start `servery.js`:**

   ```bash
   node servery.js
   ```

   - Runs on `http://localhost:8081`.
   - Sends messages to `channelMart`.
   - Consumes messages from `channelHome` and `channelWork`.

3. **Start `serverz.js`:**

   ```bash
   node serverz.js
   ```

   - Runs on `http://localhost:8082`.
   - Consumes messages from `channelHome`, `channelWork`, and `channelMart`.

## Usage

### Sending Messages

You can send POST requests to the respective endpoints of `serverx` and `servery`:

- **Send message to `channelHome`:**

  ```bash
  curl -X POST http://localhost:8080/send-to-home -H "Content-Type: application/json" -d '{"message": "Hello Home"}'
  ```

- **Send message to `channelWork`:**

  ```bash
  curl -X POST http://localhost:8080/send-to-work -H "Content-Type: application/json" -d '{"message": "Hello Work"}'
  ```

- **Send message to `channelMart`:**

  ```bash
  curl -X POST http://localhost:8081/send-to-mart -H "Content-Type: application/json" -d '{"message": "Hello Mart"}'
  ```

### Consuming Messages

Each server will log messages received on the channels they are subscribed to.

- `serverx` will log messages received on `channelMart`.
- `servery` will log messages received on `channelHome` and `channelWork`.
- `serverz` will log messages received on `channelHome`, `channelWork`, and `channelMart`.

## Redis Configuration

The `config.js` file contains the Redis configuration

This class provides two functions:
- **`produce(channel, message)`**: Publishes a message to a specific channel.
- **`consume(channel, callback)`**: Subscribes to a channel and triggers the callback function when a message is received.
