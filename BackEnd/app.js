require('./config/config');
require('./src/model/UserModel')

const express= require('express');
const cors = require('cors');
const bodyparser = require('body-parser');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const app = new express;
app.use(express.urlencoded({extended:true}));
app.use(express.json());
//middleware
// command line added for the test purpose(as12)
app.use(bodyparser.json());
app.use(cors());

app.listen(process.env.PORT,()=>{
    console.log(`Server up and running in ${process.env.PORT}`);
})
