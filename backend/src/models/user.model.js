import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const cardSchema = mongoose.Schema(
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
            enum: ["social", "video", "product", "image", "custom"]
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
        }
    }, 
    {
        timestamps: true
    }
)

const userSchema = mongoose.Schema(
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
            type: String
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
                    type: string,
                    enum: ["sm", "md", "lg", "xl"]
                },
                borderRadius: {
                    type: string,
                    enum: ["sm", "md", "lg", "full"]
                }
            }
        },
        password: {
            type: String,
            required: [true, "Passwrod is required!"],
        },
        cards: [
            cardSchema
        ],
        refreshToken: {
            type: String
        }
    }, 
    {
        timestamps: true
    }
)

// make functions required for user model

userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        next()
    }
    this.password = bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = () => {
    return bcrypt.compareSync(password, this.password)
}

userSchema.methods.generateAccessToken = async function() {
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

userSchema.methods.generateRefreshToken = async function() {
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


export const User = mongoose.model("User", userSchema)