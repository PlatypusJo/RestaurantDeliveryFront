import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Form, Input } from 'antd';
import "./StyleRegister.css"

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
                if (response.status === 200) {
                    setUser({ isAuthenticated: true, userName: "" });
                    window.location.assign("/");
                }
                return response.json()
            })
            .then(
                (data) => {
                    console.log("Data:", data)
                    if (typeof data !== "undefined" &&
                        typeof data.userName !== "undefined")
                    {
                        setUser({ isAuthenticated: true, userName: data.userName })
                        window.location.assign("/")
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
                    <Form
                        name="basic"
                        labelCol={{
                            span: 8,
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
                    >
                        <Form.Item
                            label="Ваша электронная почта"
                            rules={[
                                {
                                    required: true,
                                    message: 'Пожалуйста, введите свою почту!',
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
                            label="Повторите пароль"
                            rules={[
                                {
                                    required: true,
                                    message: 'Пожалуйста, введите пароль!',
                                },
                            ]}
                        >
                            <Input.Password name="passwordConfirm" />
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button className="button" onClick={Register} type="primary" htmlType="submit">
                                Зарегистрироваться
                            </Button>
                        </Form.Item>
                    </Form>
                    {renderErrorMessage()}
                </>
            )}
        </>
    )
}
export default Register
