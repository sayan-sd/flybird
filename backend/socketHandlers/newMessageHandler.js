const Conversation = require("../Models/Conversation");
const Message = require("../Models/Message");

const newMessageHandler = async (socket, data, io) => {
    const { message, conversationId } = data;
    const { author, content, media, audioUrl, document, type, giphyUrl } =
        message;

    try {
        // 1. find the conversation
        const conversation = await Conversation.findById(conversationId);

        if (!conversation) {
            return socket.emit("error", { message: "Conversation not found" });
        }

        // 2. create a new message
        const newMessage = await Message.create({
            author,
            content,
            media,
            audioUrl,
            document,
            type,
            giphyUrl,
        });

        // 3. in the conversation push the new message
        conversation.messages.push(newMessage._id);

        // 4. populate the conversation
        const updatedConversation = await Conversation.findById(conversationId)
            .populate("messages")
            .populate("participants");

        // 5. find online participants
        const onlineParticipants = updatedConversation.participants.filter(
            (participant) =>
                participant.status === "Online" && participant.socketId
        );

        // 6. emit new msg to online participants
        onlineParticipants.forEach((participant) => {
            io.to(participant.socketId).emit("new-direct-chat", {
                conversationId: conversationId,
                message: newMessage
            });
        });
    } catch (error) {
        console.error(`Error in newMessageHandler: ${error.message}`);
        socket.emit("error", { message: "Failed to send message" });
    }
};

module.exports = newMessageHandler;