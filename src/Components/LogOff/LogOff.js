import React from "react"
import { useNavigate } from "react-router-dom"
import { Button, Modal } from 'antd';
import { useState } from 'react';
const LogOff = ({ setUser }) => {
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const logOff = async (event) => {
        setIsModalOpen(false);
        event.preventDefault()
        const requestOptions =
        {
            method: "POST",
        }
        return await fetch("api/account/logoff", requestOptions)
            .then((response) => {
                if (response.status === 200) {
                    setUser({ isAuthenticated: false, userName: "" });
                }
                window.location.assign("/");
            })
    }
    return (<>
        <Button type="primary" onClick={showModal}>
            Выйти
        </Button>
        <Modal title="Выйти из аккаунта?" onOk={logOff} onCancel={handleCancel} open={isModalOpen} footer={[
            <Button onClick={logOff}>
                Да
            </Button>,
            <Button onClick={handleCancel}>
                Нет
            </Button>]} >
        </Modal>
    </>)
}
export default LogOff

//const LogOff = ({ setUser }) =>
//{
//    const navigate = useNavigate()
//    const logOff = async (event) =>
//    {
//        event.preventDefault()
//        const requestOptions =
//        {
//            method: "POST",
//        }
//        return await fetch("api/account/logoff", requestOptions)
//            .then((response) =>
//            {
//                response.status === 200 && setUser({ isAuthenticated: false, userName: "" })
//                response.status === 401 && navigate("/login")
//            })
//    }
//    return (
//        <>
//            <p></p>
//            <form onSubmit={logOff}>
//                <button type="submit">Выход</button>
//            </form>
//        </>
//    )
//}
//export default LogOff
