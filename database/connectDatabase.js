import mongoose from 'mongoose'

export const connectdb = function(){
    mongoose.connect("mongodb://localhost:27017",{
        dbName:"todobackend"
    }).then(()=>{
        console.log("database connected .");
    }).catch((e)=>{
        console.log(e);
    })
}