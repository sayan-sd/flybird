const Conversation = require("../Models/Conversation");

const chatHistoryHandler = async (socket, data) => {
    try {
        const { conversationId } = data;

        // find convo and populate msgs
        const conversation = await Conversation.findById(conversationId).select('messages').populate('messages');

        if (!conversation) {
            return socket.emit('error', { message: "Conversation not found" });
        }

        // Prepare the response data
        const res_data = {
            conversationId,
            history: conversation.messages,
        }

        socket.emit('chat-history', res_data);
    }
    catch (error) {
        socket.emit("error", { message: 'Failed to fetch chat history', error });
    }
}

module.exports = chatHistoryHandler;