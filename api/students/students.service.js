const pool = require("../../config/database")

module.exports={
    create:(data,callback)=>{
        pool.query(
            `INSERT INTO student(id,name,class,section,subject,DOB,DOJ,email,gender,contact)
            values(?,?,?,?,?,?,?,?,?,?)`,
            [
            data.id,
            data.name,
            data.class,
            data.section,
            data.subject,
            data.DOB,
            data.DOJ,
            data.email,
            data.gender,
            data.contact
            ],
            (error,results,fields)=>{
                if(error){
                   return callback(error);
                }
                return callback(null,results);
            }
        );
    },
    createAdmin:(data,callback)=>{
        pool.query(
            `insert into admin(id,name,email,password) values (?,?,?,?)`,
            [
                data.id,
                data.name,
                data.email,
                data.password
            ],
            (error,results,fields)=>{
                if(error){
                    return callback(error);
                }
                return callback(null,results);
            }
        );
    },
    getStudents: (callBack) => {
        pool.query(
          `SELECT id,name,class,section,subject,DOB,DOJ,email,gender,contact from student`,
          [],
          (error, results, fields) => {
            if (error) {
              return callBack(error);
            }
            return callBack(null, results);
          }
        );
      },
      getStudentById: (id, callBack) => {
        pool.query(
          `SELECT id,name,class,section,subject,DOB,DOJ,email,gender,contact from student where id = ?`,
          [id],
          (error, results, fields) => {
            if (error) {
              return callBack(error);
            }
            return callBack(null, results[0]);
          }
        );
      },
      updateStudent: (data, callBack) => {
        pool.query(
          `update student set name=?, class=?, section=?, subject=?, DOB=?, DOJ=?, email=?, gender=?, contact=? 
          where id = ?`,
          [
            data.name,
            data.class,
            data.section,
            data.subject,
            data.DOB,
            data.DOJ,
            data.email,
            data.gender,
            data.contact
          ],
          (error, results, fields) => {
            if (error) {
              return callBack(error);
            }
            return callBack(null, results[0]);
          }
        );
      },
      deleteStudent: (data, callBack) => {
        pool.query(
          `delete from student where id = ?`,
          [data.id],
          (error, results, fields) => {
            if (error) {
              return callBack(error);
            }
            return callBack(null, results[0]);
          }
        );
      },
      getStudentByEmail: (email, callBack) => {
        pool.query(
          `SELECT * FROM student WHERE EMAIL = ?`,
          [email],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results[0]);
          }
        );
      },
      getAdminByEmail:(email,callback)=>{
          pool.query(
              `select * from admin where email = ? `,
              [email],
              (error, results, fields) => {
                if (error) {
                  callBack(error);
                }
                return callBack(null, results[0]);
              }
          )
      },
}