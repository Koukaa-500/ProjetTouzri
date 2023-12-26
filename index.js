const express = require ('express');
require('./config/connect'); //connection to db
const app = express();
app.use(express.json()); //to let app use json format

// const loginRoute = require('./routes/login');
const authentificationRoute = require('./routes/athentication');
const taskRoute = require('./routes/task');
const commentRoute = require('./routes/comment');

app.use('/authentification', authentificationRoute);
app.use('/comment', commentRoute);
app.use('/task', taskRoute)
app.listen(3000, ()=>{
    console.log("server works!");
})