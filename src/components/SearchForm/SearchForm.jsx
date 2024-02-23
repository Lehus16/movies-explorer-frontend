import React, { useEffect, useState } from 'react'
import './SearchForm.css'
import searchIcon from "../../images/searchIcon.svg";
import findIcon from "../../images/find.svg";
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useLocation } from 'react-router-dom';

function SearchForm({
    onSearchMovies,
    onCheckboxChange,
    searhSavedMovies,
    isLoading,
    errorText
}) {

    const location = useLocation();

    const [queryText, setQueryText] = useState('');
    const [checkboxValue, setCheckboxValue] = useState(false);
    const [savedMoviesCheckboxValue, setSavedMoviesCheckboxValue] = useState(false);

    useEffect(() => {
        const checkboxState = localStorage.getItem('shortMoviesCheckbox');
        if (location.pathname === '/movies') {
            const moviesQuery = localStorage.getItem('moviesQuery')
            if (moviesQuery) {
                setQueryText(moviesQuery);
            }
            setCheckboxValue(checkboxState === 'true');
        } else {
            setQueryText('');
        }
    }, [location.pathname, checkboxValue]);

    const onSubmitFunc = function (event) {
        event.preventDefault();
        if (location.pathname === '/movies') {
            onSearchMovies(queryText)
        } else {
            searhSavedMovies(queryText, savedMoviesCheckboxValue);
        }
    }
    return (
        <div className='search-form-wrapper'>
            <form className='search-form'>
                <img className='search-form__search-icon' src={searchIcon} alt='Иконка поиска' />
                <input
                    minLength={2}
                    className='search-form__input'
                    type='text'
                    placeholder='Фильм'
                    onChange={(event) => setQueryText(event.target.value)}
                    value={queryText || ''}
                    disabled={isLoading}
                />
                <button
                    onClick={onSubmitFunc}
                    className='search-form__submit-button'
                    type='submit'
                    disabled={isLoading}>
                    <img
                        className='search-form__find-icon'
                        src={findIcon}
                        alt='Кнопка поиска фильмов' />
                </button>
            </form>
            <span className='search-form__error'>{errorText}</span>
            <FilterCheckbox
                onCheckboxChange={onCheckboxChange}
                checkboxValue={checkboxValue}
                isLoading={isLoading}
                savedMoviesCheckbox={savedMoviesCheckboxValue}
                setSavedMoviesCheckbox={setSavedMoviesCheckboxValue}

            />
        </div>

    )
}

export default SearchForm;