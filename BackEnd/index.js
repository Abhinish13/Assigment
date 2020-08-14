const express = require('express')
const mongoose = require('mongoose')
mongoose.connect('mongodb://dbuser:dbuser1@ds241977.mlab.com:41977/emailvault',{ useUnifiedTopology: true,useNewUrlParser: true })
const cors = require('cors');
const app = express()
const port = process.env.PORT | 80 



// app.get('/',(req,res) => {
//     res.send("Hello ")
// });

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.use('/api',require('./routes/routes'))

app.listen(port)