const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userroutes = require("./routes/User.routes")
const todoRoutes = require('./routes/Todo.routes')
const cors = require('cors');
const path = require('path')
const PORT = process.env.PORT || 5000;
const cookieParser = require('cookie-parser');
const app = express();

const dbUrl = 'Your Connection Url'
app.use(bodyParser.json());
app.use(
  cors({
    origin: [
      'http://localhost:3000','https://memoranda-todo.herokuapp.com/'
    ],
    credentials: true
  })
);
app.use(cookieParser());
app.use('/user',userroutes);
app.use('/todo',todoRoutes);
app.use(express.static(path.join(__dirname, '../build')));
app.get('*', (req, res) => {
  res.sendFile('index.html', {root: path.join(__dirname, '../build/')});
})

mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true ,useFindAndModify:false})
  .then(() => console.log(`Database connected successfully`))
  .catch((err) => console.log(err));
app.listen(PORT,() =>{
    console.log(`Server listening on port ${PORT}.`);
})
