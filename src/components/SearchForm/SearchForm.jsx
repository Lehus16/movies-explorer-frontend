import React from 'react'
import './SearchForm.css'
import searchIcon from "../../images/searchIcon.svg";
import findIcon from "../../images/find.svg";
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm({ onFilterChange }) {
    const submitFunc = function (e) {
        // e.preventDefault();
        console.log('Форма отправлена');
    }
    return (
        <div className='search-form__wrapper'>
            <form className='search-form'>
                <img className='search-form__search-icon' src={searchIcon} alt='Иконка поиска' />
                <input
                    minLength={2}
                    required={true}
                    className='search-form__input'
                    type='text'
                    placeholder='Фильм' />
                <button
                    onClick={submitFunc}
                    className='search-form__submit-button'
                    type='submit'>
                    <img
                        className='search-form__find-icon'
                        src={findIcon}
                        alt='Кнопка поиска фильмов' />
                </button>
            </form>
            <FilterCheckbox onFilterChange={onFilterChange} />
        </div>

    )
}

export default SearchForm;