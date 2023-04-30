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
            // console.log(req.body)
            // console.log(table_name)
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
router.post("/data/:table_name", (req, res) => {
      const { table_name } = req.params;
      const obj  = req.body;
      // console.log({ "name": obj.name, "academic_year": obj.year })

      MongoClient.connect(process.env.MONGO_URI, function (err, db) {
            if (err) throw err;
            var dbo = db.db("Performance_appraisal");
            dbo.collection(table_name).find({ "name": obj.name,"academic_year":obj.year}).toArray(function (err, result) {
                  if (err) throw err;
                  res.json(result)
                  return result;
            })
      })
})

//POST FOR PROJECT GUIDANCE
//POST request to send the object in the request body
router.post("/data/:table_name", (req, res) => {
      const { table_name } = req.params;
      const obj = req.body;
      // console.log({ "name": obj.name, "academic_year": obj.year })

      MongoClient.connect(process.env.MONGO_URI, function (err, db) {
            if (err) throw err;
            var dbo = db.db("Performance_appraisal");
            dbo.collection(table_name).find({ "name_staff": obj.name, "academic_year": obj.year }).toArray(function (err, result) {
                  if (err) throw err;
                  res.json(result)
                  return result;
            })
      })
})

//PUSHING THE DATA IN THE TABLE
router.post("/pushData/:tableName", (req, res) => {
      const { tableName } = req.params;
      const obj = req.body;
      console.log(obj)
      MongoClient.connect(process.env.MONGO_URI, function (err, db) {
            if (err) throw err;
            var dbo = db.db("Performance_appraisal");
            dbo.collection(tableName).insertOne(obj, function (err, result) {
                  if (err) throw err;
                  res.json(result)
                  return result;
            })
      })
})

//UPDATING THE MARK DETAILS IN THE TABLE
router.patch("/pushData/marks_details/", (req, res) => {
      const obj = req.body;
      // console.log(obj)
      const table = obj.table_name
      const nam=obj.name
      const maxMarks = obj.max_marks
      MongoClient.connect(process.env.MONGO_URI, function (err, db) {
            var dbo = db.db("Performance_appraisal");
            if (err) throw err;
            var myquery = { "email": obj.email, "academic_year": obj.academic_year }

            dbo.collection(obj.table_name).find({ name: obj.name, academic_year: obj.academic_year }).toArray((res, obj) => {
                  var marks = obj.reduce((total, currItem) => total = total + parseInt(currItem.marks), 0);
                  console.log(marks)
                  if (marks >= parseInt(maxMarks)) marks = parseInt(maxMarks)
                  var newValues = { $set: { [table]: `${marks}`,name:nam } };
                  console.log(table)
                  dbo.collection("marks").findOneAndUpdate(myquery, newValues, { upsert: true }, function (err, obj) {
                        if (err) throw err;
                  });
            })
      })
})

//FOR FEEDBACK
router.patch("/pushData/marks_details2/", (req, res) => {
      const obj = req.body;
      // console.log(obj)
      const table = obj.table_name
      const nam = obj.name
      const maxMarks = obj.max_marks
      MongoClient.connect(process.env.MONGO_URI, function (err, db) {
            var dbo = db.db("Performance_appraisal");
            if (err) throw err;
            var myquery = { "email": obj.email, "academic_year": obj.academic_year }

            dbo.collection(obj.table_name).find({ name: obj.name, academic_year: obj.academic_year }).toArray((res, obj) => {
                  var marks = obj.reduce((total, currItem) => total = total + parseInt(currItem.avg_marks), 0);
                  console.log(marks)
                  if (marks >= parseInt(maxMarks)) marks = parseInt(maxMarks)
                  var newValues = { $set: { [table]: `${marks}`, name: nam } };
                  console.log(table)
                  dbo.collection("marks").findOneAndUpdate(myquery, newValues, { upsert: true }, function (err, obj) {
                        if (err) throw err;
                  });
            })
      })
})

//FOR PROJECT GUIDANCE
//UPDATING THE MARK DETAILS IN THE TABLE
router.patch("/pushData/marks_details3/", (req, res) => {
      const obj = req.body;
      // console.log(obj)
      const table = obj.table_name
      const nam = obj.name
      const maxMarks = obj.max_marks
      MongoClient.connect(process.env.MONGO_URI, function (err, db) {
            var dbo = db.db("Performance_appraisal");
            if (err) throw err;
            var myquery = { "email": obj.email, "academic_year": obj.academic_year }

            dbo.collection(obj.table_name).find({ name_staff: obj.name, academic_year: obj.academic_year }).toArray((res, obj) => {
                  var marks = obj.reduce((total, currItem) => total = total + parseInt(currItem.marks), 0);
                  console.log(marks)
                  if (marks >= parseInt(maxMarks)) marks = parseInt(maxMarks)
                  var newValues = { $set: { [table]: `${marks}`, name: nam } };
                  console.log(table)
                  dbo.collection("marks").findOneAndUpdate(myquery, newValues, { upsert: true }, function (err, obj) {
                        if (err) throw err;
                  });
            })
      })
})


//ASSESSMENT
router.patch("/assessment/prefetch", (req, res) => {

      const obj=req.body;

      MongoClient.connect(process.env.MONGO_URI, function (err, db) {
            if (err) throw err;
            var dbo = db.db("Performance_appraisal");

            dbo.collection("user_assessment_details").find({"name":obj.name,"email":obj.email}).toArray((res,arr)=>{
                  if(Object.keys(arr).length==0)
                  {
                        obj.assessment_status="";
                        obj.answers={};
                        obj.marks="";
                        dbo.collection("user_assessment_details").updateOne({"email":obj.email},{$set:obj},{upsert:true}, function (err, result) {
                              if (err) throw err;
                              // res.json(result)
                              return result;
                        })
                  }
            })
      })
})


//ASSESSMENT EMAIL CHECK
router.get("/assessment/emailCheck/:email",(req,res)=>{
      const {email}=req.params;
      MongoClient.connect(process.env.MONGO_URI, function (err, db) {
            if (err) throw err;
            var dbo = db.db("Performance_appraisal");

            dbo.collection("assessment_emails").find({"email": email }).toArray((err, arr) => {
                  if (err) throw err;
                  res.json(arr)
            })
      })
})


router.get("/assessment/status", (req, res) => {
      MongoClient.connect(process.env.MONGO_URI, function (err, db) {
            if (err) throw err;
            var dbo = db.db("Performance_appraisal");

            dbo.collection("assessment_start_table").find({}).toArray((err, arr) => {
                  if (err) throw err;
                  res.json(arr)
            })
      })
})


//CHECK WHETHER THE USER ATTENDED THE ASSESSMENT OR NOT
router.get("/assessment/check/:email", (req, res) => {
      const { email } = req.params;
      MongoClient.connect(process.env.MONGO_URI, function (err, db) {
            if (err) throw err;
            var dbo = db.db("Performance_appraisal");
            dbo.collection("user_assessment_details").find({"email":email}).toArray((err, arr) => {
                  if (err) throw err;
                  res.json(arr)
            })
      })
})

//UPDATING THE MARKS INTO THE TABLE
router.patch("/assessment/answers/update/:email", (req, res) => {
      const { email } = req.params;
      

      MongoClient.connect(process.env.MONGO_URI, function (err, db) {
            if (err) throw err;
            var dbo = db.db("Performance_appraisal");
            const query = { "email": email };
            var newValues = { $set: {"answers":req.body,"assessment_status":"done"} };

            dbo.collection("user_assessment_details").findOneAndUpdate(query, newValues, function (err, result) {
                  if (err) throw err;
                  res.json(result)
                  return result;
            })
      })
})


router.patch("/forgotPassword/:email", (req, res) => {
      const { email } = req.params;
      MongoClient.connect(process.env.MONGO_URI, function (err, db) {
            if (err) throw err;
            var dbo = db.db("Performance_appraisal");

            dbo.collection("personal_details").updateOne({"email":email},{$unset:{"password":1}})
      })
})


module.exports = router;