import express from 'express';
import morgan from 'morgan';
import routes from './routes/index.routes.js';
import cors from 'cors';
import http from 'http';
import { Server as SocketServer } from 'socket.io';

import { PORT } from './config.js';

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server, {
    cors: {
        origin: 'http://localhost:5173'
    }
});

// settings
app.set('port', PORT);

// middlewares
app.use(cors());
app.use(morgan('dev'));

// routes
app.use(routes);

// socket.io
io.on('connection', (socket) => {
    console.log(`New connection. ID: ${socket.id}`);
});

// start
server.listen(app.get('port'), () => {
    console.log('Server is running at port', PORT);
});