require('dotenv').config()

const tableData=require('./routes/tableData')
const adminLogin=require("./routes/adminLogin")
const admin_routes=require("./routes/admin_routes")
const user_routes=require("./routes/userRoutes")
const new_register_routes=require("./routes/new_register_routes")
const express=require('express');
const app=express();
const mongoose=require('mongoose');
const cors=require("cors")

app.use(cors())

//middleware
app.use(express.json())
app.use((req,res,next)=>{
      console.log(req.path,req.method);
      next();
})

app.use('/api/tablesCreate/',tableData)
app.use('/api/adminlogin/',adminLogin)
app.use('/api/',admin_routes)
app.use('/api/',admin_routes)
app.use('/api/user/',user_routes)
app.use('/api/new_register/',new_register_routes)
//DB connection
mongoose.set('strictQuery',true);
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
      console.log("CONNECTED WITH DB");
      app.listen(process.env.PORT,()=>{
            console.log("LISTENING TO THE PORT 4000")
      })
})

.catch((err)=>console.log(err.name))
