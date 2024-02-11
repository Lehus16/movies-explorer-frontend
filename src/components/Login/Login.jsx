import React from 'react'
import './Login.css'
import Logo from '../Logo/Logo';
import { Link } from 'react-router-dom';
import MyForm from '../MyForm/MyForm.jsx';
import MyInput from '../MyInput/MyInput.jsx';
import useFormValidation from '../../hooks/useFormValidation.js';


const Login = ({ onSignIn }) => {

    const { values, errors, isFormValid, handleChange } = useFormValidation();

    const handleSubmit = (event) => {
        event.preventDefault();
        onSignIn(values)
    }

    const handleInputChange = (event) => {
        handleChange(event)
    }
    return (
        <section className="login">
            <div className='login__form-container'>
                <Logo className={"login__logo"} />
                <MyForm props={{
                    className: "login__form",
                    titleclassname: "login__title",
                    buttonclassname: `login__button ${!isFormValid ? "login__button_unactive" : ""}`,
                    buttonvalue: "Войти",
                    titlevalue: "Рады видеть!",
                    disabled: !isFormValid,
                    onSubmit: handleSubmit
                }}>
                    <MyInput props={
                        {
                            className: `login__input ${errors.email ? "login__input_type_error" : ""}`,
                            placeholder: "",
                            type: "email",
                            name: "email",
                            onChange: handleInputChange,
                            value: values.email || "",
                            spanclassname: "login__validation-text",
                            spanvalue: errors.email,
                            labelclassname: "login__label",
                            labelvalue: "E-mail",
                            required: true,
                            autoComplete: "off"
                        }
                    } />
                    <MyInput props={
                        {
                            className: `login__input ${errors.password ? "login__input_type_error" : ""}`,
                            type: "password",
                            name: "password",
                            onChange: handleInputChange,
                            value: values.password || "",
                            placeholder: "",
                            spanclassname: "login__validation-text",
                            spanvalue: errors.password,
                            labelclassname: "login__label",
                            labelvalue: "Пароль",
                            required: true,
                            autoComplete: "off"
                        }
                    } />
                </MyForm>
                <div className="login__link-container">
                    <p className="login__link-text">
                        Ещё не зарегистрированы?
                    </p>
                    <Link to="/signup" className="login__link">
                        Регистрация
                    </Link>
                </div>
            </div>

        </section>
    )
}

export default Login;