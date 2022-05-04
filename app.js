require('dotenv').config();
const express = require('express');
const app = express();
const studentRouter=require("./api/students/students.router");

app.use(express.json());
app.use("/api/students",studentRouter);


app.listen(process.env.APP_PORT,()=>{
    console.log("server running");
})
