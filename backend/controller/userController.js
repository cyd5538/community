const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const registerUser = asyncHandler(async (req, res) => {
    const { nickname, email, password } = req.body;

    // 세가지 중 하나라도 값이 안들어오면 400 error
    if (!nickname || !email || !password) {
        res.status(400).json({ error: "모두 입력해주세요" });
        return;
    }

    // 이미 존재하는 이메일인지 확인.
    const userExists = await User.findOne({ email });

    // 이미 존재하면
    if (userExists) {
        res.status(400).json({ error: "이미 사용중인 이메일입니다." });
        return;
    }

    // 비밀번호 해쉬화
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // 회원가입 유저 만들기
    const user = await User.create({
        nickname,
        email,
        password: hashPassword,
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            nickname: user.nickname,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(400).json({ error: "유효하지 않은 유저입니다." });
    }
});


const LoginUser = asyncHandler(async (req,res) => {
    const {email, password} = req.body

    // 가입이 되어있는 이메일인지 확안
    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id,
            nickname: user.nickname,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400).json({ error: "이메일과 패스워드를 확인해주세요" });
    }
})

const GetLoginUser = asyncHandler(async (req,res) => {
    const {_id, nickname, email, profileImage } = await User.findById(req.user.id)
    res.status(200).json({
        id: _id,
        email,
        nickname,
        profileImage
    }) 
})

const updateUser = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { nickname, profileImage } = req.body;

    const existingUserWithNickname = await User.findOne({ nickname });

    if (existingUserWithNickname && existingUserWithNickname._id.toString() !== userId) {
        return res.status(400).json({ message: "이미 존재하는 닉네임입니다." });
    }

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: { nickname, profileImage } },
        { new: true } 
    );

    if (!updatedUser) {
        return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }

    const { _id, email, nickname: updatedNickname, profileImage: updatedProfileImage } = updatedUser;

    res.status(200).json({
        id: _id,
        email,
        nickname: updatedNickname,
        profileImage: updatedProfileImage,
    });
});


const checkNickname = asyncHandler(async (req, res) => {
    const { nickname } = req.params;

    if (!nickname) {
        res.status(400).json({ error: "닉네임을 입력해주세요" });
        return;
    }

    const existingUser = await User.findOne({ nickname });

    if (existingUser) {
        res.status(400).json({ error: "이미 사용 중인 닉네임입니다." });
    } else {
        res.status(200).json({ message: "사용 가능한 닉네임입니다." });
    }
});

// 토큰 생성
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    })
}

module.exports = {
    registerUser,
    LoginUser,
    GetLoginUser,
    updateUser,
    checkNickname
    
}