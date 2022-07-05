const express = require("express");
const app = express();
const mySql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());
const db = mySql.createConnection({
  user: "root",
  port: 3306,
  host: "localhost",
  password: "mratovo25",
  connectionLimit: 5,
  database: "employeesystem",
});
//RES for sending something to frontend
// if yu want to grab someting sent from a frontend u use REQ
app.post("/create", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const position = req.body.position;
  const wage = req.body.wage;

  db.query(
    "INSERT INTO employees (name, age, country,position,wage) VALUES (?,?,?,?,?)",
    [name, age, country, position, wage],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});
app.get("/employees", (req, res) => {
  db.query("SELECT * FROM employees", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.listen(3001, () => {
  console.log("Yey your server is running");
});
