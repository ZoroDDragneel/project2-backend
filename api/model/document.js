const mongoose = require("mongoose");

const documentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    meta_data: String
})

module.exports = mongoose.model("Document",documentSchema);