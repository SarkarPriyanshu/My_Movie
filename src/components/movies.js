import { Link} from 'react-router-dom'
const IMAGES_API = 'https://images.tmdb.org/t/p/w1280';

function Movies(props) {
    let { title, poster_path, overview, vote_average, id } = props.results
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

export default Movies