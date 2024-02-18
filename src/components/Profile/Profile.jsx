import React, { useEffect } from 'react'
import './Profile.css';
import MyForm from '../MyForm/MyForm.jsx';
import MyInput from '../MyInput/MyInput.jsx';
import Header from "../Header/Header.jsx";
import useFormValidation from '../../hooks/useFormValidation.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import InfoTooltip from '../InfoTooltip/InfoTooltip.jsx';

function Profile({
    isLoggedIn,
    onSignOut,
    onPatchUserInfo,
    toggleBurgerMenu,
    isBurgerMenuOpen,
    closeInfoTooltip,
    isInfoTooltipOpen,
    errorText,
    isSuccess
}) {

    const { values, handleChange, errors, isFormValid, resetFormValues } = useFormValidation();
    const currentUser = React.useContext(CurrentUserContext);

    useEffect(() => {
        resetFormValues({
            name: currentUser.name,
            email: currentUser.email
        })
    }, [currentUser, resetFormValues])
    const onSubmitForm = (event) => {
        event.preventDefault();
        onPatchUserInfo(values);
    }
    const onSignOutClick = (event) => {
        event.preventDefault();
        onSignOut();
    }

    const handleInputChange = (event) => {
        handleChange(event)
    }
    return (
        <div>
            <Header
                toggleBurgerMenu={toggleBurgerMenu}
                isBurgerMenuOpen={isBurgerMenuOpen}
                loggenIn={isLoggedIn} />
            <main className='profile'>
                <h1 className='profile__title'>Привет, {currentUser.name}!</h1>
                <MyForm props={{
                    className: 'profile__form',
                    onSubmit: onSubmitForm,
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
                            labelclassname: 'profile__label',
                            labelvalue: 'Имя:',
                            autoComplete: 'off',
                        }} />
                    </div>
                    <div className='profile__input-container'>
                        <MyInput props={{
                            className: `profile__input ${errors.email ? 'profile__input-error' : ''}`,
                            value: values.email || '',
                            onChange: handleInputChange,
                            name: 'email',
                            type: 'email',
                            autoComplete: 'off',
                            placeholder: '',
                            spanclassname: 'profile__validation-text',
                            spanvalue: errors.email,
                            labelclassname: 'profile__label',
                            labelvalue: 'E-mail:'
                        }} />
                    </div>
                    <button
                        className={`profile__button`}
                        type='submit'
                        disabled={!isFormValid || (values.name === currentUser.name && values.email === currentUser.email)}>
                        <p>Редактировать</p>
                    </button>
                    <button
                        onClick={onSignOutClick}
                        className={`profile__button profile__button_type_signout`}>
                        <p>Выйти из аккаунта</p>
                    </button>
                </MyForm>
            </main>
            <InfoTooltip
                isInfoTooltipOpen={isInfoTooltipOpen}
                errorText={errorText}
                isSuccess={isSuccess}
                closeInfoTooltip={closeInfoTooltip} />
        </div>

    )
}

export default Profile;