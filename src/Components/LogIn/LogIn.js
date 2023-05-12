import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Checkbox, Form, Input } from 'antd';

/**
 * Компонент, отображающий страницу входа в аккаунт
 * @param {User} user пользователь
 * @param {User} setUser метод изменения пользователя
 */
const LogIn = ({ user, setUser }) => {
    const [errorMessages, setErrorMessages] = useState([])
    const navigate = useNavigate()
    /**
    * Функция обращения к swagger для входа в аккаунт
     * @param {any} event
     */
    const logIn = async (event) => {
        event.preventDefault()
        var { email, password, remember } = document.forms[0]
        // console.log(email.value, password.value)
        const requestOptions =
        {
            method: "POST",

            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: email.value,
                password: password.value,
                rememberMe: remember.checked,
            }),
        }
        return await fetch("api/account/login", requestOptions)
            .then((response) => {
                // console.log(response.status)
                response.status === 200 &&
                    setUser({ isAuthenticated: true, userName: "", userRole: "" })
                return response.json()
            })
            .then(
                (data) => {
                    console.log("Data:", data)
                    if (
                        typeof data !== "undefined" &&
                        typeof data.userName !== "undefined" &&
                        typeof data.userRole !== "undefined"
                    ) {
                        setUser({ isAuthenticated: true, userName: data.userName, userRole: data.userRole })
                        window.location.assign("/")
                    }
                    typeof data !== "undefined" &&
                        typeof data.error !== "undefined" &&
                        setErrorMessages(data.error)
                },
                (error) => {
                    console.log(error)
                }
            )
    }
    /**
     * 
     * */
    const renderErrorMessage = () => errorMessages.map((error, index) => <div key={index}>{error}</div>)
    return (
        <>
            {user.isAuthenticated ? (
                <h3>Пользователь {user.userName} успешно вошел в систему</h3>
            ) : (<Form
            name="basic"
            labelCol={{
                span: 5,
            }}
            wrapperCol={{
                span: 16,
            }}
            style={{
                maxWidth: 600,
            }}
            initialValues={{
                remember: true,
            }}
            autoComplete="off"
            onSubmit={logIn}
        >
            <Form.Item
                label="Email"
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста, введите email!',
                    },
                ]}
            >
                <Input name="email" />
            </Form.Item>

            <Form.Item
                label="Пароль"
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста, введите пароль!',
                    },
                ]}
            >
                <Input.Password name="password" />
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 5,
                    span: 16,
                }}
            >
                <Checkbox name="remember">Запомнить меня</Checkbox>
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 5,
                    span: 16,
                }}
            >
                <Button className="button" onClick={logIn} type="primary" htmlType="submit">
                    Войти
                </Button>
            </Form.Item>
            </Form>)}
            {renderErrorMessage()}
        </>
    );
}
export default LogIn;


