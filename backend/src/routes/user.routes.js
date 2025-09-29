import { Router } from "express"
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

import { 
    loginUser, 
    logoutUser, 
    registerUser, 
    getCurrentUser, 
    changePassword, 
    updateUserDetails, 
    updateUserAvatar,
    getUser,
    updateUserTheme,
    updateUserSettings,
    deleteAccount,
    addCard,
    deleteCard,
    updateCard,
    reorderCards,

} from "../controllers/user.controller.js"


const router = Router()


// Public Routes
router.route("/register").post(upload.single("avatar"), registerUser);
router.route("/login").post(loginUser);
router.route("/users/:username").get(getUser)

// Refresh token route (PUBLIC)
router.route("/refresh").get(refreshAccessToken);

// Secured Routes
router.use(verifyJWT)

router.route("/logout").post(logoutUser)
router.route("/me").get(getCurrentUser)
router.route("/change-password").put(changePassword)
router.route("/update").patch(updateUserDetails)
router.route("/avatar").patch(upload.single("avatar"), updateUserAvatar)
router.route("/theme").patch(updateUserTheme)
router.route("/settings").patch(updateUserSettings)
router.route("/delete").delete(deleteAccount)

// cards

router.route("/cards").post(addCard)
router.route("/cards/:cardId").delete(deleteCard)
router.route("cards/:cardId").patch(updateCard)
router.route("/cards/reorder").patch(reorderCards)

export default router