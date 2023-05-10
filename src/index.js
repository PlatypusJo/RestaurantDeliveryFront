import React, { useState, useEffect } from 'react'
import ReactDOM from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import DishDTO from './Components/Dish/Dish'
import DishCreate from './Components/DishCreate/DishCreate'
import Category from './Components/Category/Category'
import CategorySelect from './Components/CategorySelect/CategorySelect'
import CategoryCreate from './Components/CategoryCreate/CategoryCreate'
import Ingredient from './Components/Ingredient/Ingredient'
import IngredientSelect from './Components/IngredientSelect/IngredientSelect'
import IngredientCreate from './Components/IngredientCreate/IngredientCreate'
import Layout from "./Components/Layout/Layout"
import LogIn from "./Components/LogIn/LogIn"
import LogOff from "./Components/LogOff/LogOff"
import Register from "./Components/Register/Register"

const App = () =>
{
    const [ingredients, setIngredients] = useState([])
    const addIngredient = (ingredient) => setIngredients([...ingredients, ingredient]);
    const updateIngredient = (newIngredients) => setIngredients(newIngredients);
    const removeIngredient = (removeId) => setIngredients(ingredients.filter(({ ingredientId }) => ingredientId
        !== removeId));

    const [categories, setCategories] = useState([])
    const addCategory = (category) => setCategories([...categories, category]);
    const updateCategory = (newCategories) => setCategories(newCategories);
    const removeCategory = (removeId) => setCategories(categories.filter(({ categoryId }) => categoryId
        !== removeId));

    const [dishes, setDishes] = useState([])
    const addDish = (dish) => setDishes([...dishes, dish]);
    const updateDish = (newDishes) => setDishes(newDishes);
    const removeDish = (removeId) => setDishes(dishes.filter(({ dishId }) => dishId
        !== removeId));
    const [user, setUser] = useState({ isAuthenticated: false, userName: "", userRole: "" })
    useEffect(() =>
    {
        const getUser = async () =>
        {
            return await fetch("api/account/isauthenticated")
                .then((response) =>
                {
                    response.status === 401 && setUser({ isAuthenticated: false, userName: "", userRole: "" })
                    return response.json()
                })
                .then((data) =>
                {
                    if (
                        typeof data !== "undefined" &&
                        typeof data.userName !== "undefined" &&
                        typeof data.userRole !== "undefined"
                    )
                    {
                        setUser({ isAuthenticated: true, userName: data.userName, userRole: data.userRole })
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
                <Route path="/" element={<Layout user={user} setUser={setUser} />}>
                    <Route index element={<h3>Main page</h3>} />
                    <Route
                        path="/dishes"
                        element=
                        {
                            <div>
                                <IngredientSelect />
                                <CategorySelect />
                                {/*<DishCreate*/}
                                {/*    user={user}*/}
                                {/*    addDish={addDish}*/}
                                {/*/>*/}
                                <DishDTO
                                    user={user}
                                    dishes={dishes}
                                    setDishes={setDishes}
                                    removeDish={removeDish}
                                    updateDish={updateDish}
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
                    <Route
                        path="/ingredients"
                        element=
                        {
                            <div>
                                <Ingredient
                                    user={user}
                                    ingredients={ingredients}
                                    setIngredients={setIngredients}
                                    removeIngredient={removeIngredient}
                                    updateIngredient={updateIngredient}
                                    />
                            </div>
                        }
                    />
                    <Route
                        path="/categories"
                        element=
                        {
                            <div>
                                <Category
                                    user={user}
                                    categoriesList={categories}
                                    setCategories={setCategories}
                                    removeCategory={removeCategory}
                                    updateCategory={updateCategory}
                                />
                            </div>
                        }
                    />
                    <Route
                        path="/dishCreate"
                        element=
                        {
                            <div>
                                <IngredientSelect/>
                                <CategorySelect />
                                <DishCreate user={user} addDish={addDish} />
                            </div>}
                    />
                    <Route
                        path="/categoryCreate"
                        element={
                            <CategoryCreate user={user} addCategory={addCategory} />
                        }
                    />
                    <Route
                        path="/ingredientCreate"
                        element={
                            <IngredientCreate user={user} addIngredient={addIngredient} />
                        }
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
