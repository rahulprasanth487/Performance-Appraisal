require("dotenv").config()
const express=require("express");
const router=express.Router()
const MongoClient=require("mongodb").MongoClient;

router.get("/stafflist/",(req,res)=>{
      MongoClient.connect(process.env.MONGO_URI,function(err,db)
      {
            if(err) throw err;
            var dbo=db.db("Performance_appraisal");
            dbo.collection("personal_details").find({}).toArray(function(err,result)
            {
                  if(err) throw err;
                  res.json(result)
                  return result;
            })
      })
})



router.get("/teachingWorkload/:name", (req, res) => {
      const {name}=req.params;
      console.log(name)
      MongoClient.connect(process.env.MONGO_URI, function (err, db) {
            if (err) throw err;
            var dbo = db.db("Performance_appraisal");
            dbo.collection("teaching_workload").find({"name":name}).toArray(function (err, result) {
                  if (err) throw err;
                  res.json(result)
                  return result;
            })
      })
})

router.get("/teachingWorkload/del/:_id", (req, res) => {
      const { _id } = req.params;
      MongoClient.connect(process.env.MONGO_URI, function (err, db) {
            var dbo = db.db("Performance_appraisal");
            if (err) throw err;
            var myquery = { "_id": new require("mongodb").ObjectID(_id)};
            dbo.collection("teaching_workload").findOneAndDelete(myquery, function (err, obj) {
                  if (err) throw err;
                  console.log(_id + " deleted");
                  res.json(obj);
            });
      });
})


router.patch("/teachingWorkload/patch/:_id",(req,res)=>{
      const { _id } = req.params;

      MongoClient.connect(process.env.MONGO_URI, function (err, db) {
            var dbo = db.db("Performance_appraisal");
            if (err) throw err;
            var myquery = { "_id": new require("mongodb").ObjectID(_id)};
            var newValues={$set : req.body};

            dbo.collection("teaching_workload").findOneAndUpdate(myquery,newValues,function(err,obj){
                  if(err) throw err;
                  console.log("1 document is updated");
                  res.json("Updated Successfully")
            })
            
            
      });
})

//teaching_learning_practices

router.get("/teachingLearningPractices/:name", (req, res) => {
      const { name } = req.params;
      console.log(name)
      MongoClient.connect(process.env.MONGO_URI, function (err, db) {
            if (err) throw err;
            var dbo = db.db("Performance_appraisal");
            dbo.collection("teaching_learning_practices").find({ "name": name }).toArray(function (err, result) {
                  if (err) throw err;
                  res.json(result)
                  return result;
            })
      })
})

router.get("/teachingLearningPractices/del/:_id", (req, res) => {
      const { _id } = req.params;
      MongoClient.connect(process.env.MONGO_URI, function (err, db) {
            var dbo = db.db("Performance_appraisal");
            if (err) throw err;
            var myquery = { "_id": new require("mongodb").ObjectID(_id) };
            dbo.collection("teaching_learning_practices").findOneAndDelete(myquery, function (err, obj) {
                  if (err) throw err;
                  console.log(_id + " deleted");
                  res.json(obj);
            });
      });
})


router.patch("/teachingLearningPractices/patch/:_id", (req, res) => {
      const { _id } = req.params;

      MongoClient.connect(process.env.MONGO_URI, function (err, db) {
            var dbo = db.db("Performance_appraisal");
            if (err) throw err;
            var myquery = { "_id": new require("mongodb").ObjectID(_id) };
            var newValues = { $set: req.body };

            dbo.collection("teaching_learning_practices").findOneAndUpdate(myquery, newValues, function (err, obj) {
                  if (err) throw err;
                  console.log("1 document is updated");
                  res.json("Updated Successfully")
            })


      });
})

//self learning
router.get("/selfLearning/:name", (req, res) => {
      const { name } = req.params;
      console.log(name)
      MongoClient.connect(process.env.MONGO_URI, function (err, db) {
            if (err) throw err;
            var dbo = db.db("Performance_appraisal");
            dbo.collection("self_learning").find({ "name": name }).toArray(function (err, result) {
                  if (err) throw err;
                  res.json(result)
                  return result;
            })
      })
})

router.get("/selfLearning/del/:_id", (req, res) => {
      const { _id } = req.params;
      MongoClient.connect(process.env.MONGO_URI, function (err, db) {
            var dbo = db.db("Performance_appraisal");
            if (err) throw err;
            var myquery = { "_id": new require("mongodb").ObjectID(_id) };
            dbo.collection("self_learning").findOneAndDelete(myquery, function (err, obj) {
                  if (err) throw err;
                  console.log(_id + " deleted");
                  res.json(obj);
            });
      });
})


router.patch("/selfLearning/patch/:_id", (req, res) => {
      const { _id } = req.params;

      MongoClient.connect(process.env.MONGO_URI, function (err, db) {
            var dbo = db.db("Performance_appraisal");
            if (err) throw err;
            var myquery = { "_id": new require("mongodb").ObjectID(_id) };
            var newValues = { $set: req.body };

            dbo.collection("self_learning").findOneAndUpdate(myquery, newValues, function (err, obj) {
                  if (err) throw err;
                  console.log("1 document is updated");
                  res.json("Updated Successfully")
            })


      });
})




//PROJECT GUIDANCE
router.get("/projectGuidance/:name", (req, res) => {
      const { name } = req.params;
      console.log(name)
      MongoClient.connect(process.env.MONGO_URI, function (err, db) {
            if (err) throw err;
            var dbo = db.db("Performance_appraisal");
            dbo.collection("project_guidance").find({ "name_staff": name }).toArray(function (err, result) {
                  if (err) throw err;
                  res.json(result)
                  return result;
            })
      })
})

router.get("/projectGuidance/del/:_id", (req, res) => {
      const { _id } = req.params;
      MongoClient.connect(process.env.MONGO_URI, function (err, db) {
            var dbo = db.db("Performance_appraisal");
            if (err) throw err;
            var myquery = { "_id": new require("mongodb").ObjectID(_id) };
            dbo.collection("project_guidance").findOneAndDelete(myquery, function (err, obj) {
                  if (err) throw err;
                  console.log(_id + " deleted");
                  res.json(obj);
            });
      });
})


router.patch("/projectGuidance/patch/:_id", (req, res) => {
      const { _id } = req.params;

      MongoClient.connect(process.env.MONGO_URI, function (err, db) {
            var dbo = db.db("Performance_appraisal");
            if (err) throw err;
            var myquery = { "_id": new require("mongodb").ObjectID(_id) };
            var newValues = { $set: req.body };

            dbo.collection("project_guidance").findOneAndUpdate(myquery, newValues, function (err, obj) {
                  if (err) throw err;
                  console.log("1 document is updated");
                  res.json("Updated Successfully")
            })


      });
})

//Paper publications in journals
router.get("/paperJournals/:name", (req, res) => {
      const { name } = req.params;
      console.log(name)
      MongoClient.connect(process.env.MONGO_URI, function (err, db) {
            if (err) throw err;
            var dbo = db.db("Performance_appraisal");
            dbo.collection("paper_publications_in_journals").find({ "name": name }).toArray(function (err, result) {
                  if (err) throw err;
                  res.json(result)
                  return result;
            })
      })
})

router.get("/paperJournals/del/:_id", (req, res) => {
      const { _id } = req.params;
      MongoClient.connect(process.env.MONGO_URI, function (err, db) {
            var dbo = db.db("Performance_appraisal");
            if (err) throw err;
            var myquery = { "_id": new require("mongodb").ObjectID(_id) };
            dbo.collection("paper_publications_in_journals").findOneAndDelete(myquery, function (err, obj) {
                  if (err) throw err;
                  console.log(_id + " deleted");
                  res.json(obj);
            });
      });
})


router.patch("/paperJournals/patch/:_id", (req, res) => {
      const { _id } = req.params;

      MongoClient.connect(process.env.MONGO_URI, function (err, db) {
            var dbo = db.db("Performance_appraisal");
            if (err) throw err;
            var myquery = { "_id": new require("mongodb").ObjectID(_id) };
            var newValues = { $set: req.body };

            dbo.collection("paper_publications_in_journals").findOneAndUpdate(myquery, newValues, function (err, obj) {
                  if (err) throw err;
                  console.log("1 document is updated");
                  res.json("Updated Successfully")
            })


      });
})


//paper publications in conferences
router.get("/paperConference/:name", (req, res) => {
      const { name } = req.params;
      console.log(name)
      MongoClient.connect(process.env.MONGO_URI, function (err, db) {
            if (err) throw err;
            var dbo = db.db("Performance_appraisal");
            dbo.collection("paper_publications_in_conferences").find({ "name": name }).toArray(function (err, result) {
                  if (err) throw err;
                  res.json(result)
                  return result;
            })
      })
})

router.get("/paperConference/del/:_id", (req, res) => {
      const { _id } = req.params;
      MongoClient.connect(process.env.MONGO_URI, function (err, db) {
            var dbo = db.db("Performance_appraisal");
            if (err) throw err;
            var myquery = { "_id": new require("mongodb").ObjectID(_id) };
            dbo.collection("paper_publications_in_conferences").findOneAndDelete(myquery, function (err, obj) {
                  if (err) throw err;
                  console.log(_id + " deleted");
                  res.json(obj);
            });
      });
})


router.patch("/paperConference/patch/:_id", (req, res) => {
      const { _id } = req.params;

      MongoClient.connect(process.env.MONGO_URI, function (err, db) {
            var dbo = db.db("Performance_appraisal");
            if (err) throw err;
            var myquery = { "_id": new require("mongodb").ObjectID(_id) };
            var newValues = { $set: req.body };

            dbo.collection("paper_publications_in_conferences").findOneAndUpdate(myquery, newValues, function (err, obj) {
                  if (err) throw err;
                  console.log("1 document is updated");
                  res.json("Updated Successfully")
            })


      });
})

//Contribution to the Institutions
router.get("/contributionInstitution/:name", (req, res) => {
      const { name } = req.params;
      console.log(name)
      MongoClient.connect(process.env.MONGO_URI, function (err, db) {
            if (err) throw err;
            var dbo = db.db("Performance_appraisal");
            dbo.collection("contribution_to_institutions").find({ "name": name }).toArray(function (err, result) {
                  if (err) throw err;
                  res.json(result)
                  return result;
            })
      })
})

router.get("/contributionInstitution/del/:_id", (req, res) => {
      const { _id } = req.params;
      MongoClient.connect(process.env.MONGO_URI, function (err, db) {
            var dbo = db.db("Performance_appraisal");
            if (err) throw err;
            var myquery = { "_id": new require("mongodb").ObjectID(_id) };
            dbo.collection("contribution_to_institutions").findOneAndDelete(myquery, function (err, obj) {
                  if (err) throw err;
                  console.log(_id + " deleted");
                  res.json(obj);
            });
      });
})


router.patch("/contributionInstitution/patch/:_id", (req, res) => {
      const { _id } = req.params;

      MongoClient.connect(process.env.MONGO_URI, function (err, db) {
            var dbo = db.db("Performance_appraisal");
            if (err) throw err;
            var myquery = { "_id": new require("mongodb").ObjectID(_id) };
            var newValues = { $set: req.body };

            dbo.collection("contribution_to_institutions").findOneAndUpdate(myquery, newValues, function (err, obj) {
                  if (err) throw err;
                  console.log("1 document is updated");
                  res.json("Updated Successfully")
            })


      });
})

//contribution to the Department
router.get("/contributionDepartment/:name", (req, res) => {
      const { name } = req.params;
      console.log(name)
      MongoClient.connect(process.env.MONGO_URI, function (err, db) {
            if (err) throw err;
            var dbo = db.db("Performance_appraisal");
            dbo.collection("contribution_to_departments").find({ "name": name }).toArray(function (err, result) {
                  if (err) throw err;
                  res.json(result)
                  return result;
            })
      })
})

router.get("/contributionDepartment/del/:_id", (req, res) => {
      const { _id } = req.params;
      MongoClient.connect(process.env.MONGO_URI, function (err, db) {
            var dbo = db.db("Performance_appraisal");
            if (err) throw err;
            var myquery = { "_id": new require("mongodb").ObjectID(_id) };
            dbo.collection("contribution_to_departments").findOneAndDelete(myquery, function (err, obj) {
                  if (err) throw err;
                  console.log(_id + " deleted");
                  res.json(obj);
            });
      });
})


router.patch("/contributionDepartment/patch/:_id", (req, res) => {
      const { _id } = req.params;

      MongoClient.connect(process.env.MONGO_URI, function (err, db) {
            var dbo = db.db("Performance_appraisal");
            if (err) throw err;
            var myquery = { "_id": new require("mongodb").ObjectID(_id) };
            var newValues = { $set: req.body };

            dbo.collection("contribution_to_departments").findOneAndUpdate(myquery, newValues, function (err, obj) {
                  if (err) throw err;
                  console.log("1 document is updated");
                  res.json("Updated Successfully")
            })


      });
})

//Awards
router.get("/awards/:name", (req, res) => {
      const { name } = req.params;
      console.log(name)
      MongoClient.connect(process.env.MONGO_URI, function (err, db) {
            if (err) throw err;
            var dbo = db.db("Performance_appraisal");
            dbo.collection("awards").find({ "name": name }).toArray(function (err, result) {
                  if (err) throw err;
                  res.json(result)
                  return result;
            })
      })
})

router.get("/awards/del/:_id", (req, res) => {
      const { _id } = req.params;
      MongoClient.connect(process.env.MONGO_URI, function (err, db) {
            var dbo = db.db("Performance_appraisal");
            if (err) throw err;
            var myquery = { "_id": new require("mongodb").ObjectID(_id) };
            dbo.collection("awards").findOneAndDelete(myquery, function (err, obj) {
                  if (err) throw err;
                  console.log(_id + " deleted");
                  res.json(obj);
            });
      });
})


router.patch("/awards/patch/:_id", (req, res) => {
      const { _id } = req.params;

      MongoClient.connect(process.env.MONGO_URI, function (err, db) {
            var dbo = db.db("Performance_appraisal");
            if (err) throw err;
            var myquery = { "_id": new require("mongodb").ObjectID(_id) };
            var newValues = { $set: req.body };

            dbo.collection("awards").findOneAndUpdate(myquery, newValues, function (err, obj) {
                  if (err) throw err;
                  console.log("1 document is updated");
                  res.json("Updated Successfully")
            })


      });
})


//FEEDBACK
router.get("/studFeedback/:name", (req, res) => {
      const { name } = req.params;
      console.log(name)
      MongoClient.connect(process.env.MONGO_URI, function (err, db) {
            if (err) throw err;
            var dbo = db.db("Performance_appraisal");
            dbo.collection("student_feedback").find({ "name": name }).toArray(function (err, result) {
                  if (err) throw err;
                  res.json(result)
                  return result;
            })
      })
})

router.get("/studFeedback/del/:_id", (req, res) => {
      const { _id } = req.params;
      MongoClient.connect(process.env.MONGO_URI, function (err, db) {
            var dbo = db.db("Performance_appraisal");
            if (err) throw err;
            var myquery = { "_id": new require("mongodb").ObjectID(_id) };
            dbo.collection("student_feedback").findOneAndDelete(myquery, function (err, obj) {
                  if (err) throw err;
                  console.log(_id + " deleted");
                  res.json(obj);
            });
      });
})


router.patch("/studFeedback/patch/:_id", (req, res) => {
      const { _id } = req.params;

      MongoClient.connect(process.env.MONGO_URI, function (err, db) {
            var dbo = db.db("Performance_appraisal");
            if (err) throw err;
            var myquery = { "_id": new require("mongodb").ObjectID(_id) };
            var newValues = { $set: req.body };

            dbo.collection("student_feedback").findOneAndUpdate(myquery, newValues, function (err, obj) {
                  if (err) throw err;
                  console.log("1 document is updated");
                  res.json("Updated Successfully")
            })


      });
})


//ASSESSMENT QUESTION SETTING

router.post("/assessment/insert/",(req,res)=>{
      const obj=req.body;
      MongoClient.connect(process.env.MONGO_URI,function(err,db){
            var dbo=db.db("Performance_appraisal");
            if(err) throw err;

            dbo.collection("assessment_questions").insertOne(obj,function(err,res){
                  if(err) throw err;
                  console.log("1 question inserted");
                  
            })
            res.send("1 question inserted");
      })
})

router.delete("/assessment/delete/",(req,res)=>{
      MongoClient.connect(process.env.MONGO_URI, function (err, db) {
            var dbo = db.db("Performance_appraisal");
            if (err) throw err;

            dbo.collection("assessment_questions").remove({}, function (err, res) {
                  if (err) throw err;
                  console.log("QUESTIONS ARE DELETED");

            })
            res.send("1 question inserted");
      })
})

router.get("/assessment/questionList/",(req,res)=>{
      MongoClient.connect(process.env.MONGO_URI,function(err,db){
            var dbo = db.db("Performance_appraisal");
            if(err) throw err;

            dbo.collection("assessment_questions").find({}).toArray(function(err,obj){
                  res.json(obj);

            })
      })
})

router.get("/Approval/",(req,res)=>{
      MongoClient.connect(process.env.MONGO_URI,function(err,db){
            var dbo = db.db("Performance_appraisal");
            if(err) throw err;

            dbo.collection("approval_section").find({}).toArray(function(err,obj){
                  res.json(obj);

            })
      })
})

module.exports=router;