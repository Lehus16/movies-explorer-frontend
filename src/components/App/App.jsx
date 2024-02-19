import React, { useCallback, useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import './App.css';
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
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

    const [userInfo, setUserInfo] = useState({});
    const [foundMovies, setFoundMovies] = useState([]);
    const [savedMovies, setSavedMovies] = useState([]);
    const [isLoggedIn, setIsloggedIn] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
    const [checkboxState, setCheckboxState] = useState(false);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);


    const navigate = useNavigate();
    const location = useLocation();

    const toggleBurgerMenu = () => {
        document.body.classList.toggle('no-scroll');
        setIsBurgerMenuOpen(!isBurgerMenuOpen);
    }

    useEffect(() => {
        const savedMovies = localStorage.getItem('savedMovies');
        if (savedMovies && location.pathname === '/saved-movies') {
            setSavedMovies(JSON.parse(savedMovies));
        }
    }, [location.pathname]);


    useEffect(() => {
        localStorage.getItem('isLoggedIn') === 'true' ? setIsloggedIn(true) : setIsloggedIn(false);
    }, []);

    useEffect(() => {
        isLoggedIn &&
            // Получаем данные пользователя и сохраненные фильмы, и передаём их в стейты и локальное хранилище
            Promise.all([mainApi.getUserInfo(), mainApi.getSavedMovies()])
                .then(([userInfo, savedMovies]) => {
                    setIsloggedIn(true);
                    setUserInfo(userInfo);
                    setSavedMovies(savedMovies);
                    localStorage.setItem('savedMovies', JSON.stringify(savedMovies));

                })
                .catch((err) => {
                    localStorage.clear();
                    setIsloggedIn(false);
                    console.log(`Ошибка получения данных: ${err}. Попробуйте авторизоваться заново.`);
                })
    }, [isLoggedIn]);



    const onSignUp = async (values) => {
        setErrorText('');
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
            setErrorText('Такой пользователь уже существует');
        } finally {
            setIsLoading(false)
        }
    }
    const onSignIn = async (values) => {
        setErrorText('');
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
            setErrorText('Неправильные почта или пароль');
        } finally {
            setIsLoading(false);
        }
    }


    const onSignOut = async () => {
        try {
            await mainApi.signOut();
            localStorage.clear();
            setIsloggedIn(false)
            setUserInfo({});
            setErrorText('');
            navigate('/', { replace: true })
        } catch (err) {
            console.log(`Ошибка выхода: ${err}`);
        }
    }

    const onPatchUserInfo = async (values) => {
        setErrorText('')
        try {
            const data = await mainApi.patchUserInfo(values);
            setIsSuccess(true)
            // document.body.classList.add('no-scroll')
            setErrorText('Данные успешно обновлены')
            setIsInfoTooltipOpen(true)
            setUserInfo(data);
        } catch (err) {
            // document.body.classList.add('no-scroll')
            console.log(`Ошибка обновления данных: ${err}`);
            setIsSuccess(false);
            setErrorText(`Ошибка обновления данных ${err}`);
            setIsInfoTooltipOpen(true)
        }
    }


    const searchMovies = async (moviesQuery) => {
        setErrorText('');
        setIsLoading(true)

        try {
            if (!JSON.parse(localStorage.getItem('allMovies'))) {
                const allMovies = await moviesApi.getMovies();
                localStorage.setItem('allMovies', JSON.stringify(allMovies));
            }
            localStorage.setItem('moviesQuery', moviesQuery);
            // Приводим всё к нижнему регистру и убираем пробелы
            const query = moviesQuery.toLowerCase().trim();
            const movies = JSON.parse(localStorage.getItem('allMovies')).filter((movie) => {
                const movieNameRU = movie.nameRU.toLowerCase().trim();
                const movieNameEN = movie.nameEN.toLowerCase().trim();
                return (
                    movieNameRU.includes(query) || movieNameEN.includes(query)
                )
            })
            setFoundMovies(movies);
            const shortMoviesCheckbox = localStorage.getItem('shortMoviesCheckbox');
            if (shortMoviesCheckbox === "true") {
                const shortMovies = movies.filter((movie) => movie.duration <= cardsConstants.SHORT_MOVIE_DURATION
                );
                setFoundMovies(shortMovies);
                localStorage.setItem('foundMovies', JSON.stringify(shortMovies));
            } else {
                setFoundMovies(movies)
                localStorage.setItem('foundMovies', JSON.stringify(movies));
            }
            setIsSuccess(true);
        } catch (err) {
            console.log(`Ошибка при поиске фильмов: ${err}`);
            setErrorText('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
            setIsSuccess(false)
        } finally {
            setTimeout(() => {
                setIsLoading(false)
            }, 1000)
        }

    }

    const onCheckboxChange = () => {
        const shortMoviesCheckbox = localStorage.getItem('shortMoviesCheckbox');
        if (shortMoviesCheckbox === "true") {
            setCheckboxState(false);
            localStorage.setItem('shortMoviesCheckbox', false);
        } else {
            setCheckboxState(true);
            localStorage.setItem('shortMoviesCheckbox', true);
        }
    }

    const searhSavedMovies = async (moviesQuery, checkboxState) => {
        setErrorText('');
        try {
            if (!JSON.parse(localStorage.getItem('savedMovies'))) {
                const savedMovies = await mainApi.getSavedMovies();
                localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
            }
            const query = moviesQuery.toLowerCase().trim();
            const savedMovies = JSON.parse(localStorage.getItem('savedMovies')).filter((movie) => {
                const movieNameRU = movie.nameRU.toLowerCase().trim();
                const movieNameEN = movie.nameEN.toLowerCase().trim();
                return (
                    movieNameRU.includes(query) || movieNameEN.includes(query)
                )
            })
            setSavedMovies(savedMovies);
            if (checkboxState === true) {
                const shortSavedMovies = savedMovies.filter((movie) => movie.duration <= cardsConstants.SHORT_MOVIE_DURATION
                );
                setSavedMovies(shortSavedMovies);
            } else {
                setSavedMovies(savedMovies)
            }
        } catch (err) {
            console.log(`Ошибка при поиске фильмов: ${err}`);
        }
    }

    const onSaveMovie = async (movie) => {
        try {
            if (!savedMovies.some((savedMovie) => savedMovie.movieId === movie.id)) {
                const movieToSave = await mainApi.saveMovie(movie);
                const allMoviesToSave = [movieToSave, ...savedMovies];
                setSavedMovies(allMoviesToSave);
                localStorage.setItem('savedMovies', JSON.stringify(allMoviesToSave));
            }
        } catch (err) {
            console.log(`Ошибка сохранения фильма: ${err}`);
        }
    }

    const onDeleteMovie = async (movie) => {
        try {
            if (movie._id) {
                await mainApi.deleteMovie(movie._id)
                const allMoviesAfterDelete = savedMovies.filter((savedMovie) => savedMovie._id !== movie._id);
                setSavedMovies(allMoviesAfterDelete);
                localStorage.setItem('savedMovies', JSON.stringify(allMoviesAfterDelete));
            } else {
                const movieToDeleteId = savedMovies.find((savedMovie) => savedMovie.movieId === movie.id);
                await mainApi.deleteMovie(movieToDeleteId._id);
                const allMoviesAfterDelete = savedMovies.filter((savedMovie) => savedMovie._id !== movieToDeleteId._id);
                setSavedMovies(allMoviesAfterDelete);
                localStorage.setItem('savedMovies', JSON.stringify(allMoviesAfterDelete));
            }
        } catch (err) {
            console.log(`Ошибка удаления фильма: ${err}`);
        }
    }


    const closeInfoTooltip = () => {
        setIsInfoTooltipOpen(false);
        // document.body.classList.remove('no-scroll');
    }



    useEffect(() => {
        const handleEscClose = (evt) => {
            if (evt.key === 'Escape') {
                closeInfoTooltip();
            }
        }
        document.addEventListener('keydown', handleEscClose);

        return () => {
            document.removeEventListener('keydown', handleEscClose);
        }
    }, [isInfoTooltipOpen]);

    return (
        <CurrentUserContext.Provider value={userInfo}>
            <div className="page">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Main

                                isLoggedIn={isLoggedIn}
                                toggleBurgerMenu={toggleBurgerMenu}
                                isBurgerMenuOpen={isBurgerMenuOpen}

                            />
                        }
                    />
                    <Route
                        path="/movies"
                        element={
                            <ProtectedRoute
                                element={Movies}
                                movies={foundMovies}
                                savedMovies={savedMovies}
                                isLoggedIn={isLoggedIn}
                                isLoading={isLoading}
                                onSearchMovies={searchMovies}
                                errorText={errorText}
                                isSuccess={isSuccess}
                                isBurgerMenuOpen={isBurgerMenuOpen}
                                toggleBurgerMenu={toggleBurgerMenu}
                                onCheckboxChange={onCheckboxChange}
                                checkboxState={checkboxState}
                                onSaveMovie={onSaveMovie}
                                onDeleteMovie={onDeleteMovie}
                            />
                        }
                    />
                    <Route
                        path="/saved-movies"
                        element={
                            <ProtectedRoute
                                element={SavedMovies}
                                movies={savedMovies}
                                isLoggedIn={isLoggedIn}
                                isLoading={isLoading}
                                searhSavedMovies={searhSavedMovies}
                                isBurgerMenuOpen={isBurgerMenuOpen}
                                toggleBurgerMenu={toggleBurgerMenu}
                                onDeleteMovie={onDeleteMovie}
                            />
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute
                                element={Profile}
                                isLoggedIn={isLoggedIn}
                                onSignOut={onSignOut}
                                isLoading={isLoading}
                                onPatchUserInfo={onPatchUserInfo}
                                toggleBurgerMenu={toggleBurgerMenu}
                                isBurgerMenuOpen={isBurgerMenuOpen}
                                errorText={errorText}
                                isInfoTooltipOpen={isInfoTooltipOpen}
                                closeInfoTooltip={closeInfoTooltip}
                                isSuccess={isSuccess}
                            />}
                    />
                    <Route
                        path="/signup"
                        element={
                            <Register
                                onSignUp={onSignUp}
                                isLoading={isLoading}
                            />
                        }

                    />
                    <Route
                        path="/signin"
                        element={
                            <Login
                                onSignIn={onSignIn}
                                isLoading={isLoading}
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