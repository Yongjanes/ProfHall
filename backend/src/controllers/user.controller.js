import { User } from "../models/user.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { uploadOnAppwrite } from "../utils/appwrite.js"


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

const registerUser = asyncHandler( async (req, res) => {
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

const loginUser = asyncHandler( async (req, res) => {
    
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

const logoutUser = asyncHandler( async (req, res) => {
    
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

const getCurrentUser = asyncHandler( async (req, res) => {
    
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

const changePassword = asyncHandler( async (req, res) => {

    const { oldPassword, newPassword } = req.body

    const user = await User.findById(req.body?._id)

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

const updateUserDetails = asyncHandler( async (req, res) => {

})

const updateUserAvatar = asyncHandler( async (req, res) => {

})

// routes for cards and delete account , delete cards, and analytics like views and clicks

export { registerUser, loginUser, logoutUser, getCurrentUser, changePassword, updateUserDetails, updateUserAvatar }