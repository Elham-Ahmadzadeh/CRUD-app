import './App.css'
import axios from 'axios'
import React, { useState, useEffect } from 'react'

function App() {
  const [movieName, setMovieName] = useState('')
  const [review, setReview] = useState('')
  const [movieReviewList, setMovieList] = useState([])
  const [newReview, setNewReview] = useState('')
//GET
  useEffect(() => {
    axios.get('http://localhost:3001/api/get')
    .then((response) => {
      setMovieList(response.data)
    })
  }, [])// MAP THROUGH LIST
//POST
  const submitReview = () => {
    axios.post('http://localhost:3001/api/insert', {
      movieName: movieName,
      movieReview: review,
    })

    setMovieList([
      ...movieReviewList,
      { movieName: movieName, movieReview: review },
    ])
  }
  //PUT
  const updateReview = (movie) => {
    axios.put(`http://localhost:3001/api/update`, {
      movieName: movie,
      movieReview: newReview,
    })
    setNewReview('')
  }
  //DELETE
  const deleteReview = (movie) => {
    axios.delete(`http://localhost:3001/api/delete/${movie}`)
  }

  return (
    <div className="App">
      <h1>CRUD application</h1>

      <div className="form">
        <label>movie Name:</label>
        <input
          name="movieName"
          id="movie_inp"
          onChange={(e) => {
            setMovieName(e.target.value)
          }}
        />
        <label>review:</label>
        <input
          name="review"
          id="movie_review"
          onChange={(e) => {
            setReview(e.target.value)
          }}
        />
        <button onClick={submitReview}>Submit</button>
        {movieReviewList.map((val,index) => {
          return (
            <div key={index} className="card">
              <h1 >movieName: {val.movieName}</h1>
              <p >movieReview: {val.movieReview}</p>
              <button
                onClick={() => {
                  deleteReview(val.movieName)
                }}
              >
                Delete
              </button>
              <input
                className="updateInput"
                onChange={(e) => {
                  setNewReview(e.target.value)
                }}
              />
              <button
                onClick={() => {
                  updateReview(val.movieName)
                }}
              >
                update
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
