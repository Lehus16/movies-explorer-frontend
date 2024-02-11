import React from 'react'
import './Register.css'
import MyForm from '../MyForm/MyForm.jsx';
import MyInput from '../MyInput/MyInput.jsx';
import Logo from '../Logo/Logo.jsx';
import { Link } from 'react-router-dom';
import useFormValidation from '../../hooks/useFormValidation.js';
function Register({ onSignUp }) {

    const { values, errors, isFormValid, handleChange } = useFormValidation();

    const handleInputChange = (event) => {
        handleChange(event)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onSignUp(values);
    }


    return (
        <section className='register'>
            <div className='register__form-container'>
                <Logo className={'register__logo'} />
                <MyForm props={
                    {
                        className: "register__form",
                        titleclassname: 'register__title',
                        titlevalue: 'Добро пожаловать!',
                        buttonclassname: `register__button ${!isFormValid ? 'register__button_unactive' : ''}`,
                        disabled: !isFormValid,
                        buttonvalue: 'Зарегистрироваться',
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
                            onChange: handleInputChange
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
                            onChange: handleInputChange
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
                            onChange: handleInputChange
                        }
                    } />
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
        </section>
    )
}

export default Register;