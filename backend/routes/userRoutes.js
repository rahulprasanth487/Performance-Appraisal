require("dotenv").config();

const express = require("express");
const router=express.Router();
const MongoClient = require("mongodb").MongoClient;


//LOGIN DATA CHECK IN PERSONAL DETAILS TABLE
router.patch("/:_id", (req, res) => {
      const {_id}=req.params;
      const table_name=req.body.table;
      delete req.body.table;
      console.log(_id)
      const temp_obj=req.body;
      delete temp_obj._id;

      MongoClient.connect(process.env.MONGO_URI, function (err, db) {
            if (err) throw err;
            var dbo = db.db("Performance_appraisal");
            console.log(req.body)
            console.log(table_name)
            const query = { "_id": new require("mongodb").ObjectID(_id) };
            var newValues = { $set: temp_obj };
            
            dbo.collection(table_name).findOneAndUpdate(query,newValues ,function (err, result) {
                  if (err) throw err;
                  res.json(result)
                  return result;
            })
      })
})

router.get("/collectionData/:tableName", (req, res) => {
      const { tableName } = req.params;

      MongoClient.connect(process.env.MONGO_URI, function (err, db) {
            if (err) throw err;
            var dbo = db.db("Performance_appraisal");
            dbo.collection(tableName).find({}).toArray(function (err, result) {
                  if (err) throw err;
                  res.json(result)
                  return result;
            })
      })
})


//POST request to send the object in the request body
router.post("/teachingData/", (req, res) => {
      const obj  = req.body;
      console.log({ "name": obj.name, "academic_year": obj.year })

      MongoClient.connect(process.env.MONGO_URI, function (err, db) {
            if (err) throw err;
            var dbo = db.db("Performance_appraisal");
            dbo.collection("teaching_workload").find({ "name": obj.name,"academic_year":obj.year}).toArray(function (err, result) {
                  if (err) throw err;
                  res.json(result)
                  return result;
            })
      })
})

module.exports = router;