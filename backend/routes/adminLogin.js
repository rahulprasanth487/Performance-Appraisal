require('dotenv').config()
const express = require('express')
const router = express.Router()
const MongoClient=require('mongodb').MongoClient;


router.get("/",(req,res)=>{
      console.log("DONE")
      MongoClient.connect(process.env.MONGO_URI,function(err,db){
            if(err) throw err;
            var dbo = db.db("Performance_appraisal");
            dbo.collection("admin_login").findOne({},function(err,result){
                  if(err) throw err;
                  res.json(result)
                  return result;
            });
      });
});


module.exports=router;