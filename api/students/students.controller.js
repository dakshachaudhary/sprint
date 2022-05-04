//const req = require("express/lib/request")
const {create,getStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
    getStudentByEmail,
    createAdmin,
    getAdminByEmail,} = require("./students.service");
const {genSaltSync,hashSync,compareSync} = require('bcrypt');
const { sign } = require("jsonwebtoken");
module.exports={
    createStudent: (req,res)=>{
        const body=req.body;
        const salt=genSaltSync(10);
        body.password=hashSync(body.password,salt)
        create(body,(err,results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                success:0,
                message:"db conn error",
                });    
            }
            return res.status(200).json({
                success:1,
                data:results
            })
        })
    },
    getStudentById: (req, res) => {
        const id = req.params.id;
        getStudentById(id, (err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          if (!results) {
            return res.json({
              success: 0,
              message: "Record not found",
            });
          }
          return res.json({
            success: 1,
            data: results,
          });
        });
      },
      getStudents: (req, res) => {
        getStudents((err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          return res.json({
            sucess: 1,
            data: results,
          });
        });
      },
      updateStudent: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateStudent(body, (err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          if (!results) {
            return res.json({
              sucess: 0,
              message: "failed to update the student!",
            });
          }
          return res.json({
            success: 1,
            message: "updated student sucessfully",
          });
        });
      },
      deleteStudent: (req, res) => {
        const data = req.body;
        deleteStudent(data, (err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          if (!results) {
            return res.json({
              sucess: 0,
              message: "record not found",
            });
          }
          return res.json({
            sucess: 1,
            message: "student deleted sucessfully",
          });
        });
      },
      login: (req, res) => {
        const body = req.body;
        getStudentByEmail(body.email, (err, results) => {
          if (err) {
            console.log(err);
          }
          if (!results) {
            return res.json({
              sucess: 0,
              message: "Invalid email or password",
            });
          }
          const result = compareSync(body.password, results.password);
          if (result) {
            results.password = undefined;
            const jsontoken = sign({ result: results }, "qwe1234", {
              expiresIn: "1h",
            });
            return res.json({
              sucess: 1,
              message: "Login sucessful",
              token: jsontoken,
            });
          } else {
            return res.json({
              sucess: 0,
              message: "Invalid email or password",
            });
          }
        });
      },
      createAd:(req,res)=>{
          const body=req.body;
          const salt=genSaltSync(10);
          body.password=hashSync(bbody.password,salt);
          createAdmin(body,(err,results)=>{
              if(err){
                  console.log(err);
                  return res.status(500).json({
                  success:0,
                  message:"db conn error",
                });               
              }
              return res.status(200).json({
                success:1,
                data:results
            })
          })
      },
      login:(req,res)=>{
          const body=req.body;
          getAdminByEmail(body.email,(err,results)=>{
              if(err){
                  console.log(err);
              }
              if(!results){
                  return res.json({
                      success:0,
                      message:"Invalid email or password"
                  });
              }
              const result=compareSync(body.password,results.password);
              if(result){
                  results.password=undefined;
                  const jsontoken=sign({result:results},"fr4den",{expiresIn:"1h",});
                  return res.json({
                      success:1,message:"login sucessfull",
                      token:jsontoken,
                  });
              }
              else{
                  return res.json({
                      success:0,
                      message:"Invalid email or password",
                  });
              }
          });
      },
}