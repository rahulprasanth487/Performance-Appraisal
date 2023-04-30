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
      console.log(_id)
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
      console.log("STUDENT DATA FETCHED")
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
                  res.json("1")
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

//delete particular question
router.delete("/assessment/delete/:_id", (req, res) => {
      const { _id } = req.params;

      MongoClient.connect(process.env.MONGO_URI, function (err, db) {
            var dbo = db.db("Performance_appraisal");
            if (err) throw err;

            dbo.collection("assessment_questions").findOneAndDelete({ "_id": new require("mongodb").ObjectID(_id) }, function (err, res) {
                  if (err) throw err;
                  console.log("QUESTION IS DELETED");

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

//assessment validation marks to tables
router.patch("/assessment/validatedAns/update/",(req,res)=>{

      const obj=req.body;
      const email=obj.email;
      const answers=obj.validatedAnswers
      console.log(obj)

      MongoClient.connect(process.env.MONGO_URI, function (err, db) {
            var dbo = db.db("Performance_appraisal");
            if (err) throw err;

            dbo.collection("user_assessment_details").findOneAndUpdate({"email":email},{$set:{"validatedAnswers":answers,"marks":obj.marks}},function (err, obj) {
                  res.json(obj);

            })
      })
})

//------------------------------------------------------------------------------------------------------------

router.get("/Approval/",(req,res)=>{
      MongoClient.connect(process.env.MONGO_URI,function(err,db){
            var dbo = db.db("Performance_appraisal");
            if(err) throw err;

            dbo.collection("approval_section").find({}).toArray(function(err,obj){
                  res.json(obj);

            })
      })
})

router.delete("/Approval/delete/:_id",(req,res)=>{
      MongoClient.connect(process.env.MONGO_URI, function (err, db) {
            var dbo = db.db("Performance_appraisal");

            if(err) throw err;

            dbo.collection("approval_section").remove({"_id":new require("mongodb").ObjectID(req.params._id)},function(err,obj){
                  if(err) throw err;
                  console.log("1 document deleted");
                  res.json(obj);
            })
      })
})

router.post("/Approval/approve/",(req,res)=>{
      const type=req.body.type;
      const obj=req.body;
      delete obj.type;
      MongoClient.connect(process.env.MONGO_URI, function (err, db) {

            console.log(type)
            var dbo = db.db("Performance_appraisal");
            (type === "signup") && dbo.collection("personal_details").insertOne(obj, function (err, Obj2) {
                  if (err) throw err;
                  
                  console.log("Signed Up")
            })

            const newObj={"name":obj.name,"email":obj.email}
            
            dbo.collection("assessment_emails").insertOne(newObj, function (err, Obj2) {
                  if (err) throw err;
                  console.log("Email address sucessfully")
            })


      })
})

router.patch("/Approval/approve/:_id",(req,res)=>{
      const { _id } = req.params;
      MongoClient.connect(process.env.MONGO_URI, function (err, db) {
            
            var dbo = db.db("Performance_appraisal");
            if (err) throw err;
            var myquery = { "_id": new require("mongodb").ObjectID(_id) };
            var newValues = { $set: req.body };
            // console.log(req.body)

            dbo.collection("approval_section").findOneAndUpdate(myquery, newValues, function (err, obj) {
                  if(err) throw err;
                  console.log("1 document is updated");
                  res.json(req.body)
            });
            
      })
})


router.patch("/markUpdate/",(req,res)=>{
      const obj=req.body;
      const table=obj.table_name
      const maxMarks = obj.maxMarks;
      MongoClient.connect(process.env.MONGO_URI,function (err,db){
            var dbo = db.db("Performance_appraisal");
            if (err) throw err;
            var myquery = { "name": obj.name, "academic_year": obj.academic_year }
            
            dbo.collection(obj.table_name).find({name:obj.name,academic_year:obj.academic_year}).toArray((res,obj)=>{
                  var marks = obj.reduce((total, currItem) => total = total + parseInt(currItem.avg_marks), 0);
                  console.log(marks)
                  if (marks > parseInt(maxMarks)) marks=maxMarks;
                  var newValues = { $set: { [table]: `${marks}` } };
                  console.log(table)
                  dbo.collection("marks").findOneAndUpdate(myquery, newValues, function (err, obj) {
                        if (err) throw err;
                  });
            })
      })
})

router.patch("/markUpdate2/", (req, res) => {
      const obj = req.body;
      const table = obj.table_name
      const maxMarks=obj.maxMarks;
      MongoClient.connect(process.env.MONGO_URI, function (err, db) {
            var dbo = db.db("Performance_appraisal");
            if (err) throw err;
            var myquery = { "name": obj.name, "academic_year": obj.academic_year }

            dbo.collection(obj.table_name).find({ name: obj.name, academic_year: obj.academic_year }).toArray((res, obj) => {
                  var marks = obj.reduce((total, currItem) => total = total + parseInt(currItem.marks), 0);
                  console.log(marks)
                  if (marks > parseInt(maxMarks)) marks = maxMarks
                  var newValues = { $set: { [table]: `${marks}` } };
                  console.log(table)
                  dbo.collection("marks").findOneAndUpdate(myquery, newValues, function (err, obj) {
                        if (err) throw err;
                  });
            })
      })
})

router.patch("/markUpdate3/", (req, res) => {
      const obj = req.body;
      const table = obj.table_name
      const maxMarks = obj.maxMarks;
      MongoClient.connect(process.env.MONGO_URI, function (err, db) {
            var dbo = db.db("Performance_appraisal");
            if (err) throw err;
            var myquery = { "name": obj.name, "academic_year": obj.academic_year }

            dbo.collection(obj.table_name).find({ name_staff: obj.name, academic_year: obj.academic_year }).toArray((res, obj) => {
                  var marks = obj.reduce((total, currItem) => total = total + parseInt(currItem.marks), 0);
                  console.log(marks)
                  if (marks > parseInt(maxMarks)) marks = maxMarks
                  var newValues = { $set: { [table]: `${marks}` } };
                  console.log(table)
                  dbo.collection("marks").findOneAndUpdate(myquery, newValues, function (err, obj) {
                        if (err) throw err;
                  });
            })
      })
})


//list valid email
router.get("/assessment/validEmails/", (req, res) => {
      MongoClient.connect(process.env.MONGO_URI, function (err, db) {
            var dbo = db.db("Performance_appraisal");
            if (err) throw err;

            dbo.collection("assessment_emails").find({}).toArray(function (err, obj) {
                  res.json(obj);

            })
      })
})


router.get("/assessment/getEmailAnswers/:email",   (req, res ) => {
      const {email}=req.params;

      MongoClient.connect(process.env.MONGO_URI,  function (err,  db) {
            var dbo = db.db("Performance_appraisal");
            if  (err) throw err;
            
            dbo.collection("user_assessment_details").find({"email":email}).toArray(function  (err , obj) {
                  res.json(obj);
            
            })
})
}) 


//DASHBOARD
router.patch("/ADMIN/assessStatus/:status", (req, res) => {
      const { status } = req.params;


      MongoClient.connect(process.env.MONGO_URI, function (err, db) {
            if (err) throw err;
            var dbo = db.db("Performance_appraisal");
            if (status == "start") {
                  var newValues = { $set: req.body };
            }
            else if (status == "stop") {
                  var newValues = { $set: req.body };
            }
            else if (status == "publish") {
                  var newValues = { $set: req.body };
            }

            console.log(newValues)

            // var newValues = { $set: { "answers": req.body, "assessment_status": "done" } };

            dbo.collection("assessment_start_table").findOneAndUpdate({}, newValues, function (err, result) {
                  if (err) throw err;
                  res.json(result)
                  return result;
            })
      })
})


//SET ACADEMI YEAR
router.post("/ADMIN/setAcademicYear/", (req, res) => {
      const obj=req.body;
      MongoClient.connect(process.env.MONGO_URI, function (err, db) {
            if (err) throw err;
            var dbo = db.db("Performance_appraisal");
            dbo.collection("data_entry_status").insertOne(obj, function (err, result) {
                  if (err) throw err;
                  res.json(result)
                  return result;
            })
      })
})


router.patch("/ADMIN/changeLock/:year", (req, res) => {
      const obj = req.body;
      const {year}=req.params;

      MongoClient.connect(process.env.MONGO_URI, function (err, db) {
            if (err) throw err;
            var dbo = db.db("Performance_appraisal");
            dbo.collection("data_entry_status").update({ "academicYear": year }, { $set: { "add_button": obj.add_button }},(err, result)=>{
                  if (err) throw err;
                  res.json(result)
                  return result;
            })
      })
})


router.delete("/ADMIN/deleteYear/:id", (req, res) => {
      const { id } = req.params;

      MongoClient.connect(process.env.MONGO_URI, function (err, db) {
            if (err) throw err;
            var dbo = db.db("Performance_appraisal");
            dbo.collection("data_entry_status").deleteOne({"_id":new require("mongodb").ObjectId(id)},(err, result) => {
                  if (err) throw err;
                  res.json(result)
                  return result;
            })
      })
})


//FOR RESULTS

router.get("/admin/results/details/:academicYear",(req,res)=>{
      const {academicYear}=req.params;
      MongoClient.connect(process.env.MONGO_URI,(err,db)=>{
            if(err) throw err;
            var dbo=db.db("Performance_appraisal");
            dbo.collection("marks").find({ "academic_year": academicYear }).toArray((err, arr) => {
                  if (err) throw err;
                  res.json(arr);
            })
      })
})

//PUBLISH THE RESULTS
router.patch("/admin/results/publish/:year", (req, res) => {
      const obj = req.body;
      const { year } = req.params;
      
      const newValues={
            "published":obj.published,
            "grade":obj.grade,
            "totMarks":obj.totMarks
      }
      MongoClient.connect(process.env.MONGO_URI, function (err, db) {
            if (err) throw err;
            var dbo = db.db("Performance_appraisal");
            dbo.collection("marks").updateOne({ "academic_year": year,"email":obj.email }, { $set: newValues},(err, result)=>{
                  if (err) throw err;
                  res.json(result)
                  return result;
            })
      })
})



module.exports=router;