import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import './FilterCheckbox.css'
function FilterCheckbox({ onCheckboxChange, checkboxValue, setCheckboxValue }) {


    const location = useLocation();


    useEffect(() => {
        if (location.pathname === '/movies') {
            const shortMoviesCheckbox = localStorage.getItem('shortMoviesCheckbox');
            if (shortMoviesCheckbox === "true") {
                setCheckboxValue(true);
            } else {
                setCheckboxValue(false);
            }
        }
    }, [location.pathname, checkboxValue, setCheckboxValue]);

    const onChangeCheckboxState = () => {
        if (location.pathname === '/movies') {
            setCheckboxValue(!checkboxValue);
            onCheckboxChange();
        } else {
            setCheckboxValue(!checkboxValue);
        }
    }

    return (
        <div className='filter-checkbox'>
            <label className='filter-checkbox__switch'>
                <input
                    onChange={onChangeCheckboxState}
                    checked={checkboxValue}
                    className='filter-checkbox__input'
                    type='checkbox' />
                <span className='filter-checkbox__slider'></span>
            </label>
            <p className='filter-checkbox__text'>Короткометражки</p>
        </div>
    )
}

export default FilterCheckbox