import React from 'react'
import './Register.css'
import MyForm from '../MyForm/MyForm.jsx';
import MyInput from '../MyInput/MyInput.jsx';
import Logo from '../Logo/Logo.jsx';
import { Link } from 'react-router-dom';
import useFormValidation from '../../hooks/useFormValidation.js';
function Register({
    onSignUp,
    errorText,
    isLoading }) {

    const { values, errors, isFormValid, handleChange } = useFormValidation();

    const handleInputChange = (event) => {
        handleChange(event)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onSignUp(values);
    }


    return (
        <main className='register'>
            <div className='register__form-container'>
                <Logo className={'register__logo'} />
                <MyForm props={
                    {
                        className: "register__form",
                        titleclassname: 'register__title',
                        titlevalue: 'Добро пожаловать!',
                        onSubmit: handleSubmit
                    }
                }>
                    <MyInput props={
                        {
                            className: `register__input ${errors.name ? 'register__input_type_error' : ''}`,
                            placeholder: '',
                            spanclassname: 'register__validation-text',
                            labelclassname: 'register__label',
                            labelvalue: 'Имя',
                            value: values.name || '',
                            spanvalue: errors.name,
                            name: 'name',
                            required: true,
                            autoComplete: 'off',
                            type: 'text',
                            onChange: handleInputChange,
                            disabled: isLoading
                        }
                    } />
                    <MyInput props={
                        {
                            className: `register__input ${errors.email ? 'register__input_type_error' : ''}`,
                            placeholder: '',
                            spanclassname: 'register__validation-text',
                            labelclassname: 'register__label',
                            labelvalue: 'E-mail',
                            name: 'email',
                            value: values.email || '',
                            spanvalue: errors.email,
                            required: true,
                            autoComplete: 'off',
                            type: 'email',
                            onChange: handleInputChange,
                            disabled: isLoading
                        }
                    } />
                    <MyInput props={
                        {
                            className: `register__input ${errors.password ? 'register__input_type_error' : ''}`,
                            placeholder: '',
                            spanclassname: 'register__validation-text',
                            spanvalue: errors.password,
                            labelclassname: 'register__label',
                            labelvalue: 'Пароль',
                            name: 'password',
                            value: values.password || '',
                            required: true,
                            autoComplete: 'off',
                            type: 'password',
                            onChange: handleInputChange,
                            disabled: isLoading
                        }
                    } />
                    <span className='register__error-text'>{errorText}</span>
                    <button
                        className={`register__button ${!isFormValid ? 'register__button_unactive' : ''}`}
                        type="submit"
                        disabled={!isFormValid || isLoading}>
                        <p>{isLoading ? 'Регистрация...' : 'Зарегистрироваться'}</p>
                    </button>
                </MyForm>
                <div className='register__signin-container'>
                    <p className='register__signin-text'>
                        Уже зарегистрированы?
                    </p>
                    <Link className='register__signin-link' to="/signin">
                        Войти
                    </Link>
                </div>
            </div>
        </main>
    )
}

export default Register;