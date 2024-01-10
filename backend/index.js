const express = require('express');
const dotenv = require('dotenv').config()
const cors = require('cors');
const connectDB = require('./config/db')
const { createServer } = require("http");
const { Server } = require('socket.io');


const port = process.env.PORT || 5000;
const app = express();
const httpServer = createServer(app);
connectDB()

app.use(express.json());
app.use(cors());
app.use('/api/users', require('./routes/userRoutes.js'))
app.use('/api/posts', require('./routes/postRoutes.js'));
app.use('/api/posts', require('./routes/likeRoute.js'));
app.use('/api/comments', require('./routes/commentRoute.js'));

require("./models/likeModel.js");
require("./models/commentModel.js");


const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173"
  }
})

require("./utils/chat")(io)

httpServer.listen(5001, () => {
  console.log("서버연결")
})  

app.listen(port, () => {
  console.log(`server connected ${port}`)
})