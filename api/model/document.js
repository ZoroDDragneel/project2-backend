const mongoose = require("mongoose");

const fileSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    username: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    metaData: String
})

module.exports = mongoose.model("Document",fileSchema);