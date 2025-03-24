const authSocket = require('./middleware/authSocket')

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

        // todo: new connection

        // todo: disconnect
        socket.on('disconnect', () => {
            
        });

        // todo: new message
        socket.on('new-message', (data) => {
            
        });

        // todo: chat history
        socket.on('direct-chat-history', (data) => {
            
        });

        // todo: start typing
        socket.on('start-typing', (data) => {
            
        });

        // todo: stop typing
        socket.on('stop-typing', (data) => {
            
        });

    })
}

module.exports = { registerSocketServer };