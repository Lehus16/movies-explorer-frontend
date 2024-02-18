import React, { useEffect, useState } from 'react'
import './SearchForm.css'
import searchIcon from "../../images/searchIcon.svg";
import findIcon from "../../images/find.svg";
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useLocation } from 'react-router-dom';

function SearchForm({
    onSearchMovies,
    onCheckboxChange,
    checkboxState,
    searhSavedMovies
}) {

    const location = useLocation();

    const [queryText, setQueryText] = useState('');
    const [checkboxValue, setCheckboxValue] = useState(checkboxState);

    useEffect(() => {
        if (location.pathname === '/movies') {
            const moviesQuery = localStorage.getItem('moviesQuery')
            if (moviesQuery) {
                setQueryText(moviesQuery);
            }
        }
    }, [location.pathname]);

    const onSubmitFunc = function (event) {
        event.preventDefault();
        if (location.pathname === '/movies') {
            localStorage.setItem('moviesQuery', queryText);
            onSearchMovies(queryText)
        } else {
            searhSavedMovies(queryText, checkboxValue);
            setQueryText('');
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
                />
                <button
                    onClick={onSubmitFunc}
                    className='search-form__submit-button'
                    type='submit'>
                    <img
                        className='search-form__find-icon'
                        src={findIcon}
                        alt='Кнопка поиска фильмов' />
                </button>
            </form>
            <FilterCheckbox
                onCheckboxChange={onCheckboxChange}
                checkboxValue={checkboxValue}
                setCheckboxValue={setCheckboxValue}


            />
        </div>

    )
}

export default SearchForm;