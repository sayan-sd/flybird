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

        // new connection
    })


    setInterval(() => {
        // emit online user
    }, [10000]);
}

module.exports = { registerSocketServer };