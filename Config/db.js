const mongoose = require('mongoose')
const connectDb = async () => {
    try {
       await mongoose.connect('mongodb+srv://anushma2015:6Hj0J3TeRvF45hsS@cluster0.vq2uu.mongodb.net/');   //mongodbaltlas connection
       //await mongoose.connect('mongodb://127.0.0.1:27017/learnbuds');      //mongodbcompass connection
    
        console.log("MongoDb database connected");
    } catch (err) {
        console.log(err);
    }

}
module.exports=connectDb 


//6Hj0J3TeRvF45hsS
//mongodb+srv://anushma2015:6Hj0J3TeRvF45hsS@cluster0.vq2uu.mongodb.net/