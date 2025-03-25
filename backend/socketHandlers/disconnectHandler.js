const User = require("../Models/User");

const disconnectHandler = async (socket) => {
    console.log(`Socket ${socket.id} disconnected`);

    // update user doc
    const user = await User.findOneAndUpdate(
        { socketId: socket.id },
        {
            isOnline: false,
        },
        {
            new: true,
            validateModifiedOnly: true,
        }
    );

    // nofify other that user offline
    if (user) {
        socket.broadcast.emit('user-disconnected', {
            message: `User ${user.name} has gone offline`,
            userId: user._id,
            status: "Online",
        })
    }
    else {
        console.log("User not found");
    }
};


module.exports = disconnectHandler;