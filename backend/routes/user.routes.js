const router = require("express").Router();
const {
    getMe,
    updateMe,
    updateAvatar,
    updatePassword,
    getUsers,
    startConversation,
    getConversations,
} = require("../controllers/userController");
const { protect } = require("../controllers/authController");

router.get("/me", protect, getMe);
router.patch("/me", protect, updateMe);
router.patch("/avatar", protect, updateAvatar);
router.patch("/password", protect, updatePassword);

router.get("/users", protect, getUsers);
router.post("/start-conversation", protect, startConversation);
router.get("/conversation", protect, getConversations);

module.exports = router;
