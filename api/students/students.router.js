const{createStudent,createAd,getStudents,updateStudent,deleteStudent,login, 
    getStudentById}=require("./students.controller");
const router=require("express").Router();
const{checkToken}=require("../../auth/token_validation");
router.post("/",createStudent);
router.get("/",/*checkToken,*/getStudents);
router.patch("/",checkToken,updateStudent);
router.delete("/:id",deleteStudent);
router.get("/:id",checkToken,getStudentById);
router.post("/login",login)
router.post("/createAd",createAd);

module.exports=router;