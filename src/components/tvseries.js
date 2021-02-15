import React, { useState, useEffect } from 'react'
import { Link} from 'react-router-dom'
import Header from './header'

const {REACT_APP_API_KEY} = process.env

const TVSERIES_API = `https://api.themoviedb.org/3/tv/popular?api_key=${REACT_APP_API_KEY}&language=en-US&page=1`;

const SEARCH_API = 'https://api.themoviedb.org/3/search/tv?api_key=d24156043d12ab79516659aa0564e470&language=en-US&page=1&include_adult=false'

function TVSeries() {
  const abortController = new AbortController()

  let [series, setSeries] = useState({});

  function handleOnSubmit(search) {
    if (search != undefined || search != null) {
      fetch(SEARCH_API+search)
        .then(response => response.json())
          .then(response => {
            let series = {
                category: "tvseries",
                results:response.results
            }    
            setSeries(series)
        })
        .catch(err => console.log(err))   
    } else {
      //
    }
    
  }

  useEffect(() => {
    fetch(TVSERIES_API,{signal:abortController.signal})
      .then(response => response.json())
      .then(response => {
        let series = {
            category: "tvseries",
            results:response.results
        }    
        setSeries(series)
      })
      .catch(err => console.log(err))
      
      return function cleanUp() {
        abortController.abort()
      }
  }, [])
    
  
  return <>
    <Header handleOnSubmit={handleOnSubmit}/>
    <section className="movie-container d-flex flex-direction-row justify-content-around align-items-center flex-wrap mx-1">
        {series.results && series.results.map(item => { 
          return (
            <>
              <Series category = {series.category} results = {item} key = {item.id}/>
            </>
            )
        })
      }
    </section>
  </>
}


function Series(props) {
    let {id,overview,poster_path,vote_average,name}= props.results   
    const IMAGES_API = 'https://images.tmdb.org/t/p/w1280';

    return (
        <>
            <Link to={`/detail/${props.category}/${id}`}>
                <div className='movie'>
                    <img src={IMAGES_API + poster_path} alt={name} />
                    <div className="d-flex flex-row justify-content-between align-items-center py-2">
                        <h6>{name}</h6>
                        <span>{vote_average}</span>
                    </div>
                    <div className="movie-overview p-3">
                        <h6>Overview</h6>
                        <p>{overview}</p>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default TVSeries;
