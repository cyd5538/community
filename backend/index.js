const express = require('express');
const dotenv = require('dotenv').config()
const cors = require('cors');
const connectDB = require('./config/db')

const port = process.env.PORT || 5000;
const app = express();
connectDB()

app.listen(port, () => {
  console.log(`server connected ${port}`)
})