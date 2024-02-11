import { MOVIES_API_URL } from "./urlConstants";
const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
}

export const getMovies = () => {
    return fetch(`${MOVIES_API_URL}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(checkResponse)
}