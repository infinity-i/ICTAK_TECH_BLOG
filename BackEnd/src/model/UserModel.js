const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, (err) => {
    if (!err){
        console.log("connected to DB");
    }
    else {
        console.log("Error in connection to DB:" + JSON.stringify(err, undefined, 2));
    }
});

const userSchema = new mongoose.Schema({
    fullName: { type: String,required:true },
    email: { type: String,required:true, unique: true},
    password: { type: String, required:true },
    repeatPassword: { type: String, required:true },
    userType: { type: String,required:true }
});

userSchema.pre("save", async function(next) {
    if (this.isModified("password")){
        console.log(`${this.password}`);
        this.password = await bcrypt.hash(this.password,5);       
        console.log(`${this.password}`);
        this.repeatPassword=undefined;
    }
    next();
})

const users =new  mongoose.model('User',userSchema);
module.exports = users;