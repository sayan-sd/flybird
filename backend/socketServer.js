const authSocket = require('./middleware/authSocket');
const disconnectHandler = require('./socketHandlers/disconnectHandler');
const chatHistoryHandler = require('./socketHandlers/getMessageHistoryHandler');
const newConnectionHandler = require('./socketHandlers/newConnectionHandler');
const newMessageHandler = require('./socketHandlers/newMessageHandler');
const startTypingHandler = require('./socketHandlers/startTypingHandler');
const stopTypingHandler = require('./socketHandlers/stopTypingHandler');

const registerSocketServer = (server) => {
    const io = require('socket.io')(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });

    io.use((socket, next) => {
        authSocket(socket, next);
    })

    io.on('connection', (socket) => {
        console.log(`New socket connection: ${socket.id}`);

        // new connection
        newConnectionHandler(socket, io);

        // disconnect
        socket.on('disconnect', () => {
            disconnectHandler(socket);
        });

        // new message
        socket.on('new-message', (data) => {
            newMessageHandler(socket, data, io);
        });

        // chat history
        socket.on('direct-chat-history', (data) => {
            chatHistoryHandler(socket, data);
        });

        // start typing
        socket.on('start-typing', (data) => {
            startTypingHandler(socket, data, io);
        });

        // stop typing
        socket.on('stop-typing', (data) => {
            stopTypingHandler(socket, data, io);
        });

    })
}

module.exports = { registerSocketServer };