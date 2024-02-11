import React, { useEffect, useState, useCallback } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import './App.css';
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import Main from "../Main/Main.jsx";
import Movies from "../Movies/Movies.jsx";
import SavedMovies from "../SavedMovies/SavedMovies.jsx";
import Profile from "../Profile/Profile.jsx"
import Register from "../Register/Register.jsx"
import Login from "../Login/Login.jsx";
import NotFoundPage from "../NotFoundPage/NotFoundPage.jsx";
import { cardsConstants } from "../../utils/cardsConstants.js";
import * as mainApi from "../../utils/MainApi.js";
import * as moviesApi from "../../utils/MoviesApi.js";

const App = () => {

    const [userInfo, setUserInfo] = useState({})
    const [movies, setMovies] = useState([])
    const [savedMovies, setSavedMovies] = useState([])
    const [isLoggedIn, setIsloggedIn] = useState(false)
    const [shortMovies, setShortMovies] = useState([]);
    const [isMoviesShort, setIsMoviesShort] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const savedMovies = localStorage.getItem('movies');
        if (savedMovies && location.pathname === '/saved-movies') {
            setSavedMovies(savedMovies);
        }
    }, [location.pathname]);

    // const checkToken = useCallback(async () => {
    //     try {
    //         const loggedIn = localStorage.getItem('isLoggedIn');
    //         if (loggedIn) {
    //             await mainApi.checkToken();
    //             setIsloggedIn(true);
    //         } else {
    //             setIsloggedIn(false);
    //         }
    //     } catch (err) {
    //         console.log(`Ошибка проверки токена: ${err}`);
    //         setIsloggedIn(false);
    //     }
    // }, []);

    useEffect(() => {
        // checkToken();
        isLoggedIn &&
            Promise.all([mainApi.getUserInfo(), moviesApi.getMovies()])
                .then(([userInfo, savedMovies]) => {
                    console.log(userInfo, savedMovies);
                    setIsloggedIn(true);
                    setUserInfo(userInfo);
                    setSavedMovies(savedMovies);
                    localStorage.setItem('savedMovies', JSON.stringify(savedMovies));

                })
                .catch((err) => {
                    console.log(`Ошибка получения данных: ${err}`);
                })
    }, [isLoggedIn]);



    const onSignUp = async (values) => {
        try {
            if (!values.name || !values.email || !values.password) {
                return;
            }
            setIsLoading(true);
            const data = await mainApi.signUp(values)
            if (data) {
                onSignIn(values)
            }
        } catch (err) {
            console.log(`Ошибка регистрации: ${err}`);
        } finally {
            setIsLoading(false)
        }
    }
    const onSignIn = async (values) => {
        if (!values.email || !values.password) {
            return;
        }
        setIsLoading(true)
        try {
            const data = await mainApi.signIn(values);
            if (data.message) {
                localStorage.setItem('isLoggedIn', 'true');
                setIsloggedIn(true);
                navigate('/movies', { replace: true });
            }
        } catch (err) {
            console.log(`Ошибка авторизации: ${err}`);
        } finally {
            setIsLoading(false)
        }
    }


    const onSignOut = async () => {
        try {
            await mainApi.signOut();
            localStorage.clear();
            setIsloggedIn(false)
            setUserInfo({});
            setMovies([])
            navigate('/', { replace: true })
        } catch (err) {
            console.log(`Ошибка выхода: ${err}`);
        }
    }

    const onFilterChange = () => {
        setIsMoviesShort(!isMoviesShort);
        setShortMovies(movies.filter(card => card.duration <= cardsConstants.SHORT_MOVIE_DURATION));
    }


    return (
        <CurrentUserContext.Provider value={userInfo}>
            <div className="page">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Main
                                isLoggedIn={isLoggedIn}

                            />
                        }
                    />
                    <Route
                        path="/movies"
                        element={
                            <Movies
                                isMoviesShort={isMoviesShort}
                                onFilterChange={onFilterChange}
                                shortMovies={shortMovies}
                                cards={movies}
                                isLoggedIn={isLoggedIn} />
                        }
                    />
                    <Route
                        path="/saved-movies"
                        element={
                            <SavedMovies
                                isMoviesShort={isMoviesShort}
                                onFilterChange={onFilterChange}
                                shortMovies={shortMovies}
                                cards={movies}
                                isLoggedIn={isLoggedIn}

                            />
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <Profile
                                isLoggedIn={isLoggedIn}
                                onSignOut={onSignOut}

                            />
                        }
                    />
                    <Route
                        path="/signup"
                        element={
                            <Register
                                onSignUp={onSignUp}

                            />
                        }

                    />
                    <Route
                        path="/signin"
                        element={
                            <Login
                                onSignIn={onSignIn}
                            />
                        }
                    />
                    <Route
                        path="*"
                        element={
                            <NotFoundPage

                            />
                        }
                    />
                </Routes>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;