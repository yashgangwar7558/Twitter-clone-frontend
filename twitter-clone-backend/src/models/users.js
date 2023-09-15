const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
    uuid: {
        type: String,
        default: uuidv4,
        unique: true,
    },
    display_name: {
        type: String,
        required: true,
    },
    user_handle: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: true,
    },
    profile_pic: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLe5PABjXc17cjIMOibECLM7ppDwMmiDg6Dw&usqp=CAU"
    },
    password: {
        type: String,
        required: true,
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            }
        }
    ]
}, {
    timestamps: true
})

// to hash the password before storing it for security
userSchema.pre('save', async function (next) {
    try {
        if (this.isModified('password')) {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(this.password, saltRounds);
            this.password = hashedPassword;
        }
    } catch (error) {
        next(error);
    }
});

// generatimh the jwt auth token
userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ uuid: this.uuid.toString() }, process.env.SECRET_KEY)
        this.tokens = this.tokens.concat({ token: token });
        await this.save()
        return token
    } catch (error) {
        console.log(error);
    }
}

const Users = new mongoose.model("Users", userSchema);

module.exports = Users;