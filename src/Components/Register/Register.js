import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
const Register = ({ user, setUser }) => {
    const [errorMessages, setErrorMessages] = useState([])
    const navigate = useNavigate()
    const Register = async (event) => {
        event.preventDefault()
        var { email, password, passwordConfirm } = document.forms[0]
        // console.log(email.value, password.value)
        const requestOptions =
        {
            method: "POST",

            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: email.value,
                password: password.value,
                passwordConfirm: passwordConfirm.value
            }),
        }
        return await fetch("api/account/register", requestOptions)
            .then((response) => {
                var { email } = document.forms[0];
                // console.log(response.status)
                response.status === 200 &&
                    setUser({ isAuthenticated: true, userName: email.value })
                return response.json()
            })
            .then(
                (data) => {
                    console.log("Data:", data)
                    if (typeof data !== "undefined" &&
                        typeof data.userName !== "undefined")
                    {
                        setUser({ isAuthenticated: true, userName: data.userName })
                        navigate("/")
                    }
                    typeof data !== "undefined" && typeof data.error !== "undefined" && setErrorMessages(data.error)
                },
                (error) => {
                    console.log(error)
                }
            )
    }
    const renderErrorMessage = () => errorMessages.map((error, index) => <div key={index}>{error}</div>)
    return (
        <>
            {user.isAuthenticated ? (
                <h3>Пользователь {user.userName} зарегистрирован в системе</h3>
            ) : (
                <>
                        <h3>Регистрация</h3>
                        <form onSubmit={Register}>
                        <label>Ваша электронная почта </label>
                        <input type="text" name="email" placeholder="Логин" />
                        <br />
                        <label>Введите пароль </label>
                        <input type="text" name="password" placeholder="Пароль" />
                        <br />
                        <label>Подтвердите пароль </label>
                        <input type="text" name="passwordConfirm" placeholder="Пароль" />
                        <br />
                        <button type="submit">Зарегистрироваться</button>
                    </form>
                    {renderErrorMessage()}
                </>
            )}
        </>
    )
}
export default Register
