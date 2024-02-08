import { useCallback, useState } from "react";
import { regExEmail, regExPassword } from "../utils/regExConstants";
const useFormValidation = () => {

    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isFormValid, setisFormValid] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'name') {
            if (event.target.value === '') {
                event.target.setCustomValidity('Обязательное для заполнения поле');
            } else if (event.target.value.length < 2) {
                event.target.setCustomValidity('Имя должно содержать не менее 2 букв');
            } else if (event.target.value.length > 30) {
                event.target.setCustomValidity('Имя должно содержать не более 30 букв');
            } else {
                event.target.setCustomValidity('');
            }
        } else if (name === 'email') {
            if (value === '') {
                event.target.setCustomValidity('Обязательное для заполнения поле');
            } else if (!regExEmail.test(value)) {
                event.target.setCustomValidity('Введите корректный адрес электронной почты');
            } else {
                event.target.setCustomValidity('');
            }
        } else if (name === 'password') {
            if (value === '') {
                event.target.setCustomValidity('Обязательное для заполнения поле');
            } else if (!regExPassword.test(value)) {
                event.target.setCustomValidity('Пароль должен состоять из минимум 8-ми символов, содержать буквы и цифры');
            } else {
                event.target.setCustomValidity('');
            }

        } else {
            event.target.setCustomValidity('');
        }
        setValues({ ...values, [name]: value });
        setErrors({ ...errors, [name]: event.target.validationMessage });
        const form = event.target.closest('form');
        setisFormValid(form ? form.checkValidity() : false);
    }

    const resetFormValues = useCallback(() => {
        setValues({});
        setErrors({});
        setisFormValid(false);
    }, [setValues, setErrors, setisFormValid]);


    return {
        values,
        errors,
        isFormValid,
        handleChange,
        resetFormValues
    }
}
export default useFormValidation;