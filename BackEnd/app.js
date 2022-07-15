require('./config/config');
const userModel = require('./src/model/UserModel')

const express= require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require ("bcryptjs");
const req = require('express/lib/request');
const app = new express();


app.use(express.json());
app.use(express.urlencoded({extended:false}));
//middleware
//app.use(bodyparser.json());
//app.use(bodyparser.urlencoded({ extended: false }))
app.use(cors());


app.post('/register', async(req,res) => {
    try {
        const password= req.body.password;
        const confpassword= req.body.repeatPassword;
        if(password === confpassword){
            const userdata = new userModel({
                fullName : req.body.fullName,
                email : req.body.email,
                password : req.body.password,
                repeatPassword : req.body.repeatPassword,
                userType : req.body.userType
            })
            //password hashing

            const user= await userdata.save();
            res.status(201);
            //.render("login")
        }else{
            res.send("Password not matching");
        }
    } catch (error) {
        res.status(400).send(error);
    }
})

app.post('/login', async(req,res) => {
    try{
        const email = req.body.email;
        const password = req.body.password;
        const useremail = await userModel.findOne({email:email});
        if (useremail.password === password){
            res.status(201);
            //.render the homepage
            console.log("key value matches");
        }else {
            res.send("Invalid credentials");
        }     
    }catch (error) {
        res.status(400).send("Invalid credentials");
    }
})




app.listen(process.env.PORT,()=>{
    console.log(`Server up and running in ${process.env.PORT}`);
})
