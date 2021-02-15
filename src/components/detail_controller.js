import { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'

export function MovieDetails({match}) {

    const {REACT_APP_API_KEY} = process.env
    const abortController = new AbortController()
    const IMAGES_API = 'https://images.tmdb.org/t/p/w1280';    
    let MOVIE_DETAIL_API = `https://api.themoviedb.org/3/movie/${match.params.id}?api_key=${REACT_APP_API_KEY}&language=en-US`
    let MOVIE_REVIEW_API = `https://api.themoviedb.org/3/movie/${match.params.id}/reviews?api_key=${REACT_APP_API_KEY}&language=en-US`
    let MOVIE_SIMILAR_API = `https://api.themoviedb.org/3/movie/${match.params.id}/similar?api_key=${REACT_APP_API_KEY}&language=en-US&page=1`
    const [detail, setDetail] = useState([]);
    const [review, setReview] = useState([]);
    const [similar, setSimilar] = useState([]);

    function handleAddWishlist(e) {
       console.log(e.target.attributes[1].nodeValue)
    }

    useEffect(() => {
        fetch(MOVIE_DETAIL_API,{signal:abortController.signal})
        .then(response => response.json())
        .then(response => {
            setDetail(response)
        })
        .catch(err => console.log(err))
        
        
        fetch(MOVIE_REVIEW_API,{signal:abortController.signal})
        .then(response => response.json())
        .then(response => {    
            setReview(response.results)
        })
        .catch(err=>console.log(err))

        fetch(MOVIE_SIMILAR_API,{signal:abortController.signal})
        .then(response => response.json())
        .then(response => {  
            setSimilar(response.results)
        })
            .catch(err => console.log(err))
        
        
        return function cleanUp() {
            abortController.abort()
          }
    
    }, [match.params.id,detail])

    let { poster_path, genres, overview, status, runtime, title, vote_average, id } = { ...detail }

    return <>
        <section className="w-75 mx-auto d-flex flex-row justify-content-center align-items-center my-5">
            <div className='col-8'>
                <header className="detail-header">
                    <ul className="d-flex flex-row justify-content-around align-items-center">
                        <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to={`/detail/cast_and_crew/${match.params.category}/${match.params.id}`}>FULL CAST AND CREW</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" href="#">USERS REVIEWS</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to="#" tabindex="-1" aria-disabled="true">TRIVIA</Link>
                        </li>
                    </ul>
                </header>
                <main>
                    <img className='w-100' src={IMAGES_API + poster_path} />
                    <p className='py-3'>{status = status==`Released`?`In Theaters Now`:`Coming Soon`}</p>
                    <div>
                        <div className="d-flex flex-row justify-content-between align-items-center">
                            <h1>{title}</h1>
                            <small>{vote_average}</small>    
                        </div>
                        <p>{overview}</p>
                        <div className='d-flex flex-column flex-wrap py-2'>
                            <h6>Runtime</h6>
                            <small>{ runtime } min</small>
                        </div>
                        <div className='d-flex flex-column justify-content-between align-items-start flex-wrap py-2'>
                           <h6>Genres</h6>
                           <ul className="d-flex flex-row justify-content-between align-items-start flex-wrap">
                               {genres && genres.map(item => {
                                   return <li className="pr-2"><small>{item.name}</small></li>
                               })}
                           </ul>
                        </div>
                        <div className='d-flex flex-row justify-content-between align-items-center flex-wrap py-2'>
                            <span className='d-flex flex-column justify-content-between align-items-start flex-wrap'>
                                <h6>Reviews</h6>
                                <small>{review && review.length}</small>
                            </span>
                            <button className='btn text-white btn-outline-secondary' data-id={id} onClick={handleAddWishlist}>+ Add To Wishlist</button>
                        </div>
                    </div>
                </main>
            </div>
            <div className='col-4 d-flex flex-column'>
                <h1>Similar Movies</h1>
                <div className='d-flex flex-row justify-content-around align-item-center flex-wrap'>
                    {similar && similar.map((item, index) => {    
                        if (index <= 7) {
                            return <>
                                    <Link  className='col-6 my-2' to={`/detail/${match.params.category}/${item.id}`}>
                                        <div>
                                            <img className='w-100' src={IMAGES_API + item.poster_path} />
                                            <div className="py-1 d-flex flex-row justify-content-between align-items-center">
                                                <small>{item.title}</small>
                                                <small>{item.vote_average}</small>
                                            </div>
                                        </div>
                                    </Link>
                                </>     
                            } 
                        })}
                </div>
            </div>
        </section>
    </>
}



export function TvDetails({ match }) {
    const {REACT_APP_API_KEY} = process.env
    const abortController = new AbortController()
    const IMAGES_API = 'https://images.tmdb.org/t/p/w1280';
    let TV_DETAIL_API = `https://api.themoviedb.org/3/tv/${match.params.id}?api_key=${REACT_APP_API_KEY}&language=en-US`
    let TV_SIMILAR_API = `https://api.themoviedb.org/3/tv/${match.params.id}/similar?api_key=${REACT_APP_API_KEY}&language=en-US&page=1`
    let TV_REVIEW_API =`https://api.themoviedb.org/3/tv/${match.params.id}/reviews?api_key=${REACT_APP_API_KEY}&language=en-US&page=1`
    const [detail, setDetail] = useState([]);
    const [review, setReview] = useState([]);
    const [similar, setSimilar] = useState([]);


    useEffect(() => {
        fetch(TV_DETAIL_API ,{signal:abortController.signal})
        .then(response => response.json())
        .then(response => {
            setDetail(response)
        })
        .catch(err => console.log(err))
        
        
        fetch(TV_REVIEW_API,{signal:abortController.signal})
        .then(response => response.json())
        .then(response => {    
            setReview(response.results)
        })
        .catch(err=>console.log(err))

        fetch(TV_SIMILAR_API,{signal:abortController.signal})
        .then(response => response.json())
        .then(response => {  
            setSimilar(response.results)
        })
            .catch(err => console.log(err))
        
        
        return function cleanUp() {
            abortController.abort()
          }
    
    }, [match.params.id,detail])

    function handleAddWishlist(e) {
        console.log(e.target.attributes[1].nodeValue)
     }    
         // console.log(detail)
         // console.log(review)
         // console.log(similar)
 
     let { poster_path, genres, overview, status, runtime, title, vote_average, id } = { ...detail }
 
     return <>
         <section className="w-75 mx-auto d-flex flex-row justify-content-center align-items-center my-5">
             <div className='col-8'>
                 <header className="detail-header">
                     <ul className="d-flex flex-row justify-content-around align-items-center">
                         <li className="nav-item">
                         <Link className="nav-link active" aria-current="page" to={`/detail/cast_and_crew/${match.params.category}/${match.params.id}`}>FULL CAST AND CREW</Link>
                         </li>
                         <li className="nav-item">
                         <Link className="nav-link" href="#">USERS REVIEWS</Link>
                         </li>
                         <li className="nav-item">
                         <Link className="nav-link" to="#" tabindex="-1" aria-disabled="true">TRIVIA</Link>
                         </li>
                     </ul>
                 </header>
                 <main>
                     <img className='w-100' src={IMAGES_API + poster_path} />
                     <p className='py-3'>{status = status==`Released`?`In Theaters Now`:`Coming Soon`}</p>
                     <div>
                         <div className="d-flex flex-row justify-content-between align-items-center">
                             <h1>{title}</h1>
                             <small>{vote_average}</small>    
                         </div>
                         <p>{overview}</p>
                         <div className='d-flex flex-column flex-wrap py-2'>
                             <h6>Runtime</h6>
                             <small>{ runtime } min</small>
                         </div>
                         <div className='d-flex flex-column justify-content-between align-items-start flex-wrap py-2'>
                            <h6>Genres</h6>
                            <ul className="d-flex flex-row justify-content-between align-items-start flex-wrap">
                                {genres && genres.map(item => {
                                    return <li className="pr-2"><small>{item.name}</small></li>
                                })}
                            </ul>
                         </div>
                         <div className='d-flex flex-row justify-content-between align-items-center flex-wrap py-2'>
                             <span className='d-flex flex-column justify-content-between align-items-start flex-wrap'>
                                 <h6>Reviews</h6>
                                 <small>{review && review.length}</small>
                             </span>
                             <button className='btn text-white btn-outline-secondary' data-id={id} onClick={handleAddWishlist}>+ Add To Wishlist</button>
                         </div>
                     </div>
                 </main>
             </div>
             <div className='col-4 d-flex flex-column'>
                 <h1>Similar Movies</h1>
                 <div className='d-flex flex-row justify-content-around align-item-center flex-wrap'>
                     {similar && similar.map((item, index) => {    
                         if (index <= 7) {
                             return <>
                                     <Link  className='col-6 my-2' to={`/detail/${match.params.category}/${item.id}`}>
                                         <div>
                                             <img className='w-100' src={IMAGES_API + item.poster_path} />
                                             <div className="py-1 d-flex flex-row justify-content-between align-items-center">
                                                 <small>{item.title}</small>
                                                 <small>{item.vote_average}</small>
                                             </div>
                                         </div>
                                     </Link>
                                 </>     
                             } 
                         })}
                 </div>
             </div>
         </section>
     </>

}

export function PopularDetails({match}) {
    const {REACT_APP_API_KEY} = process.env
    const abortController = new AbortController()
    const IMAGES_API = 'https://images.tmdb.org/t/p/w1280';    
    let MOVIE_DETAIL_API = `https://api.themoviedb.org/3/movie/${match.params.id}?api_key=${REACT_APP_API_KEY}&language=en-US`
    let MOVIE_REVIEW_API = `https://api.themoviedb.org/3/movie/${match.params.id}/reviews?api_key=${REACT_APP_API_KEY}&language=en-US`
    let MOVIE_SIMILAR_API = `https://api.themoviedb.org/3/movie/${match.params.id}/similar?api_key=${REACT_APP_API_KEY}&language=en-US&page=1`
    const [detail, setDetail] = useState([]);
    const [review, setReview] = useState([]);
    const [similar, setSimilar] = useState([]);

    function handleAddWishlist(e) {
       console.log(e.target.attributes[1].nodeValue)
    }

    useEffect(() => {
        fetch(MOVIE_DETAIL_API,{signal:abortController.signal})
        .then(response => response.json())
        .then(response => {
            setDetail(response)
        })
        .catch(err => console.log(err))
        
        
        fetch(MOVIE_REVIEW_API,{signal:abortController.signal})
        .then(response => response.json())
        .then(response => {    
            setReview(response.results)
        })
        .catch(err=>console.log(err))

        fetch(MOVIE_SIMILAR_API,{signal:abortController.signal})
        .then(response => response.json())
        .then(response => {  
            setSimilar(response.results)
        })
            .catch(err => console.log(err))
        
        
        return function cleanUp() {
            abortController.abort()
          }
    
    }, [match.params.id,detail])
    
        // console.log(detail)
        // console.log(review)
        // console.log(similar)

    let { poster_path, genres, overview, status, runtime, title, vote_average, id } = { ...detail }

    return <>
        <section className="w-75 mx-auto d-flex flex-row justify-content-center align-items-center my-5">
            <div className='col-8'>
                <header className="detail-header">
                    <ul className="d-flex flex-row justify-content-around align-items-center">
                        <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to={`/detail/cast_and_crew/${match.params.category}/${match.params.id}`}>FULL CAST AND CREW</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" href="#">USERS REVIEWS</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to="#" tabindex="-1" aria-disabled="true">TRIVIA</Link>
                        </li>
                    </ul>
                </header>
                <main>
                    <img className='w-100' src={IMAGES_API + poster_path} />
                    <p className='py-3'>{status = status==`Released`?`In Theaters Now`:`Coming Soon`}</p>
                    <div>
                        <div className="d-flex flex-row justify-content-between align-items-center">
                            <h1>{title}</h1>
                            <small>{vote_average}</small>    
                        </div>
                        <p>{overview}</p>
                        <div className='d-flex flex-column flex-wrap py-2'>
                            <h6>Runtime</h6>
                            <small>{ runtime } min</small>
                        </div>
                        <div className='d-flex flex-column justify-content-between align-items-start flex-wrap py-2'>
                           <h6>Genres</h6>
                           <ul className="d-flex flex-row justify-content-between align-items-start flex-wrap">
                               {genres && genres.map(item => {
                                   return <li className="pr-2"><small>{item.name}</small></li>
                               })}
                           </ul>
                        </div>
                        <div className='d-flex flex-row justify-content-between align-items-center flex-wrap py-2'>
                            <span className='d-flex flex-column justify-content-between align-items-start flex-wrap'>
                                <h6>Reviews</h6>
                                <small>{review && review.length}</small>
                            </span>
                            <button className='btn text-white btn-outline-secondary' data-id={id} onClick={handleAddWishlist}>+ Add To Wishlist</button>
                        </div>
                    </div>
                </main>
            </div>
            <div className='col-4 d-flex flex-column'>
                <h1>Similar Movies</h1>
                <div className='d-flex flex-row justify-content-around align-item-center flex-wrap'>
                    {similar && similar.map((item, index) => {    
                        if (index <= 7) {
                            return <>
                                    <Link  className='col-6 my-2' to={`/detail/${match.params.category}/${item.id}`}>
                                        <div>
                                            <img className='w-100' src={IMAGES_API + item.poster_path} />
                                            <div className="py-1 d-flex flex-row justify-content-between align-items-center">
                                                <small>{item.title}</small>
                                                <small>{item.vote_average}</small>
                                            </div>
                                        </div>
                                    </Link>
                                </>     
                            } 
                        })}
                </div>
            </div>
        </section>
    </>
}

