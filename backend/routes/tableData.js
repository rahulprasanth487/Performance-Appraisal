const express=require('express');
const router=express.Router()
const table_list =  require('../models/tablesList')

let obj=null;
let table_name=null;
router.post('/',(req,res)=>{
      obj=req.body;
      console.log(
            Object.keys(obj).length,
            "List of the tables in the database = ",
            table_list.func()
      )
      
      if(obj!=null)
      {
            table_name=obj.tablename;
            res.json("Success")

            var MongoClient=require('mongodb').MongoClient;
            var url="mongodb://127.0.0.1:27017/";
            MongoClient.connect(url,function(err,db){
                  if(err) throw err;
                  var dbp = db.db("Performance_appraisal");
                  dbp.createCollection(obj.tablename,function(err,res){
                        console.log("Collection create successflly")
                  });
            });
      }
})





module.exports=router