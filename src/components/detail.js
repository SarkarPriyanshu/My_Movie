import {MovieDetails,TvDetails,PopularDetails} from './detail_controller'

function Detail({ match }) {
    switch (match.params.category) {
        case 'movie':
            return MovieDetails({ match })
            break;
        case 'tvseries':
            return TvDetails({ match })
            break;
        case 'popular':
            return PopularDetails({ match })
            break;
        case 'toprated':
            return PopularDetails({ match })
            break;
        case 'upcoming':
            return PopularDetails({ match })
            break;
    }
}

export default Detail