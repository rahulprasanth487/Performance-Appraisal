require("dotenv").config()
const express = require("express");
const router = express.Router()
const MongoClient = require("mongodb").MongoClient;


router.post("/registration/",(req,res)=>{
      const data=req.body;

      MongoClient.connect(process.env.MONGO_URI, function (err, db) {
            if (err) throw err;
            var dbo = db.db("Performance_appraisal");
            dbo.collection("approval_section").insertOne(data, function (err, res) {
                  if (err) throw err;
                  console.log("1 document inserted");
                  db.close();
            });
      })
})

//return the data with specific email
router.get("/registration/:email", (req, res) => {
      const {email} = req.params;

      MongoClient.connect(process.env.MONGO_URI, function (err, db) {
            if (err) throw err;
            var dbo = db.db("Performance_appraisal");
            dbo.collection("approval_section").find({"email":email}).toArray(function (err, arr) {
                  if (err) throw err;
                  console.log(arr.length)
                  
                 res.send(arr);
                  db.close();
            });
      })
})

//to return staus table
router.post("/registration/statusCheck/",(req,res)=>{
      const email=req.body.email;
      const type=req.body.type;
      
      MongoClient.connect(process.env.MONGO_URI, function (err, db) {
            if (err) throw err;
            var dbo = db.db("Performance_appraisal");
            dbo.collection("approval_section").find({"email":email,"type":type}).toArray(function (err, arr) {
                  if (err) throw err;
                  res.send(arr);
                  db.close();
            });
      })
})

//to check the sign up status

router.post("/registration/SignUpStatusCheck/",(req,res)=>{
      const mail=req.body.email;
      MongoClient.connect(process.env.MONGO_URI, function (err, db) {
            if (err) throw err;
            var dbo = db.db("Performance_appraisal");
            dbo.collection("approval_section").find({"email":mail}).toArray(function (err, arr) {
                  if (err) throw err;
                  if(arr.length==0)
                  {
                        res.json("false");
                  }
                  else
                  {
                        // console.log(arr[0].type == "signup" && arr[0].status == "true", arr[0].type === "registration" && arr[0].status === "true")
                        if (arr[0].type == "signup") {
                              res.json("true");
                        }

                        else if (arr[0].type === "registration" && arr[0].status === "true") {
                              res.json("granted");
                        }
                  }

                  
            });

      })
})


module.exports=router;