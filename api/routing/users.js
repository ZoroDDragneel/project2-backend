const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../model/user");

router.post("/signup",(req,res,next) =>{
    User.find({email: req.body.email}).exec().then(user => {
        if(user.length >= 1){
            return res.status(409).json({
                message: "email exists"
            });
        }else{
            bcrypt.hash(req.body.password,10,(err, hash)=>{
                if(err){
                    return res.status(500).json({
                        error: err
                    });
                }else{
                    const user = new User({
                        _id: new mongoose.Types.ObjectId,
                        email: req.body.email,
                        password: hash
                    });
                    user.save().then(result =>{
                        console.log(result);
                        res.status(201).json({
                            message: "User created"
                        });
                    }).catch(err =>{
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
                }
            })
        }
    });
})

router.post("/login",(req,res,next)=>{
  User.find({email: req.body.email}).exec().then(user =>{
    if(user.length < 1){
      return res.status(401).json({
        message: "authorization unsuccessful"
      });
    }
    bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
      if(err){
        return res.status(401).json({
          message: "authorization unsuccessful"
        });
      }
      if(result){
        const token = jwt.sign({
          email: user[0].email,
          userId: user[0]._id
        },process.env.AUTH_TOKEN,{
          expiresIn : "1h"
        });
      }
        return res.status(200).json({
          message: "authorization successful",
          token : req.userData
        });
      })
  }).catch(err =>{
    consol.log(err);
    res.status(500).json({
      error: err
    });
  });
});


module.exports = router;


