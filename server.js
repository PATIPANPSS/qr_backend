
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql");
app.use(bodyParser.json())

const cors = require('cors')
app.use(cors())

app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root9999",
  database: "attendent",
});

connection.connect(function (err) {
  if (err) {
    console.error("Error connecting: " + err.stack);
    return;
  }
  console.log("Connected to MySQL database as id " + connection.threadId);
});







app.post("/teacher/add", (req, res) => {
  let details = {
    teacherUser: req.body.teacherUser,
    teacherMail: req.body.teacherMail,
    teacherName: req.body.teacherName,
    teacherPassword: req.body.teacherPassword,
 
  };

  const sql = "INSERT INTO teacher SET ?";
  console.log("SQL Query: " + sql);
  const query = connection.query(sql, details, (error, results) => {
    if (error) {
      console.error("Error inserting data into database: " + error.stack);
      res.status(500).json({ message: "Internal server error" });
      return;
    }

    res.send({
      message: "teacher added successfully!",
      data: results,
    });
  });
});


app.get("/teacher", (req, res) => {
  var sql = "SELECT * FROM teacher WHERE teacherActive =1";
  connection.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

app.get("/teacher/:teacherId", (req, res) => {
  var teacherId = req.params.id;
  var sql = "SELECT * FROM teacher WHERE teacherId=" + teacherId;
  connection.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

app.put("/teacher/update/:teacherId", (req, res) => {
  let sql =
    "UPDATE teacher SET teacherUser='" +
    req.body.teacherUser +
    "', teacherMail='" +
    req.body.teacherMail+
    "', teacherName='" +
    req.body.teacherName +
    "',teacherPassword='" +
    req.body.teacherPassword +
    "'  WHERE teacherId=" +
    req.params.teacherId;

  let a = connection.query(sql, (error, result) => {
    if (error) {
      res.send({ status: false, message: "teacher Updated Failed" });
    } else {
      res.send({ status: true, message: "teacher Updated successfully" });
    }
  });
});

app.delete("/teacher/delete/:teacherId", (req, res) => {
  let sql = "UPDATE teacher SET  teacherActive=0 WHERE teacherId=" + req.params.teacherId;
  let query = connection.query(sql, (error) => {
    if (error) {
      res.send({ status: false, message: "teacher Deleted Failed" });
    } else {
      res.send({ status: true, message: "teacher Deleted successfully" });
    }
  });
});





app.post("/classroom/add", (req, res) => {
  let details = {
    teacherId : req.body.teacherId,
    classRoomCode : req.body.classRoomCode,
    classRoomName : req.body.classRoomName,
    classRoomSec : req.body.classRoomSec,
    classRoomDay : req.body.classRoomDay,
    classRoomTime : req.body.classRoomTime,
  };

  const sql = "INSERT INTO classroom SET ?";
  console.log("SQL Query: " + sql);
  const query = connection.query(sql, details, (error, results) => {
    if (error) {
      console.error("Error inserting data into database: " + error.stack);
      res.status(500).json({ message: "Internal server error" });
      return;
    }

    res.send({
      message: "Classroom added successfully!",
      data: results,
    });
  });
});

  app.get("/classroom", (req, res) => {
    var sql = "SELECT * FROM classroom WHERE classRoomActive =1";
    connection.query(sql, function (error, result) {
      if (error) {
        console.log("Error Connecting to DB");
        res.send({ status: false, message: "Failed to retrieve data from database" });
      } else {
        res.send({ status: true, data: result });
      }
    });
  });

app.get("/classroom/:classRoomId", (req, res) => {
  var classRoomId = req.params.id;
  var sql = "SELECT * FROM classroom WHERE classRoomId=" + req.params.id;
  connection.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

app.put("/classroom/update/:classRoomId", (req, res) => {
  let sql =
  "UPDATE classroom SET teacherId='" +
  req.body.teacherId +
  "', classRoomCode='" +
  req.body.classRoomCode +
  "', classRoomName='" +
  req.body.classRoomName +
  "', classRoomSec='" +
  req.body.classRoomSec +
  "',classRoomDay='" +
  req.body.classRoomDay +
  "',classRoomTime='" +
  req.body.classRoomTime +
  "'  WHERE classRoomId=" +
  req.params.classRoomId;

  let a = connection.query(sql, (error, result) => {
    if (error) {
      res.send({ status: false, message: "classroom Updated Failed" });
    } else {
      res.send({ status: true, message: "classroom Updated successfully" });
    }
  });
});

app.delete("/classroom/delete/:classRoomId", (req, res) => {
  let sql = "UPDATE classroom SET classRoomActive=0 WHERE classRoomId=" + req.params.classRoomId;
  let query = connection.query(sql, (error) => {
    if (error) {
      res.send({ status: false, message: "classroom Deleted Failed" });
    } else {
      res.send({ status: true, message: "classroom Deleted successfully" });
    }
  });
});







app.post("/student/add", (req, res) => {
  let details = {
      studentCode : req.body.studentCode,
      name : req.body.name,
      faculty : req.body.faculty,
      branch : req.body.branch,
      level : req.body.level,
  };

  const sql = "INSERT INTO student SET ?";
  console.log("SQL Query: " + sql);
  const query = connection.query(sql, details, (error, results) => {
    if (error) {
      console.error("Error inserting data into database: " + error.stack);
      res.status(500).json({ message: "Internal server error" });
      return;
    }

    res.send({
      message: "Student added successfully!",
      data: results,
    });
  });
});

  app.get("/student", (req, res) => {
    var sql = "SELECT * FROM student WHERE studentActive =1";
    connection.query(sql, function (error, result) {
      if (error) {
        console.log("Error Connecting to DB");
        res.send({ status: false, message: "Failed to retrieve data from database" });
      } else {
        res.send({ status: true, data: result });
      }
    });
  });

app.get("/student/:studentId", (req, res) => {
  var studentId = req.params.id;
  var sql = "SELECT * FROM student WHERE studentId=" + studentId;
  connection.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

app.put("/student/update/:studentId", (req, res) => {
  let sql =
    "UPDATE student SET studentCode='" +
    req.body.studentCode +
    "', name='" +
    req.body.name +
    "', faculty='" +
    req.body.faculty +
    "', branch='" +
    req.body.branch +
    "',level='" +
    req.body.level +
    "'  WHERE studentId=" +
    req.params.studentId;

  let a = connection.query(sql, (error, result) => {
    if (error) {
      res.send({ status: false, message: "student Updated Failed" });
    } else {
      res.send({ status: true, message: "student Updated successfully" });
    }
  });
});

app.delete("/student/delete/:studentId", (req, res) => {
  let sql = "UPDATE student SET studentActive=0 WHERE studentId=" + req.params.studentId;
  let query = connection.query(sql, (error) => {
    if (error) {
      res.send({ status: false, message: "student Deleted Failed" });
    } else {
      res.send({ status: true, message: "student Deleted successfully" });
    }
  });
});






app.post("/register/add", (req, res) => {
  let details = {
    studentId : req.body.studentId,
    classRoomId : req.body.classRoomId,
     
  };

  const sql = "INSERT INTO register SET ?";
  console.log("SQL Query: " + sql);
  const query = connection.query(sql, details, (error, results) => {
    if (error) {
      console.error("Error inserting data into database: " + error.stack);
      res.status(500).json({ message: "Internal server error" });
      return;
    }

    res.send({
      message: "register added successfully!",
      data: results,
    });
  });
});

app.get("/register", (req, res) => {
  var sql = `SELECT register.registerId, student.name, classroom.classRoomName, register.registerCreateDate, register.registerUpdateDate, register.registerActive 
  FROM attendent.register 
  inner join attendent.classroom on register.classRoomId=classroom.classRoomId
  inner join attendent.student on register.studentId=student.studentId
  where registerActive =1;`;
  connection.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
      res.send({ status: false, message: "Failed to retrieve data from database" });
    } else {
      res.send({ status: true, data: result });
    }
  });
});

app.get("/register/:registerId", (req, res) => {
  var registerId = req.params.id;
  var sql = "SELECT * FROM register WHERE registerId=" + registerId;
  connection.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

app.put("/register/update/:registerId", (req, res) => {
  let sql =
    "UPDATE register SET studentId='" +
    req.body.studentId +
    "', classRoomId='" +
    req.body.classRoomId +
    "'  WHERE registerId=" +
    req.params.registerId;

  let a = connection.query(sql, (error, result) => {
    if (error) {
      res.send({ status: false, message: "register Updated Failed" });
    } else {
      res.send({ status: true, message: "register Updated successfully" });
    }
  });
});

app.delete("/register/delete/:registerId", (req, res) => {
  let sql = "UPDATE register SET registerActive=0 WHERE registerId=" + req.params.registerId;
  let query = connection.query(sql, (error) => {
    if (error) {
      res.send({ status: false, message: "register Deleted Failed" });
    } else {
      res.send({ status: true, message: "register Deleted successfully" });
    }
  });
});

app.get("/search/:studentId", (req, res) => {
  const studentId = req.params.studentId;

  // Construct the SQL query
  const query = `SELECT student.name, classroom.classRoomName, classroom.classRoomSec, classroom.classRoomTime
  FROM attendent.register 
  inner join attendent.student 
  on register.studentId=student.studentId
  INNER JOIN attendent.classroom 
  ON register.classRoomId=classroom.classRoomId
  where register.classRoomId=? And registerActive = 1`;

  // Execute the query with the search text as a parameter
  connection.query(query, [studentId], (error, results, fields) => {
    if (error) {
      console.log("Error executing query:", error);
      res.status(500).send("Error executing query");
    } else {
      console.log(`Found ${results.length} results`);
      res.json({ data: results });
    }
  });
});





app.get("/studytime", (req, res) => {
  var sql = `SELECT studytime.studyTimeId, student.studentCode, student.name, student.level, classroom.classRoomId, classroom.classRoomName, studytime.No
  FROM attendent.studytime
  inner join attendent.student on studytime.studentCode=student.studentCode
  inner join attendent.classroom on studytime.classRoomId=classroom.classRoomId`;
  connection.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
      res.send({ status: false, message: "Failed to retrieve data from database" });
    } else {
      res.send({ status: true, data: result });
    }
  });
});

app.get("/studytime/:studyTimeId", (req, res) => {
  var studyTimeId = req.params.id;
  var sql = "SELECT * FROM studytime WHERE studyTimeId=" + studyTimeId;
  connection.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

app.post("/studytime/add", (req, res) => {
  let details = {
    studentCode : req.body.studentCode,
    classRoomId : req.body.classRoomId,
    No : req.body.No,
     
  };

  const sql = "INSERT INTO studytime SET ?";
  console.log("SQL Query: " + sql);
  const query = connection.query(sql, details, (error, results) => {
    if (error) {
      console.error("Error inserting data into database: " + error.stack);
      res.status(500).json({ message: "Internal server error" });
      return;
    }

    res.send({
      message: "studytime added successfully!",
      data: results,
    });
  });
});






app.get("/studentattendent", (req, res) => {
  var sql = `SELECT student.studentCode, student.name, classroom.classRoomName, studytime.No  
  FROM attendent.studytime
  inner join attendent.student on studytime.studentCode=student.studentCode
  inner join attendent.classroom on studytime.classRoomId=classroom.classRoomId`;
  connection.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
      res.send({ status: false, message: "Failed to retrieve data from database" });
    } else {
      res.send({ status: true, data: result });
    }
  });
});




app.get("/studytimeattendent", (req, res) => {
  var sql = "SELECT No FROM attendent.studytime GROUP BY No";
  connection.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
      res.send({ status: false, message: "Failed to retrieve data from database" });
    } else {
      res.send({ status: true, data: result });
    }
  });
});




app.get("/search4/:classRoomId/:No", (req, res) => {
  const classRoomId = req.params.classRoomId;
  const No = req.params.No;

  // Construct the SQL query
  const query = `SELECT studytime.studyTimeId, student.studentCode, student.name, student.level, classroom.classRoomId, classroom.classRoomName, studytime.No  
    FROM attendent.studytime
    inner join attendent.student on studytime.studentCode=student.studentCode
    inner join attendent.classroom on studytime.classRoomId=classroom.classRoomId
    where studytime.classRoomId=? And studytime.No = ?`;

  // Execute the query with the search text as a parameter
  connection.query(query, [classRoomId, No], (error, results, fields) => {
    if (error) {
      console.log("Error executing query:", error);
      res.status(500).send("Error executing query");
    } else {
      console.log(`Found ${results.length} results`);
      res.json({ data: results });
    }
  });
});



// Start the server
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});


