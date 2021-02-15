import { MovieCredits,TvCredits } from "./castandcrew_controller";

function CastAndCrew({ match }) {
    switch (match.params.category) {
        case 'movie':
            return MovieCredits({match})
            break;
        case 'tvseries':
            return TvCredits({match})
            break;
        case 'popular':
            return MovieCredits({match})
            break;
        case 'toprated':
            return MovieCredits({match})
            break;
        case 'upcoming':
            return MovieCredits({match})
            break;
        
    
        default:
            break;
    }
}

export default CastAndCrew