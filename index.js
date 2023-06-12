const express = require("express");
const cors = require("cors");
const { connection } = require("mongoose");
const { userRouter } = require("./Routes/users.route");
const { postRouter } = require("./Routes/posts.route");


const app = express();
app.use(cors());
app.use(express.json());
app.use("/users",userRouter);
app.use("/posts", postRouter);


app.listen(8080, async () => {
    try{
       await connection;
       console.log("Connected to the db");
       console.log("Runnig at 8080 port");
    }catch(err){
      console.log(err);
    }
})