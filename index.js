const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const initWebRouter = require('./router/web');
const http = require("http");
const socketIo = require("socket.io");
const session = require('express-session')



const app = express();
const PORT = 8000;
const server = http.createServer(app);
const io = socketIo(server);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(session({
    secret:'hdbjasfbhvsjdf',
    resave:false,
    saveUninitialized:true
}));

io.on('connection',(socket) => {
    console.log("User connection");

    const userId = socket.request.session.userId;
    console.log("User ID from session:", userId);

    socket.on("disconnect",() => {
        console.log("User disconnect");
    });
})



initWebRouter(app,io);
app.listen(PORT,() => {
    console.log("Server listening on :" + PORT);
})

