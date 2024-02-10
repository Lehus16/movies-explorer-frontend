import React from 'react'
import './Profile.css';
import MyForm from '../MyForm/MyForm.jsx';
import MyInput from '../MyInput/MyInput.jsx';
import Header from "../Header/Header.jsx";
import useFormValidation from '../../hooks/useFormValidation.js';

function Profile({ user, loggenIn }) {

    const { values, handleChange, errors, isFormValid } = useFormValidation();
    const onSubmitForm = () => {
        console.log(values);
    }

    const onSignOut = () => {
        // loggenIn(false);
    }

    const handleInputChange = (evt) => {
        handleChange(evt)
    }
    return (
        <>
            <Header loggenIn={loggenIn} />
            <main className='profile'>
                <h1 className='profile__title'>Привет, Алексей!</h1>
                <MyForm props={{
                    className: 'profile__form',
                    buttonclassname: `profile__button`,
                    buttonvalue: 'Выйти из аккаунта',
                }}>
                    <div className='profile__input-container'>
                        <MyInput props={{
                            className: `profile__input ${errors.name ? 'profile__input-error' : ''}`,
                            value: values.name || '',
                            onChange: handleInputChange,
                            name: 'name',
                            type: 'text',
                            spanclassname: 'profile__validation-text',
                            spanvalue: errors.name,
                            required: true,
                            labelclassname: 'profile__label',
                            labelvalue: 'Имя:',
                            autoComplete: 'off',
                        }} />
                    </div>
                    <div className='profile__input-container'>
                        <MyInput props={{
                            className: `profile__input ${errors.email ? 'profile__input-error' : ''}`, value: values.email || '',
                            onChange: handleInputChange,
                            name: 'email',
                            type: 'email',
                            required: true,
                            autoComplete: 'off',
                            placeholder: '',
                            spanclassname: 'profile__validation-text',
                            spanvalue: errors.email,
                            labelclassname: 'profile__label',
                            labelvalue: 'E-mail:'
                        }} />
                    </div>
                    <button onSubmit={onSubmitForm} disabled={!isFormValid} type='submit' className={`profile__button ${!isFormValid ? 'profile__button_unactive' : ''}`}>Редактировать</button>
                </MyForm>
            </main >
        </>

    )
}

export default Profile;