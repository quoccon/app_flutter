const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const initWebRouter = require('./router/web');
const session = require('express-session');

const app = express();
const PORT = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
// app.use(session({
//     recret:'duognhuyngtrgang',
//     resave:true,
//     saveUninitialized:true
// }));





initWebRouter(app);
app.listen(PORT,() => {
    console.log("Server listening on :" + PORT);
})

