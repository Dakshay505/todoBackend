import {app} from "./app.js";
import {connectdb} from "./database/connectDatabase.js";


// connecting database
connectdb();

app.listen(process.env.PORT,()=>{
    console.log(`server is working on PORT ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
})