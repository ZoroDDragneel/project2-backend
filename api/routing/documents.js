const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const File = require("../model/document");
const User = require("../model/user");

const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, rec, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, rec, cb) {
      cb(null, rec.fieldname + '-' + Date.now())
    }
  })

const upload = multer({
    storage: storage,
});

router.post("/",upload.single("files"),(req,res,next)=>{
    const rec = req.rec
    if (!rec) {
      const err = new Error('Please upload the file')
      err.httpStatusCode = 400
      return next(error)
    }
      res.send(rec)
      const file = new File({
        _id : new mongoose.Types.ObjectId,
        name: req.body.name,
        username: req.body.user,
        metaData: req.body.metaData
        });
    
        file.save().then(result =>{
        console.log(result);
        res.status(201).json({
            message: "Handing POST requests to /documents",
            createdDocument: result
        });
        }).catch(err => {
         console.log(err),
         res.status(500).json({
             error: err
            });
        })  
});

router.get("/:fileId",(req,res,next)=>{
    const file = req.params.fileId;
    File.find({user: file}).exec().then(files =>{
        console.log("From database",files);
        if(files){
            res.status(200).json(files);
        } else{
            res.status(404).json({
                message: "no valid entry found for the user Id"
            })
        }  
    }).catch(err =>{
        console.log(err);
        res.status(500).json({error: err});
    })
})

router.delete("/:fileId",(req,res,next)=>{
    const id = req.params.fileId;
    File.deleteOne({_id: id}).exec().then(result =>{
        res.status(200).json(result);
    }).catch(err =>{
        console.log(err);
        res.status(500).json({
            error : err
        });
    })
});

module.exports = router;