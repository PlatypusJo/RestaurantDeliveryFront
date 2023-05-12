import React, { useState } from "react"
import { Outlet, Link } from "react-router-dom"
import "./StyleLayout.css"
import { Dropdown, Space, Button, Modal } from 'antd';
import { SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { Breadcrumb, Layout as LayoutAntd, Menu, theme } from 'antd';
const { Header, Content, Footer } = LayoutAntd;

let dropdownList;
let items;

/**
* Компонент, отображающий макет сайта
 * @param {User} user пользователь
 * @param {User} setUser метод изменения пользователя
 */
const Layout = ({ user, setUser }) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const [isModalOpen, setIsModalOpen] = useState(false);
    /**
     * Функция открытия модульного окна для выхода из аккаунта
     * */
    const showModal = () => {
        setIsModalOpen(true);
    };
    /**
     * Функция закрытия модульного окна для выхода из аккаунта
     * */
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    /**
     * Функция обращения к swagger, чтобы выйти из аккаунта
     * @param {any} event 
     */
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

    
    if (user.isAuthenticated)
    {
        dropdownList = [
            {
                label: <div>Настройки</div>,
                key: '1',
                icon: <SettingOutlined />,
            },
            {
                type: 'divider',
            },
            {
                label: <Link onClick={showModal}>Выход</Link>,
                key: "2",
            },
        ];
    }
    else
    {
        dropdownList = [
            {
                label: <Link to={"/register"}>Регистрация</Link>,
                key: "1",
            },
            {
                label: <Link to={"/login"}>Вход</Link>,
                key: "2",
            },
        ];
    }

    if (user.userRole == "admin") {
        items = [
            {
                label: <Link to={"/"}>Главная</Link>,
                key: "1",
            },
            {
                label: <Link to={"/dishes"}>Меню</Link>,
                key: "2",
            },
            {
                label: <Link to={"/ingredients"}>Ингредиенты</Link>,
                key: "3",
            },
            {
                label: <Link to={"/categories"}>Категории блюд</Link>,
                key: "4",
            },
            {
                label: <Link to={"/dishCreate"}>Добавление блюда</Link>,
                key: "5",
            },
            {
                label: <Link to={"/categoryCreate"}>Добавление категории</Link>,
                key: "6",
            },
            {
                label: <Link to={"/ingredientCreate"}>Добавление ингредиента</Link>,
                key: "7",
            },
            
        ];
    }
    else {
        items = [
            {
                label: <Link to={"/"}>Главная</Link>,
                key: "1",
            },
            {
                label: <Link to={"/dishes"}>Меню</Link>,
                key: "2",
            },
        ];
    }

    return (
        <>
        <LayoutAntd className="layout">
            <Header className="header">
                <div
                    className="logo"
                    style={{
                        color: "rgba(255, 255, 255, 0.65)",
                        float: "right",
                    }}
                >
                    {user.isAuthenticated ? (
                        <strong className="user">{user.userName}</strong>
                    ) : (
                        <strong className="user">Гость</strong>
                    )}
                    <Dropdown
                        menu={{
                            items: dropdownList,
                        }}
                        trigger={['click']}
                    >
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                <Avatar size={40} className="ava" style={{ backgroundColor: "#1FAB89", marginLeft: "15px", color: "white" }} shape="square" icon={<UserOutlined />} />
                            </Space>
                        </a>
                    </Dropdown>
                   
                </div>
                <Menu className="menu" theme="dark" mode="horizontal" items={items} defaultSelectedKeys={['1']} />
            </Header>
            <Content
                style={{
                    padding: '0 50px',
                }}
            >
                <div className="site-layout-content"
                    style={{ background: colorBgContainer }}>
                    <Outlet />
                </div>
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                }}
            >
                Restaurant Delivery ©2023 Created by Max Muravyov
            </Footer>
            </LayoutAntd>
            <Modal title="Выход из аккаунта" onOk={logOff} onCancel={handleCancel} open={isModalOpen} footer={[
                <Button onClick={logOff}>
                    Да
                </Button>,
                <Button onClick={handleCancel}>
                    Нет
                </Button>]} >
                <p>Вы действительно хотите выйти из аккаунта?</p>
            </Modal>
        </>
    );
};
export default Layout;

