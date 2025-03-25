const User = require("../Models/User");

const newConnectionHandler = async (socket, io) => {
    const { userId } = socket.user;

    console.log(`User connected: ${socket.id}`);

    // make user online and add record to mongo
    const user = await User.findByIdAndUpdate(
        userId,
        {
            socketId: socket.id,
            status: "Online",
        },
        {
            new: true,
            validateModifiedOnly: true,
        }
    );

    // nofify other that user online
    if (user) {
        socket.broadcast.emit('user-connected', {
            message: `User ${user.name} connected`,
            userId: user._id,
            status: "Online",
        })
    }
    else {
        console.log("User not found");
    }
};

module.exports = newConnectionHandler;
