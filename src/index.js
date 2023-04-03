import React, { useState, useEffect } from 'react'
import ReactDOM from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import DishDTO from './Components/Dish/Dish'
import DishCreate from './Components/DishCreate/DishCreate'
import Category from './Components/Category/Category'
import Layout from "./Components/Layout/Layout"
import LogIn from "./Components/LogIn/LogIn"
import LogOff from "./Components/LogOff/LogOff"
import Register from "./Components/Register/Register"
const App = () =>
{
    const [dishes, setDishes] = useState([])
    const addDish = (dish) => setDishes([...dishes, dish])
    const removeDish = (removeId) => setDishes(dishes.filter(({ dishId }) => dishId
        !== removeId));
    const [user, setUser] = useState({ isAuthenticated: false, userName: "" })
    useEffect(() =>
    {
        const getUser = async () =>
        {
            return await fetch("api/account/isauthenticated")
                .then((response) =>
                {
                    response.status === 401 && setUser({ isAuthenticated: false, userName: "" })
                    return response.json()
                })
                .then((data) =>
                {
                    if (
                        typeof data !== "undefined" &&
                        typeof data.userName !== "undefined"
                    )
                    {
                        setUser({ isAuthenticated: true, userName: data.userName })
                    }
                },
                (error) =>
                {
                    console.log(error)
                })
        }
        getUser()
    }, [setUser])
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout user={user} />}>
                    <Route index element={<h3>Main page</h3>} />
                    <Route
                        path="/dishes"
                        element=
                        {
                            <div>
                                <Category />
                                <DishCreate
                                    user={user}
                                    addDish={addDish}
                                />
                                <DishDTO
                                    user={user}
                                    dishes={dishes}
                                    setDishes={setDishes}
                                    removeDish={removeDish}
                                />
                            </div>
                        }
                    />
                    <Route
                        path="/login"
                        element={<LogIn user={user} setUser={setUser} />}
                    />
                    <Route path="/logoff" element={<LogOff setUser={setUser} />} />
                    <Route
                        path="/register"
                        element={<Register user={user} setUser={setUser} />}
                    />
                    <Route path="*" element={<h3>400</h3> }/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    // <React.StrictMode>
    <App />
    // </React.StrictMode>
)

//import React, { useState } from 'react'
//import ReactDOM from "react-dom/client"
//import DishDTO from './Components/Dish/Dish'
//import DishCreate from './Components/DishCreate/DishCreate'
//import Category from './Components/Category/Category'
//const App = () => {
//    const [dishes, setDishes] = useState([])
//    const addDish = (dish) => setDishes([...dishes, dish])
//    const removeDish = (removeId) => setDishes(dishes.filter(({ dishId }) => dishId
//        !== removeId));
//    return (
//        <div>
//            <Category />
//            <DishCreate
//                addDish={addDish}
//            />
//            <DishDTO
//                dishes={dishes}
//                setDishes={setDishes}
//                removeDish={removeDish}
//            />
//        </div>
//    )
//}
//const root = ReactDOM.createRoot(document.getElementById("root"))
//root.render(
//    // <React.StrictMode>
//    <App />
//    // </React.StrictMode>
//)
