import { Link } from 'react-router-dom'

function Nav() {
    return <>
        <header className="d-flex flex-row justify-content-between align-items-center flex-wrap p-3">
            <Link to="/">
                <h1>My Movies</h1>
            </Link>
            <ul className="col-4 d-flex flex-row justify-content-between -align-items-center flex-wrap">
                <Link to="/series">
                    <li>Tv Series</li>
                </Link>
                <Link to='/popular'>
                    <li>Popular</li>
                </Link>
                <Link to="/toprated">
                     <li>Top Rated</li>
                </Link>
                <Link to='/upcoming'>
                <li>Upcoming</li>
                </Link>
            </ul>
        </header>
    </>
}

export default Nav