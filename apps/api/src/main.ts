/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import { createServer } from "node:http";
import API from "./routes/API";
import Auth from "./routes/auth";
import Socket from "./routes/socket";


const app = express();
const server = createServer(app);

Socket.attach(server);

app.use('/', API);
app.use('/', Auth);

const port = process.env.PORT || 3333;

httpServer.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});