import React, { useEffect } from 'react' 
import './StyleDish.css'
import { EditOutlined, ShoppingCartOutlined, DeleteOutlined } from '@ant-design/icons';
import { Card } from 'antd';
const { Meta } = Card;
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

    var icons;
    if (user.userRole == "admin") {
        icons = [
            <EditOutlined className="icon_standart" key="edit" />,
            <DeleteOutlined className="icon_standart" key="bin" />,
        ]
    }
    else {
        icons = [
            <ShoppingCartOutlined className="icon_standart" key="cart" />
        ]
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
                    <Card
                        className="card"
                        hoverable
                        cover={
                            <img
                                alt="Нет изображения"
                                src={dishImage}
                            />
                        }
                        actions={icons}
                    >
                        <Meta title="Название:" />
                        <div>{dishName}</div>
                        <Meta title="Граммовка:" />
                        <div>{dishGrammers}</div>
                        <Meta title="Цена:" />
                        <div>{dishCost}</div>
                        <Meta title="Категория:" />
                        <div>{categoryName}</div>
                    </Card>
                //<div className="Dish" key={dishId} id={dishId} >
                //        <strong >
                //            {dishId}:
                //            <img src={dishImage} alt="Нет изображения"></img> <br />
                //            Название: {dishName} {user.userRole == "admin" ? (<button onClick={(e) => deleteItem({ dishId })}>Удалить блюдо</button>) : ("")} <br />
                //            Граммовка: {dishGrammers} <br />
                //            Цена: {dishCost}<br />
                //            Категория: {categoryName}<br />
                //        </strong>
                //</div>
            ))}
        </React.Fragment>
    )
}
export default DishDTO