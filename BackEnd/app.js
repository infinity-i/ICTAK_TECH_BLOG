require('./config/config');
const userModel = require('./src/model/UserModel');
const postModel = require('./src/model/PostModel');

const express= require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require ("bcryptjs");
const req = require('express/lib/request');
const posts = require('./src/model/PostModel');
const app = new express();


app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));

//For test purpose
app.get('/', (req, res) => {
    res.send({
      status: 'online'
    })
});

//Token Verification
// function verifyToken(req,res,next)
// {
//     if(!req.headers.authorization)
//     {
//         return res.status(401).send('Unauthorized request')
//     }
//     let token = req.headers.authorization.split('')[1]
//     console.log({token});
//     if (token =='null')
//     {
//         return res.status(401).send('Unauthorized request')
//     }
    
//     let payload= jwt.verify(token,'secretkey')

//     console.log(payload)
//     if(!payload)
//     {
//         return res.status(401).send('Unauthorized request')
//     }
//     req.userId=payload.subject
//    next()
// }

function verifyToken(req,res,next){
    let authHeader = req.headers.authorization;
    if(authHeader==undefined){
        res.status(401).send({error:"no token provided"})
    }
    let token = authHeader.split(" ")[1]
    jwt.verify(token,"secret",function(err,decoded){
        if(err){
            res.status(500).send({error:"Authentication failed"})
        }
        else {
            next();
        }
    }
    )
}


//Register API
app.post('/register', async (req,res)=> {

        console.log('reached');
        const password= req.body.password;
        const confpassword= req.body.repeatPassword;
        if(password === confpassword){
            const userdata = new userModel({
                fullName : req.body.registerUserData.fullName,
                email : req.body.registerUserData.email,
                phoneNo: req.body.registerUserData.phoneNo,
                password : req.body.registerUserData.password,
                repeatPassword : req.body.registerUserData.repeatPassword,
                userType : req.body.registerUserData.userType
            })
        const user= await userdata.save();
        res.status(201);
        console.log('registration successfull')
        }else{
            
            res.send("Password not matching");
        }  

})

//Login API
app.post('/login', async(req,res) => {

        const email = req.body.loginUserData.email;
        const password = req.body.loginUserData.password;
        const user = await userModel.findOne({email:email});
        console.log(user);
        if(user==null){
            console.log('user not found')
            res.status(401).send('user not found')
        }
         else{
            const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch){
            let payload = {subject: email+password}
            
            let token = jwt.sign(payload, 'secretKey')
            
            res.status(200).send({token})
            console.log("key value matches");
        }else {
            res.status(401).send("Invalid credentials");
        }    
    }});

    //admin login
      app.post('/admin/login', async(req,res) => {
        const email = req.body.loginUserData.email;
        const password = req.body.loginUserData.password;
        console.log(req.body);
        const user = await userModel.findOne({email:email});
        console.log(user);
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch){
            let payload = {subject: email+password}
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).send({token})
            console.log("key value matches");
        }else {
            res.status(401).send("Invalid credentials");
        }    
    });

    

//create post
app.post('/posts/savepost',function(req,res){
   console.log(req.body);
   const post = {       
        title : req.body.item.title,
        content : req.body.item.content,
        username : req.body.item.username,
        category : "undefined",
        imageUrl :  req.body.item.imageUrl
   }       
   const newpost = new postModel(post);
   newpost.save();
});

//Posts pending approval in admin page
app.get('/admin/pending', function(req,res){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods:GET,POST,PUT,DELETE");
    postModel.find({approved:false})
    .then(function(post){
        console.log('All pending Posts displayed');
        res.send(post);
    })
}) 

//To display all posts that are approved in home page
app.get('/posts', function(req,res){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods:GET,POST,PUT,DELETE");
    postModel.find({approved:true}).sort({createdttm:-1})
    .then(function(post){
        console.log('All Approved Posts displayed');
        res.send(post);
    })
})

//To display posts based on categories
app.get('/posts/category/:category',  (req, res) => {
    const id = req.params.id;
    postModel.find({"category":category})
      .then((posts)=>{
          res.send(posts);
      });
  })



// app.get('/admin/approve', function(req,res){
//     console.log(req.body.title)
//     id=req.body._id,
//     postModel.findByIdAndUpdate({"_id":id},{$set:{"approved":true}})
//             .then(function(){
//                 res.send();
//             })
// })
app.get('/singleblog/:id',(req, res)=>{
    const id = req.params.id;
    postModel.findOne({'_id':id})
    .then((i)=>{
        res.send(i);
        console.log(i);
    });
    // console.log(i)

})

//To change approved value on approval by admin
app.put('/admin/approve',(req,res)=>{
    console.log(req.body)
    id=req.body._id,
    category= req.body.category
    postModel.findByIdAndUpdate({"_id":id},{$set:{"category":category,
                                "approved":true
                                }})
   .then(function(){
       res.send();
   })

})

//To delete the post data on rejection by admin
app.delete('/admin/deny/:id',(req,res)=>{
   
    id = req.params.id;
    postmodel.findByIdAndDelete({"_id":id})
    .then(()=>{
        console.log('success')
        res.send();
    })
  })


//Port setup
app.listen(process.env.PORT,()=>{
    console.log(`Server up and running in ${process.env.PORT}`);
});


