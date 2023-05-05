const MongoClient = require("mongodb").MongoClient;

const singleFileUpload = async (req,res,next)=>{
    try {
        console.log(req.body);
        const file={
            fileName:req.file.originalname,
            filePath:req.file.path,
            fileSize:fileSizeFormatter(req.file.size,2)
        };

        console.log(file);  
        
        res.redirect('http://localhost:3000/ADMIN/adminDashboard/');

    } catch (error) {
        res.status(400).send(error.message);
    }
}

const fileSizeFormatter = (bytes,decimal)=>{
    if(bytes===0){
        return '0 Bytes';
    }
    const dm=decimal || 2;
    const sizes=['Bytes','KB','MB','GB','TB','PB','EB','ZB','YB'];
    const index=Math.floor(Math.log(bytes)/Math.log(1000));
    return parseFloat((bytes/Math.pow(1000,index)).toFixed(dm))+' '+sizes[index];
}


module.exports={singleFileUpload}