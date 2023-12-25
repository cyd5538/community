const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
  let token

  // Request의 header의 Authorization에서 토큰을 추출한다.
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Authorization에는 'Bearer'가 포함되어 있기 때문에 Split 메소드를 이용하여 제거한다
      token = req.headers.authorization.split(' ')[1]

      // jwt.verify()함수를 이용하여 토큰 유효성을 확인
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      // .select('-password')하면 비밀번호를 읽어오지않는다
      req.user = await User.findById(decoded.id).select('-password')
      
      next()
    } catch (error) {
      console.log(error)
      res.status(401).json({ error: "인증되지 않았습니다" });
    }
  }

  if (!token) {
    res.status(402).json({ error: "토큰이 없습니다." });
  }
})

module.exports = { protect }