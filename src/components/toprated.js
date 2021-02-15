import React, { useState, useEffect } from 'react'
import { Link} from 'react-router-dom'
import Header from './header'


const TVSERIES_API = `https://api.themoviedb.org/3/movie/top_rated?api_key=d24156043d12ab79516659aa0564e470&language=en-US&page=1`;

const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=d24156043d12ab79516659aa0564e470&query='

function TopRated() {
  const abortController = new AbortController()

  let [topRated, setTopRated] = useState({});

  function handleOnSubmit(search) {
    if (search != undefined || search != null) {
      fetch(SEARCH_API+search)
        .then(response => response.json())
          .then(response => {
            console.log(response)    
            let topRated = {
                category: "toprated",
                results:response.results
            }    
            setTopRated(topRated)
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
            console.log(response)
        let TopRated = {
            category: "toprated",
            results:response.results
        }    
        setTopRated(TopRated)
      })
      .catch(err => console.log(err))
      
      return function cleanUp() {
        abortController.abort()
      }
  }, [])
    
  
  return <>
    <Header handleOnSubmit={handleOnSubmit}/>
    <section className="movie-container d-flex flex-direction-row justify-content-around align-items-center flex-wrap mx-1">
        {topRated.results && topRated.results.map(item => { 
          return (
            <>
              <TopRated_Container category={topRated.category} results ={item} key={item.id}/>
            </>
            )
        })
      }
    </section>
  </>
}


function TopRated_Container(props) {
    console.log(props.category)
    let {id,overview,poster_path,vote_average,title}= props.results   
    const IMAGES_API = 'https://images.tmdb.org/t/p/w1280';

    return (
        <>
            <Link to={`/detail/${props.category}/${id}`}>
                <div className='movie'>
                    <img src={IMAGES_API + poster_path} alt={title} />
                    <div className="d-flex flex-row justify-content-between align-items-center py-2">
                        <h6>{title}</h6>
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

export default TopRated;
