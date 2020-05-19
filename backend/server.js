const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userroutes = require("./routes/User.routes")
const cors = require('cors');
const path = require('path')
const PORT = process.env.PORT || 5000;
const app = express();

const dbUrl = 'mongodb+srv://todoAdmin:hack@todo@cluster0-u9h7j.mongodb.net/test?retryWrites=true&w=majority'
app.use(bodyParser.json());
app.use(cors())
app.use('/user',userroutes);
app.use(express.static(path.join(__dirname, '../build')));
app.get('*', (req, res) => {
  res.sendFile('index.html', {root: path.join(__dirname, '../build/')});
})

mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`Database connected successfully`))
  .catch((err) => console.log(err));
app.listen(PORT,() =>{
    console.log(`Server listening on port ${PORT}.`);
})