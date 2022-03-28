import { SEARCH_URL, PER_PAGE } from '../constants'
import sanitizeLetters from '../helpers/sanitize-term'

function searchProduct(term, page = 0) {
    const query = sanitizeLetters(term);

    return fetch(`${SEARCH_URL}?query=${query}&page=${page}`)
        .then(res => res.json())
}


export default searchProduct