import { useEffect, useState } from 'react'

export function MovieCredits({ match }) {
    const {REACT_APP_API_KEY} = process.env
    const abortController = new AbortController();
    let MOVIE_CREDIT_API = `https://api.themoviedb.org/3/movie/${match.params.id}/credits?api_key=${REACT_APP_API_KEY}&language=en-US`;
    let [cast, setCast] = useState([]);
    let [crew, setCrew] = useState([]);

    useEffect(() => {        
        fetch(MOVIE_CREDIT_API,{signal:abortController.signal})
        .then(response => response.json())
        .then(response => {   
            setCast(response.cast)
            setCrew(response.crew)
        })
        .catch(err => console.log(err))
        
                
        return function cleanUp() {
            abortController.abort()
          }
        }, [match.params.id,cast,crew])

    return <>
        <section className="w-75 mx-auto d-flex flex-column justify-content-center  flex-wrap my-5">
            <h3 className="text-center my-5">Cast & Crew</h3>
            <div className='d-flex flex-row justify-content-center algn-items-start flex-wrap'>
                <div className="col-6">
                    <ul className="list-group">
                        {  
                          cast && cast.map(item => <li key={item.id} className="list-group-item text-dark d-flex justify-content-between">{item.name} <small>{item.character}</small></li>)  
                        }
                    </ul>
                </div>
                <div className="col-6">
                    <ul className="list-group">
                        {
                         crew && crew.map(item => <li key={item.id} className="list-group-item text-dark d-flex justify-content-between">{item.name} <small>{item.known_for_department}</small></li>)  
                        }
                    </ul>
                </div>
            </div>
        </section>
    </>
}


export function TvCredits({ match }) {
    const {REACT_APP_API_KEY} = process.env
    const abortController = new AbortController();
    let TV_CREDIT_API = `https://api.themoviedb.org/3/tv/${match.params.id}/credits?api_key=${REACT_APP_API_KEY}&language=en-US`;
    let [cast, setCast] = useState([]);
    let [crew, setCrew] = useState([]);

    useEffect(() => {        
        fetch(TV_CREDIT_API,{signal:abortController.signal})
        .then(response => response.json())
        .then(response => {   
            setCast(response.cast)
            setCrew(response.crew)
        })
        .catch(err => console.log(err))
        
                
        return function cleanUp() {
            abortController.abort()
          }
        }, [match.params.id,cast,crew])

    return <>
        <section className="w-75 mx-auto d-flex flex-column justify-content-center  flex-wrap my-5">
            <h3 className="text-center my-5">Cast & Crew</h3>
            <div className='d-flex flex-row justify-content-center algn-items-start flex-wrap'>
                <div className="col-6">
                    <ul className="list-group">
                        {  
                          cast && cast.map(item => <li key={item.id} className="list-group-item text-dark d-flex justify-content-between">{item.name} <small>{item.character}</small></li>)  
                        }
                    </ul>
                </div>
                <div className="col-6">
                    <ul className="list-group">
                        {
                         crew && crew.map(item => <li key={item.id} className="list-group-item text-dark d-flex justify-content-between">{item.name} <small>{item.known_for_department}</small></li>)  
                        }
                    </ul>
                </div>
            </div>
        </section>
    </>
}