const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, (err) => {
    if (!err){
        console.log("connected to DB");
    }
    else {
        console.log("Error in connection to DB:" + JSON.stringify(err, undefined, 2));
    }
});

const postSchema = new mongoose.Schema({
    title: { type: String,required:true,unique:true },
    content: { type: String,required:true},
    username: { type: String, required:true },
    // category: { type: String,default: null },
    // approved: { type: String,default: false,required:false }
});

const posts =new  mongoose.model('Post',postSchema);
module.exports = posts;