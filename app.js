const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParse = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const documentRoutes = require("./api/routing/documents");
const userRoutes = require("./api/routing/users");
const { model } = require("./api/model/user");



mongoose.connect('mongodb+srv://kopano:'
+ process.env.MONGO_ATLAS_PW  + 
'@cluster0.g8dkh.mongodb.net/<dbname>?retryWrites=true&w=majority', {
     useNewUrlParser: true, // new parameters
     useUnifiedTopology: true,
    useCreateIndex: true
})

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParse.urlencoded({extended:false}));
app.use(bodyParse.json());

/*app.post('/signup', (req,res, next) => {
    console.log(req.body)
})*/

app.use((req,res,next) =>{
    res.header("Accesss-Control-Allow-Origin","*");
    res.header("Access-Contol-Allow-Headers","Origin, X-Requested-with,Content-Type, Accept, Authoriztion");
    if(req.method === "OPTIONS"){
        res.header("Access-Control-Allow-Methods","PUT,POST,PATCH,DELETE,GET");
        return res.status(200).json({});
    }

    next();
});

app.use("/documents",documentRoutes);
app.use("/users",userRoutes)


app.use((error,req,res,next)=>{
    res.status(500).json({
        error:{
            message: error.message
        }
    });
});

app.use((req,res,next)=>{
    res.status(200).json({
        message : "It works"
    });

});

module.exports = app;