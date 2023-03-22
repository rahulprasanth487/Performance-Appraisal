require('dotenv').config()
const express=require('express')
const MongoClient = require('mongodb').MongoClient
const dbname ="Performance_appraisal";
async function func(){
      let obj = null;
      
      MongoClient.connect(process.env.MONGO_URI,function(err,db){
            if(err) throw err;
            var dbo=db.db(dbname);
            dbo.listCollections().toArray(function(err,collectionInfos){
                  console.log(collectionInfos)
                  return collectionInfos;
                  db.close();
            })
      })
      
}
module.exports={func};