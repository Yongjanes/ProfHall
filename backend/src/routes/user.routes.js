import { Router } from "express"
import { loginUser, logoutUser, registerUser, getCurrentUser, changePassword, updateUserDetails, updateUserAvatar } from "../controllers/user.controller.js"
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"


const router = Router()

router.route("/register").post(upload.single("avatar"), registerUser);

router.route("/login").post(loginUser);


// secured Routes

router.route("/logout").post(verifyJWT, logoutUser)

router.route("/me").get(verifyJWT, getCurrentUser)

router.route("/change-password").put(verifyJWT, changePassword)

router.route("/update").patch(verifyJWT, updateUserDetails)

router.route("/avatar").patch(verifyJWT, updateUserAvatar)

export default router