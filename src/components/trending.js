import React, { useState,useEffect } from 'react'
import Movies from './movies'
import Header from './header'

const {REACT_APP_API_KEY} = process.env

const FEATURE_API = `https://api.themoviedb.org/3/discover/movie?api_key=${REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false`;

const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=d24156043d12ab79516659aa0564e470&query='

function Trending() {
  const abortController = new AbortController()

  let [movies, setMovies] = useState({});

  function handleOnSubmit(search) {
    if (search != undefined || search != null) {
      fetch(SEARCH_API+search)
        .then(response => response.json())
        .then(response => {
          let movies = {
            category: "movie",
            results:response.results
          }
            setMovies(movies)
        })
        .catch(err => console.log(err))   
    } else {
      //
    }
    
  }

  useEffect(() => {
    fetch(FEATURE_API,{signal:abortController.signal})
      .then(response => response.json())
      .then(response => {
        let movies = {
          category: "movie",
          results:response.results
        }
        setMovies(movies)
      })
      .catch(err => console.log(err))
      
      return function cleanUp() {
        abortController.abort()
      }
  },[])
  
  return <>
    <Header handleOnSubmit={handleOnSubmit}/>
    <section className="movie-container d-flex flex-direction-row justify-content-around align-items-center flex-wrap mx-1">
      {movies.results && movies.results.map(item => {
          return (
            <>
              <Movies category={movies.category} results={item} key={item.id}/>
            </>
            )
        })
      }
    </section>
  </>
}

export default Trending;
