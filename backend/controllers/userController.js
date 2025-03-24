const Conversation = require("../Models/Conversation");
const User = require("../Models/User");
const catchAsync = require("../utils/catchAsync");

// Check user authentication
exports.getMe = catchAsync(async (req, res, next) => {
    const { user } = req;

    res.status(200).json({
        status: "success",
        message: "User found successfully!",
        data: {
            user,
        },
    });
});

// Update User information
exports.updateMe = catchAsync(async (req, res, next) => {
    const { name, jobTitle, bio, country } = req.body;
    const { _id } = req.user;

    // update info
    const updatedUser = await User.findByIdAndUpdate(
        _id,
        {
            name,
            jobTitle,
            bio,
            country,
        },
        { new: true, validateModifiedOnly: true }
    );

    res.status(200).json({
        status: "success",
        message: "User information updated successfully!",
        data: {
            user: updatedUser,
        },
    });
});

// Update Avatar
exports.updateAvatar = catchAsync(async (req, res, next) => {
    const { avatar } = req.body;
    const { _id } = req.user;

    // update avatar
    const updatedUser = await User.findByIdAndUpdate(
        _id,
        { avatar },
        { new: true, validateModifiedOnly: true }
    );

    res.status(200).json({
        status: "success",
        message: "User avatar updated successfully!",
        data: {
            user: updatedUser,
        },
    });
});

// Update Password
exports.updatePassword = catchAsync(async (req, res, next) => {
    const { currentPassword, newPassword } = req.body;
    const { _id } = req.user;

    // find user
    const user = await User.findById(_id).select("+password");

    // Password incorrect
    if (!(await user.correctPassword(currentPassword, user.password))) {
        return res.status(401).json({
            status: "error",
            message: "Current password is incorrect",
        });
    }

    // update password
    user.password = newPassword;
    user.passwordChangedAt = Date.now();

    await user.save({});

    res.status(200).json({
        status: "success",
        message: "Password updated successfully!",
    });
});

// Get All verified Users
exports.getUsers = catchAsync(async (req, res, next) => {
    const { _id } = req.user;

    const other_verified_users = await User.find({
        _id: { $ne: _id },
        verified: true,
    }).select("name avatar _id status");

    res.status(200).json({
        status: "success",
        message: "Users retrieved successfully!",
        data: {
            users: other_verified_users,
        },
    });
});

// Start a Conversation
exports.startConversation = catchAsync(async (req, res, next) => {
    const { userId } = req.body;
    const { _id } = req.user;

    // Check if a conversation btw users already exist
    let conversation = await Conversation.findOne({
        participants: { $all: [_id, userId] },
    })
        .populate("messages")
        .populate("participants");

    // if conversation already exists
    if (conversation) {
        return res.status(200).json({
            status: "success",
            message: "Conversation found successfully!",
            data: {
                conversation,
            },
        });
    }
    // if conversation doesn't exist
    else {
        let newConversation = await Conversation.create({
            participants: [_id, userId],
        });

        newConversation = await Conversation.findById(newConversation._id)
            .populate("messages")
            .populate("participants");
        
        return res.status(200).json({
            status: "success",
            message: "Conversation started successfully!",
            data: {
                conversation: newConversation,
            },
        })
    }
});

// Get all Conversations
exports.getConversations = catchAsync(async (req, res, next) => {
    const { _id } = req.user;

    // find all conversations where the logged in user is a participant
    const conversations = await Conversation.find({
        participants: {$in: [_id]},
    })
       .populate("messages")
        .populate("participants");
    
    res.status(200).json({
        status: "success",
        message: "Conversations retrieved successfully!",
        data: {
            conversations,
        },
    })
})
