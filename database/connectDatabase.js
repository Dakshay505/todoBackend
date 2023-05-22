import mongoose from 'mongoose'

export const connectdb = function(){
    mongoose.connect(process.env.DB_URI,{
        dbName:"todobackend"
    }).then((c)=>{
        console.log(`database connected ${c.connection.host}`);
    }).catch((e)=>{
        console.log(e);
    })
}