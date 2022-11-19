const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app= express();
const myssql = require('mysql');
const { json } = require('body-parser');

/*  This file manages the Database connection and API requests from frontend.
    The post request from frontend will be received and insert statement will be executed. */

//LOCALHOST CONNECTION
const db = myssql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'cvbuilderdb'
})

//CLEVER-CLOUD HOSTED CONNECTION
// const db = myssql.createPool({
//     host: 'bjg0bhtsfczyqksiulyd-mysql.services.clever-cloud.com',
//     user: 'ue1z6vn6378hwlhr',
//     password: 'ue1z6vn6378hwlhr',
//     database: 'bjg0bhtsfczyqksiulyd'
// })

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))

// app.get("/api/getCVDetails", (req, res) =>{
//     const sqlSelect = "SELECT * FROM cvdetails"
//     db.query(sqlSelect, (err, result) => {
//         res.send(result);
//     })
// })

app.post("/api/saveCVDetails", (req, res) => {

    const FirstName = req.body.FirstName
    const LastName = req.body.LastName
    const Email = req.body.Email
    const Phone = req.body.Phone
    const WebSite= req.body.WebSite
    const JobTitle = req.body.JobTitle
    const Summary = req.body.Summary
    const Skills = req.body.Skills
    const WorkExperience = req.body.WorkExperience
    const Education = req.body.Education
    const Achievements = req.body.Achievements

    const sqlInsert = "INSERT INTO cvdetails (FirstName, LastName, Email, Phone, WebSite, JobTitle, Summary, Skills, WorkExperience, Education, Achievements) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    db.query(sqlInsert, [FirstName, LastName, Email, Phone, WebSite, JobTitle, Summary, Skills, WorkExperience, Education, Achievements], (err, result) => {
        res.send(result)
    })
})
app.listen(3001, () => {
    console.log("local host 3001")
})