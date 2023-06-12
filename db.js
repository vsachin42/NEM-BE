const mongoose = require("mongoose");


const connection = mongoose.connect("mongodb+srv://soni:soni@cluster0.f78prrs.mongodb.net/masai_insta?retryWrites=true&w=majority")

module.exports = {connection};
