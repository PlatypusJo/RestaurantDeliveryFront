import React, { useState } from "react"
import { Outlet, Link } from "react-router-dom"
import "./StyleLayout.css"
import { Dropdown, Space, Button, Modal } from 'antd';
import { SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { Breadcrumb, Layout as LayoutAntd, Menu, theme } from 'antd';
const { Header, Content, Footer } = LayoutAntd;

const items = [
    {
        label: <Link to={"/"}>Главная</Link>,
        key: "1",
    },
    {
        label: <Link to={"/dishes"}>Меню</Link>,
        key: "2",
    },
];

const Layout = ({ user, setUser }) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

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

    var dropdownList;
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
                {/*<Breadcrumb*/}
                {/*    style={{*/}
                {/*        margin: '16px 0',*/}
                {/*    }}*/}
                {/*>*/}
                {/*    <Breadcrumb.Item>Главная</Breadcrumb.Item>*/}
                {/*    <Breadcrumb.Item>Регистрация</Breadcrumb.Item>*/}
                {/*    <Breadcrumb.Item>Блюда</Breadcrumb.Item>*/}
                {/*    <Breadcrumb.Item>Вход</Breadcrumb.Item>*/}
                {/*    <Breadcrumb.Item>Выход</Breadcrumb.Item>*/}
                {/*</Breadcrumb>*/}
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

//const Layout = ({ user }) => {
//    return (
//        <>
//            <div>
//                {user.isAuthenticated ? (
//                    <h4>Пользователь: {user.userName}</h4>
//                ) : (
//                    <h4>Пользователь: Гость</h4>
//                )}
//            </div>
//            <nav>
//                <Link to="/">Главная</Link> <span> </span>
//                <Link to="/register">Регистрация</Link> <span> </span>
//                <Link to="/dishes">Блюда</Link> <span> </span>
//                <Link to="/login">Вход</Link> <span> </span>
//                <Link to="/logoff">Выход</Link>
//            </nav>
//            <Outlet />
//        </>
//    )
//}
//export default Layout
