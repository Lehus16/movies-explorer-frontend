import React, { useEffect, useState } from "react";
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
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
    const [infoTooltipText, setInfoTooltipText] = useState('');


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
            setErrorText('Ошибка регистрации. Попробуйте еще раз.');
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
            setErrorText('Ошибка авторизации. Попробуйте ещё раз.');
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
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
        setIsLoading(true)
        setIsSuccess(true)
        try {
            await mainApi.patchUserInfo(values)
                .then((info) => {
                    setUserInfo(info);
                    setInfoTooltipText('Данные успешно обновлены');
                    setIsInfoTooltipOpen(true)
                });
        } catch (err) {
            console.log(`Ошибка обновления данных: ${err}`);
            setIsSuccess(false);
            setInfoTooltipText('Произошла ошибка. Попробуйте ещё раз');
            setErrorText(`Ошибка обновления данных ${err}`);
            setIsInfoTooltipOpen(true)
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 500)
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
            localStorage.setItem('foundMovies', JSON.stringify(movies));
            setFoundMovies(movies);
            const shortMoviesCheckbox = localStorage.getItem('shortMoviesCheckbox');
            if (shortMoviesCheckbox === "true") {
                const shortMovies = movies.filter((movie) => movie.duration <= cardsConstants.SHORT_MOVIE_DURATION
                );
                setFoundMovies(shortMovies);
            } else {
                setFoundMovies(movies)
            }
            setIsSuccess(true);
        } catch (err) {
            console.log(`Ошибка при поиске фильмов: ${err}`);
            setIsSuccess(false)
            setErrorText('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
        } finally {
            setTimeout(() => {
                setIsLoading(false)
            }, 500)
        }

    }

    const onCheckboxChange = (isChecked) => {
        localStorage.setItem('shortMoviesCheckbox', JSON.stringify(isChecked));
    }

    const searhSavedMovies = async (moviesQuery, checkboxState) => {
        setErrorText('');
        setIsLoading(true);
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
                const shortMovies = savedMovies.filter((movie) => movie.duration <= cardsConstants.SHORT_MOVIE_DURATION);
                setSavedMovies(shortMovies);
            }
            setIsSuccess(true)
        } catch (err) {
            console.log(`Ошибка при поиске фильмов: ${err}`);
            setErrorText(`Ошибка при поиске фильмов: ${err}`)
            setIsSuccess(false)
        } finally {
            setTimeout(() => {
                setIsLoading(false)
            }, 500)
        }
    }


    const savedMoviesCheckboxChange = (queryText, isChecked) => {
        const savedMoviesFromStorage = JSON.parse(localStorage.getItem('savedMovies'));
        const query = queryText.toLowerCase().trim();
        const savedMovies = savedMoviesFromStorage.filter((movie) => {
            const movieNameRU = movie.nameRU.toLowerCase().trim();
            const movieNameEN = movie.nameEN.toLowerCase().trim();
            return (
                movieNameRU.includes(query) || movieNameEN.includes(query)
            )
        })
        const filteredSavedMovies = isChecked ? savedMovies.filter((movie) => movie.duration <= cardsConstants.SHORT_MOVIE_DURATION) : savedMovies;
        setSavedMovies(filteredSavedMovies);
    }

    const onSaveMovie = async (movie) => {
        try {
            if (!savedMovies.some((savedMovie) => savedMovie.movieId === movie.id)) {
                await mainApi.saveMovie(movie)
                    .then((movie) => {
                        const allSavedMoviesFromStorage = JSON.parse(localStorage.getItem('savedMovies'));
                        const allMoviesToSave = [movie, ...allSavedMoviesFromStorage];
                        setSavedMovies(allMoviesToSave);
                        localStorage.setItem('savedMovies', JSON.stringify(allMoviesToSave));
                    });
            }
        } catch (err) {
            console.log(`Ошибка сохранения фильма: ${err}`);
        }
    }

    const onDeleteMovie = async (movie) => {
        try {
            if (movie._id) {
                await mainApi.deleteMovie(movie._id)
                    .then(() => {
                        const allMoviesAfterDelete = JSON.parse(localStorage.getItem('savedMovies')).filter((savedMovie) => savedMovie._id !== movie._id);
                        localStorage.setItem('savedMovies', JSON.stringify(allMoviesAfterDelete));
                        setSavedMovies(savedMovies.filter((savedMovie) => savedMovie._id !== movie._id));
                    })
            } else {
                const movieToDeleteId = savedMovies.find((savedMovie) => savedMovie.movieId === movie.id);
                await mainApi.deleteMovie(movieToDeleteId._id)
                    .then(() => {
                        const allMoviesAfterDelete = savedMovies.filter((savedMovie) => savedMovie._id !== movieToDeleteId._id);
                        setSavedMovies(allMoviesAfterDelete);
                        localStorage.setItem('savedMovies', JSON.stringify(allMoviesAfterDelete));
                    });
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
        setErrorText('');
    }, [location.pathname]);


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
                                onCheckboxChange={savedMoviesCheckboxChange}
                                errorText={errorText}
                                isSuccess={isSuccess}
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
                                infoTooltipText={infoTooltipText}
                            />}
                    />
                    <Route
                        path="/signup"
                        element={
                            <ProtectedRoute
                                element={Register}
                                onSignUp={onSignUp}
                                isLoading={isLoading}
                                isLoggedIn={!isLoggedIn}
                                errorText={errorText}
                            />
                        }

                    />
                    <Route
                        path="/signin"
                        element={
                            <ProtectedRoute
                                element={Login}
                                onSignIn={onSignIn}
                                isLoading={isLoading}
                                isLoggedIn={!isLoggedIn}
                                errorText={errorText}
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