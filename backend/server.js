const express = require('express');
const app = express();
const path = require('path')
const PORT = process.env.PORT || 5000;

// app.get('/',(req,res) => {
//     res.send("Hello Welcome to todo Application")
// })

app.use(express.static(path.join(__dirname, '../build')))

app.listen(PORT,() =>{
    console.log(`Server listening on port ${PORT}.`);
})