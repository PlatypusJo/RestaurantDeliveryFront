import React, { useEffect } from 'react' 
import './StyleDish.css'
const DishDTO = ({ user, dishes, setDishes, removeDish }) =>
{
    useEffect(() =>
    {
        const getDishes = async () =>
        {
            const requestOptions = { method: 'GET' }
            return await fetch("api/Dish/", requestOptions)
                .then(response => response.json())
                .then(
                    (data) => 
                    {
                        console.log('Data:', data)
                        setDishes(data)
                    },
                    (error) => {
                        console.log(error)
                    }
                )
        }
        getDishes()
    }, [setDishes])

    const deleteItem = async ({ dishId }) =>
    {
        const requestOptions =
        {
            method: 'DELETE'
        }
        return await fetch(`api/Dish/${dishId}`, requestOptions)
            .then((response) =>
            {
                if (response.ok)
                {
                    removeDish(dishId);
                }
            }, (error) => console.log(error))
    }

    return (
        <React.Fragment>
            <h3>Список блюд</h3>
            {dishes.map(
                (
                    {
                        dishId,
                        dishImage,
                        dishName,
                        dishGrammers,
                        dishCost,
                        categoryFk,
                        categoryName
                    }
                ) => (
                <div className="Dish" key={dishId} id={dishId} >
                        <strong >
                            {dishId}:
                            <img src={dishImage} alt="Нет изображения"></img> <br />
                            Название: {dishName} {user.isAuthenticated ? (<button onClick={(e) => deleteItem({ dishId })}>Удалить блюдо</button>) : ("")} <br />
                            Граммовка: {dishGrammers} <br />
                            Цена: {dishCost}<br />
                            Категория: {categoryName}<br />
                        </strong>
                </div>
            ))}
        </React.Fragment>
    )
}
export default DishDTO