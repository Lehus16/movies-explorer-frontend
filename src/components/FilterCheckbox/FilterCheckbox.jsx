import React from 'react'
import './FilterCheckbox.css'
function FilterCheckbox({ onFilterChange }) {
    return (
        <div className='filter-checkbox__wrapper'>
            <label className='filter-checkbox__switch'>
                <input onChange={onFilterChange} className='filter-checkbox' type='checkbox' />
                <span className='filter-checkbox__slider'></span>
            </label>
            <p className='filter-checkbox__text'>Короткометражки</p>
        </div>
    )
}

export default FilterCheckbox