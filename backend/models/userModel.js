const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    nickname: {
        type: String,
        required: [true, "닉네임을 입력해주세요"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "이메일을 입력해주세요"]
    },
    password: {
        type: String,
        required: [true, "패스워드를 입력해주세요"]
    },
    profileImage: {
        type: String,
        default: null
    }
},
{
    timestamps : true
})

module.exports = mongoose.model('User', userSchema);