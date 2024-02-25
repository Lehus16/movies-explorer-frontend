import { MY_API_URL, MOVIES_API_URL } from "./urlConstants";


export function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
}
export const getUserInfo = () => {
    return fetch(`${MY_API_URL}/users/me`, {
        method: 'GET',
        credentials: 'include',
    })
        .then(checkResponse);
}

export const patchUserInfo = (values) => {
    return fetch(`${MY_API_URL}/users/me`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: values.name,
            email: values.email
        })
    })
        .then(checkResponse)
}


export const signIn = (values) => {
    return fetch(`${MY_API_URL}/signin`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: values.email,
            password: values.password
        })
    })
        .then(checkResponse);
}

export const signUp = (values) => {
    return fetch(`${MY_API_URL}/signup`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: values.name,
            email: values.email,
            password: values.password
        })
    })
        .then(checkResponse)
}

export const signOut = () => {
    return fetch(`${MY_API_URL}/signout`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
    })
        .then(checkResponse);
}

export const getSavedMovies = () => {
    return fetch(`${MY_API_URL}/movies`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        }
    })
        .then(checkResponse);
}

export const saveMovie = (movie) => {
    return fetch(`${MY_API_URL}/movies`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nameRU: movie.nameRU,
            nameEN: movie.nameEN,
            country: movie.country,
            director: movie.director,
            duration: movie.duration,
            year: movie.year,
            description: movie.description,
            image: MOVIES_API_URL + movie.image.url,
            trailerLink: movie.trailerLink,
            thumbnail: MOVIES_API_URL + movie.image.formats.thumbnail.url,
            movieId: movie.id,
        })
    })
        .then(checkResponse)
}


export const deleteMovie = (id) => {
    return fetch(`${MY_API_URL}/movies/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        }
    })
        .then(checkResponse)
}

export const checkToken = () => {
    return fetch(`${MY_API_URL}/users/me`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
        .then(checkResponse)
}