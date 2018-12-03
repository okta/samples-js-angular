const express = require("express");
const dotenv = require("dotenv");
const mysql = require("mysql");

dotenv.config();

const app = express();

const con = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS
});

con.connect(err => {
    try{
      console.log("Connected!");
      
      // Setting up the database
      con.query("use employees", (err, result) => {
          if (err) throw err;
      }); 
    }
    catch (err) {
      console.log("MySQL connection error");
    }
});

app.use(require("cors")());

//this is needed to get POST parameters
app.use(require("body-parser").json());

// APIs

app.get("/api/salary", (req, res) => {
  let query = "select * from salaries where emp_no = " + req.query.id;
  con.query(query, (err, result) => {
    try {
      res.send(result);
    }
    catch (err) {
      console.log("Error retrieving data. Response: ", err);
    }
  });
});

app.get("/api/employee/:id", (req, res) => {
  let query = "select * from employees where emp_no = " + req.params.id;
  con.query(query, (err, result) => {
    try {
      res.send(result);
    }
    catch (err) {
      console.log("Error retrieving data. Response: ", err);
    }
  });
});

app.get("/api/employee", (req, res) => {
  let query =
    "select * from employees where last_name like '%" + req.query.q + "%'";
  con.query(query, (err, result) => {
    try {
      res.send(result);
    }
    catch (err) {
      console.log("Error retrieving data. Response: ", err);
    }

  });
});

// @route POST api/salary/add
// @desc Add a new salary for an employee
app.post("/api/salary/add", (req, res) => {
  let query =
    "insert into salaries values ('" +
    req.body.id +
    "','" +
    req.body.salary +
    "','" +
    req.body.startDate +
    "','" +
    req.body.endDate +
    "')";
  con.query(query, (err, result) => {
    try {
      res.send(result);
    } catch (err) {
      console.log("Error retrieving data. Response: ", err);
    }
  });
});

// @route POST api/salary/modifyEndDate
// @desc Edit the end date of a salary to today's date
app.put("/api/salary/modifyEndDate", (req, res) => {
  let query =
    "update salaries set to_date='" +
    req.body.endDate +
    "' where emp_no='" +
    req.body.id +
    "' and to_date='9999-01-01'";

  con.query(query, (err, result) => {
    console.log(result.warningCount);
    try {
      res.send(result);
    } catch (err) {
      console.log("Error retrieving data. Response: ", err);
    }
  });
});

app.listen(5000, () => console.log("Server running"));
