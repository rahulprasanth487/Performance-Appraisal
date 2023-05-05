'use strict'

const express = require('express');
const {upload}=require("../helpers/fileHelper");
const router = express.Router();
const {singleFileUpload}=require("../controllers/fileUploadController")

// router.post("/singleFileUpload",upload.single('flle'),singleFileUpload);
const multer = require("multer")


// Single file
router.post("/singleFileUpload", upload.single("file"),singleFileUpload)

module.exports={
    routes:router
}

