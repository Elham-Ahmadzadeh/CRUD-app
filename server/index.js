const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')
const bodyparser = require('body-parser')

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'CRUDDataBase',
})

app.get('/api/get', (req, res) => {
  const sqlSelect = `SELECT * FROM movie_review`;
  db.query(sqlSelect, (err, result) => {
    console.log(result)
    res.send(result)
  })
})

app.post('/api/insert', (req, res) => {
  const movieName = req.body.movieName
  const movieReview = req.body.movieReview
  const sqlInsert = `INSERT INTO movie_review (movieName, movieReview)
  VALUES (?,?)`;
  db.query(sqlInsert, [movieName, movieReview], (err, result) => {
    console.log(result)
  })
})
app.put('/api/update', (req, res) => {
  const name = req.body.movieName
  const review = req.body.movieReview
  const sqlUpdate = `UPDATE movie_review SET movieReview = ?
  WHERE movieName = ?`;
  db.query(sqlUpdate, [review, name], (err, result) => {
    if (err) console.log(err)
  })
})
app.delete('/api/delete/:movieName', (req, res) => {
  const name = req.params.movieName
  const sqlDelete = `DELETE FROM movie_review WHERE movieName = ? `;
  db.query(sqlDelete, name, (err, result) => {
    if (err) console.log(err)
  })
})

app.listen(3001, () => {
  console.log('running on port 3001')
})
