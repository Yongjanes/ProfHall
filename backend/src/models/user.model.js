import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const settingSchema = new mongoose.Schema(
    {
        isPrivate: {
            type: Boolean,
            default: false
        },
        allowSearchIndex: {
            type: Boolean,
            default: false
        },
        showAnalytics: {
            type: Boolean,
            default: false
        },
        notifications: {
            email: {
                type: Boolean,
                default: true
            },
            sms: {
                type: Boolean,
                default: true
            }
        }
    }
)

const cardSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        url: {
            type: String,
        },
        icon: {
            type: String,
        },
        order: {
            type: Number,
            default: 0
        },
        cardType: { 
            type: String,
            enum: ["social", "video", "product"],
            required: true
        },
        style: {
            background: {
                type: String
            },
            textColor: {
                type: String
            }
        },
        meta: {
            type: mongoose.Schema.Types.Mixed,
            default: {}
        },
        clicks: {
            type: Number,
            default: 0
        }
    }, 
    {
        timestamps: true
    }
)

const userSchema = new mongoose.Schema(
    {
        username: { // link name (unique)
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        fullname: { // name that will be displayed in the page
            type: String,
            required: true,
            index: true
        },
        avatar: {
            type: String,
            default: ""
        },
        bio: {
            type: String,
            default: ""
        },
        settings: {
            settingSchema
        },
        theme: {
            background: {
                type: String,
            },
            textColor: {
                type: String
            },
            primary: {
                type: String
            },
            secondary: {
                type: String
            }, 
            accent: {
                type: String
            },
            font: {
                type: String
            },
            effects: {
                effectType: {
                    type: String,
                    enum: ["flat", "glassmorphism", "neumorphism", "outlined", "glow"] // for now
                }, 
                shadow: {
                    type: String,
                    enum: ["sm", "md", "lg", "xl"]
                },
                borderRadius: {
                    type: String,
                    enum: ["sm", "md", "lg", "full"]
                }
            }
        },
        password: {
            type: String,
            required: [true, "Password is required!"],
        },
        cards: [
            cardSchema
        ],
        refreshToken: {
            type: String
        },
        views: {
            type: Number,
            default: 0
        }
    }, 
    {
        timestamps: true
    }
)

// make functions required for user model

userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        return next()
    }
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email: this.email,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User = new mongoose.model("User", userSchema)


// {
//   "_id": "650f8b12a0b3c123456789ab",
//   "username": "rohitp",
//   "email": "rohit@example.com",
//   "fullname": "Rohit Pali",
//   "avatar": "https://example.com/avatar.jpg",
//   "bio": "Full-stack developer who loves Node.js and music.",
//   "theme": {
//     "background": "#0a0913",
//     "textColor": "#e5e4f3",
//     "primary": "#a39bd1",
//     "secondary": "#6a3169",
//     "accent": "#b05392",
//     "font": "Inter",
//     "effects": {
//       "effectType": "glassmorphism",
//       "shadow": "lg",
//       "borderRadius": "md"
//     }
//   },
//   "password": "$2b$10$X5UJYX...hashedPasswordHere...",
//   "cards": [
//     {
//       "_id": "650f8b12a0b3c123456789ac",
//       "title": "GitHub",
//       "url": "https://github.com/rohitp",
//       "icon": "github",
//       "order": 1,
//       "cardType": "social",
//       "style": {
//         "background": "#24292e",
//         "textColor": "#ffffff"
//       },
//       "meta": {
//         "followers": 120,
//         "repos": 15
//       },
//       "createdAt": "2025-09-17T12:00:00.000Z",
//       "updatedAt": "2025-09-17T12:00:00.000Z"
//     },
//     {
//       "_id": "650f8b12a0b3c123456789ad",
//       "title": "My Portfolio",
//       "url": "https://rohit.dev",
//       "icon": "globe",
//       "order": 2,
//       "cardType": "custom",
//       "style": {
//         "background": "#1e1e2f",
//         "textColor": "#e5e4f3"
//       },
//       "meta": {
//         "description": "Personal portfolio website",
//         "clicks": 89
//       },
//       "createdAt": "2025-09-17T12:05:00.000Z",
//       "updatedAt": "2025-09-17T12:05:00.000Z"
//     },
//     {
//       "_id": "650f8b12a0b3c123456789ae",
//       "title": "Latest YouTube Video",
//       "url": "https://youtube.com/watch?v=xyz123",
//       "icon": "youtube",
//       "order": 3,
//       "cardType": "video",
//       "style": {
//         "background": "#ff0000",
//         "textColor": "#ffffff"
//       },
//       "meta": {
//         "views": 240,
//         "likes": 32,
//         "channel": "Rohit Codes"
//       },
//       "createdAt": "2025-09-17T12:10:00.000Z",
//       "updatedAt": "2025-09-17T12:10:00.000Z"
//     }
//   ],
//   "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
//   "createdAt": "2025-09-17T11:59:00.000Z",
//   "updatedAt": "2025-09-17T12:20:00.000Z"
// }
