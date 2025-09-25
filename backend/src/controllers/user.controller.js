import { User } from "../models/user.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { uploadOnAppwrite, deleteOnAppwrite } from "../utils/appwrite.js"


const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = await user.generateAccessToken()
        const refreshToken = await user.generateRefreshToken()
        
        user.refreshToken = refreshToken

        await user.save({ validateBeforeSave: false })
        
        return { accessToken, refreshToken } 

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating access and refresh Token")
    }
}

const registerUser = asyncHandler( async (req, res) => { //  /auth/register
    // get user details
    // validate the entries - as if they are not empty and all
    // check if the user already exists 
    // take avatar image
    // upload image on appwrite
    // create user object - create entry in database
    // remove password and refresh token
    // remove the files after uploading
    // save in database
    // return result
    const { username, email, fullname, password } = req.body

    if ([username, email, fullname, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All Fields are required!")
    }

    const existingUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existingUser) {
        throw new ApiError(400, "Username or Email already exists!")
    }

    if (!req.file) {
        throw new ApiError(400, "Avatar file is Required!")
    }

    const avatarLocalPath = req.file.path

    const avatar = await uploadOnAppwrite(avatarLocalPath)

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }

    const user = await User.create({
        username: username,
        email: email, 
        fullname: fullname,
        avatar: avatar,
        password: password,
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if (!createdUser) {
        throw new ApiError(500, "User not found in database!")
    }

    return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User created  Successfully!"))
})

const loginUser = asyncHandler( async (req, res) => { // /auth/login
    
    const {email,  username, password} = req.body

    if (!username && !email) {
        throw new ApiError(400, "username or email is required")
    }
    
    const user = await User.findOne({
        $or: [ { username }, { email } ] 
    })

    if (!user) {
        throw new ApiError(404, "User does not exist")
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password)

    if (!isPasswordCorrect) {
        throw new ApiError(401, "Invalid User Credentials!")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser,
                accessToken,
                refreshToken
            },
            "User Logged In Successsfully"
        )
    )

})

const logoutUser = asyncHandler( async (req, res) => { // /auth/logout
    
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
        new ApiResponse(
            200,
            {},
            "User Logged Out"
        )
    )
})

const getCurrentUser = asyncHandler( async (req, res) => { // /auth/me
    
    const currentUser = await User.findById(req.user?._id)

    if (!currentUser) {
        throw new ApiError(401, "Unathorised User")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            currentUser,
            "User fetched successfully"
        )
    )
})

const changePassword = asyncHandler( async (req, res) => { // /auth/change-password

    const { oldPassword, newPassword } = req.body

    const user = await User.findById(req.user?._id)

    if (!user) {
        throw new ApiError(400, "Unauthorised Request.")
    }

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid Old Password.")
    }

    user.password = newPassword

    await user.save( { validateBeforeSave: false } )
    
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {},
            "Password updated successfully."
        )
    )
})

const updateUserDetails = asyncHandler( async (req, res) => { // /users/update
    
    const {fullname, email, bio} = req.body

    if ([fullname, email, bio].some((ele) => ele.trim() === "")) {
        throw new ApiError(400, "Entries cannot be empty")
    }

    // add email validator

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                fullname: fullname,
                email: email,
                bio: bio
            }
        },
        {
            new: true
        }
    ).select("-password -refreshToken")

    if (!user) {
        throw new ApiError(400, "Unauthorized request.")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            user,
            "Profile Updated Successfully."
        )
    )
})

const updateUserAvatar = asyncHandler( async (req, res) => { // /users/avatar
    
    const user = await User.findById(req.user?._id)

    if (!user) {
        throw new ApiError(400, "Unauthorized request.")
    }
    
    const localAvatarPath = req.file?.path;
    
    if (!localAvatarPath) {
        throw new ApiError(400, "Avatar File is Required.")
    }
    
    const avatarToBeDeleted = user.avatar;

    if (!avatarToBeDeleted) {
        throw new ApiError(500, "Internal Server Error.")
    }

    const isDeleted = await deleteOnAppwrite(avatarToBeDeleted)

    if (!isDeleted) {
        throw new ApiError(500, "Problem while deleting current Avatar")
    }

    const avatar = await uploadOnAppwrite(localAvatarPath)

    user.avatar = avatar

    await user.save({validateBeforeSave: false})

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {},
            "Avatar updated Successfully."
        )
    )
})

const getUser = asyncHandler( async (req, res) => { // /users/:username
    const { username } = req.params

    if (!username) {
        throw new ApiError(404, "User Not Found!")
    }

    const user = await User.findOneAndUpdate({ username: username }, {$inc: { views: 1 }}, {new: true, select: "-password -refreshToken"})

    if (!user) {
        throw new ApiError(404, "User Not Found!")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            user,
            "User Found SuccessFully"
        )
    )
})

const updateUserTheme = asyncHandler( async (req, res) => { // /users/theme
    const { theme } = req.body
    
    if (!theme) {
        throw new ApiError(400, "Theme field cannot be empty.")
    }

    const user = await User.findById(req.user?._id)

    if (!user) {
        throw new ApiError(400, "Unauthorized request.")
    }

    user.theme = theme

    await user.save({validateBeforeSave: false})

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {},
            "Theme updated Successfully"
        )
    )

})

const updateUserSettings = asyncHandler( async (req, res) => { // /users/settings
    const { settings } = req.body

    if (!settings) {
        throw new ApiError(400, "Settings cannot be Empty.")
    }

    const user = await User.findById(req.user?._id)

    if (!user) {
        throw new ApiError(400, "Unauthorized request.")
    }

    user.settings = settings

    await user.save({validateBeforeSave: false})

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {},
            "Settings updated Successfully."
        )
    )

})

const deleteAccount = asyncHandler( async (req, res) => { // /users/delete
    
    const deleted = await User.deleteOne({_id: req.user?._id})

    if (deleted.deletedCount === 0) {
        throw new ApiError(400, "Unauthorised Request (user not deleted)")
    }

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
        new ApiResponse(
            200,
            {},
            "Account Deleted Successfully. Bai Bai"
        )
    )

})

const addCard = asyncHandler( async (req, res) => { // /users/cards
    // {
    //     "title": "GitHub",
    //     "url": "https://github.com/rohitp",
    //     "icon": "github",
    //     "order": 1,
    //     "cardType": "social",
    //     "style": {
    //         "background": "#24292e",
    //         "textColor": "#ffffff"
    //     },
    //     "meta": {
    //         "followers": 120,
    //         "repos": 15
    //     }
    // }

    const userId = req.user?._id

    if (!userId) {
        throw new ApiError(401, "Unauthorized rrequest")
    }

    const { title, url, icon, order, cardType, style, meta } = req.body

    if (!title || !cardType) {
        throw new ApiError(400, "title and cardType are required!")
    }

    const newCard = {
        title,
        url,
        icon,
        order: order || 0,
        cardType,
        style: style || {},
        meta: meta || {},
        clicks: 0
    }

    const updateUser = await User.findByIdAndUpdate(
        userId,
        {
            $push: {
                cards: newCard
            }
        },
        {
            new: true,
            runValidators: true
        }
    )

    if (!updateUser) {
        throw new ApiError(404, "User not found!")
    }

    return res
    .status(201)
    .json(
        new ApiResponse(
            201,
            updateUser.cards,
            "Card Added Successfully."
        )
    )

})

const deleteCard = asyncHandler( async (req, res) => { // /users/cards/:cardId
    
    const userId = req.user?._id

    if (!userId) {
        throw new ApiError(401, "Unauthorized request")
    }

    const cardId = req.params.cardId

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
            $pull: {
                cards: {
                    _id: cardId
                }
            }
        },
        {
            new: true
        }
    )

    if (!updatedUser) {
        throw new ApiError(404, "User Not found")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200, 
            updatedUser.cards,
            "Card deleted successfully"
        )
    )
})

const updateCard = asyncHandler( async (req, res) => { // /users/cards/:cardId
    const userId = req.user?._id

    if (!userId) {
        throw new ApiError(401, "Unauthorized request")
    }

    const cardId = req.params.cardId

    const updates = req.body

    if ("clicks" in updates) delete updates.clicks

    const updatedUser  = await User.findOneAndUpdate(
        { _id: userId, "cards._id": cardId},
        {
            $set: Object.fromEntries(Object.entries(updates).map(([k, v]) => [`cards.$.${k}`, v]))            
        },
        {
            new: true,
            runValidators: true
        }
    )

    if (!updatedUser) {
        throw new ApiError(404, "User not found")
    }

    const updatedCard = updatedUser.cards.id(cardId)

    return res
    .status(200)
    .json(
        new ApiResponse(
            200, 
            updatedCard,
            "Card Updated Successfully"
        )
    )

})

const reorderCards = asyncHandler( async (req, res) => { // /users/cards/reorder
    const userId = req.user?._id

    const { orderedCardIds } = req.body
    
    if (!Array.isArray(orderedCardIds)) {
        throw new ApiError(400, "orderCardIds must be an array")
    }
    
    const user = await User.findById(userId)
    
    if (!user) {
        throw new ApiError(404, "User not found")
    }

    const newCardsOrder = []

    orderedCardIds.forEach((id, index) => {
        const card = user.cards.id(id)
        if (card) {
            card.order = index+1
            newCardsOrder.push(card)
        }
    })

    user.cards = newCardsOrder

    await user.save({validateBeforeSave: false})

    return res
    .status(200)
    .json(
        new ApiResponse(
            200, 
            user.cards,
            "Cards reordered successfully"
        )
    )

})

// const getSearchedUser = asyncHandler( async (req, res) => { // /users/:username/search?query=xyz

// })

// analytics like views and clicks

export { 
    registerUser, 
    loginUser, 
    logoutUser, 
    getCurrentUser, 
    changePassword, 
    updateUserDetails, 
    updateUserAvatar, 
    getUser, 
    updateUserTheme, 
    updateUserSettings, 
    deleteAccount ,
    addCard,
    deleteCard,
    updateCard,
    reorderCards
}