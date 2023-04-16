import React from "react"
import { Outlet, Link } from "react-router-dom"
import "./StyleLayout.css"
import { Breadcrumb, Layout as LayoutAntd, Menu, theme } from 'antd';
const { Header, Content, Footer } = LayoutAntd;

const items = [
    {
        label: <Link to={"/"}>Главная</Link>,
        key: "1",
    },
    {
        label: <Link to={"/register"}>Регистрация</Link>,
        key: "2",
    },
    {
        label: <Link to={"/dishes"}>Блюда</Link>,
        key: "3",
    },
    {
        label: <Link to={"/login"}>Вход</Link>,
        key: "4",
    },
    {
        label: <Link to={"/logoff"}>Выход</Link>,
        key: "5",
    },
]

const Layout = ({ user }) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <LayoutAntd className="layout">
            <Header>
                <div
                    className="logo"
                    style={{
                        color: "rgba(255, 255, 255, 0.65)",
                        float: "right",
                    }}
                >
                    {user.isAuthenticated ? (
                        <strong>{user.userName}</strong>
                    ) : (
                        <strong>Гость</strong>
                    )}
                </div>
                <Menu theme="dark" mode="horizontal" items={items} defaultSelectedKeys={['3']} />
            </Header>
            <Content
                style={{
                    padding: '0 50px',
                }}
            >
                <Breadcrumb
                    style={{
                        margin: '16px 0',
                    }}
                >
                    <Breadcrumb.Item>Главная</Breadcrumb.Item>
                    <Breadcrumb.Item>Регистрация</Breadcrumb.Item>
                    <Breadcrumb.Item>Блюда</Breadcrumb.Item>
                    <Breadcrumb.Item>Вход</Breadcrumb.Item>
                    <Breadcrumb.Item>Выход</Breadcrumb.Item>
                </Breadcrumb>
                <Outlet />
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                }}
            >
                Ant Design ©2023 Created by Ant UED
            </Footer>
        </LayoutAntd>
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
