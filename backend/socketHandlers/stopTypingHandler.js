const User = require("../Models/User");

const stopTypingHandler = async (socket, data, io) => {
    const { userId, conversationId } = data; // ( uid of your friend not yours)

    // fetch user
    const user = await User.findOne(userId);

    // send typing notification to your friend
    if (user && user.status === 'Online' && user.socketId) {
        const dataToSend = {
            conversationId, 
            typing: false, 
        }

        io.to(user.socketId).emit('stop-typing', dataToSend);
    }
    else {
        console.log('User not found or offline');
    }
};

module.exports = stopTypingHandler;