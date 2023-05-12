import React, { useState } from 'react';
import { categories } from '../CategorySelect/CategorySelect';
import { ingredients } from '../IngredientSelect/IngredientSelect';
import {
    Button,
    Form,
    Input,
    InputNumber,
    Select,
} from 'antd';
import { useEffect } from 'react';
const { Option } = Select;

/**
 * Компонент, отображающий страницу создания блюда
 * @param {User} user авторизованный пользователь
 * @param {DishDTO} addDish метод добавления нового блюда в список блюд
 * @returns Страница создания блюда
 */
const DishCreate = ({ user, addDish }) => {

    const [dishName, setDishName] = useState("");
    const [dishGrammers, setDishGrammers] = useState(100);
    const [dishCost, setDishCost] = useState(100);
    const [dishImage, setDishImage] = useState("");
    const [categoryId, setCategoryId] = useState(-1);

    const handleSubmit = (e) => {
        
        e.preventDefault()
        /**
         * Функция для обращения к swagger и создания нового блюда в БД
         * @returns ответ в json формате или ошибка в случае неудачного выполнения запроса
         * */
        const createDish = async () => {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    DishName: dishName,
                    DishGrammers: dishGrammers,
                    DishCost: dishCost,
                    DishImage: dishImage,
                    CategoryFk: categoryId
                })
            }
            const response = await fetch("api/Dish/", requestOptions)
            
            return await response.json()
                .then((data) => {
                    console.log(data)
                    // response.status === 201 && addBlog(data)
                    if (response.ok) {
                        addDish(data);
                        e.target.elements.dishName.value = ""
                    }
                    
                }, (error) => console.log(error))
        }
        createDish()
    }
    return (
        <React.Fragment>
            {user.userRole == "admin" ? (
                <>
                    <h3>Добавление нового блюда</h3>
                    <Form
                        labelCol={{
                            span: 4,
                        }}
                        wrapperCol={{
                            span: 14,
                        }}
                        layout="horizontal"
                        style={{
                            maxWidth: 600,
                        }}
                        onSubmit={handleSubmit}
                    >
                        <Form.Item
                            label="Название блюда"
                            labelCol={{
                                span: 5,
                            }}
                        >
                            <Input name="name" onInput={e => setDishName(e.target.value)} />
                        </Form.Item>
                        <Form.Item label="Граммовка"
                            labelCol={{
                                span: 5,
                            }}
                        >
                            <InputNumber style={{
                                width: '100%',
                            }}
                                min="1"
                                name="grammers"
                                onChange={setDishGrammers}
                                defaultValue={100}
                            />
                        </Form.Item>
                        <Form.Item label="Цена"
                            labelCol={{
                                span: 5,
                            }}
                        >
                            <InputNumber style={{
                                width: '100%',
                            }}
                                min="1"
                                name="cost"
                                onChange={setDishCost}
                                defaultValue={100}
                            />
                        </Form.Item>
                        <Form.Item label="Изображение"
                            labelCol={{
                                span: 5,
                            }}
                        >
                            <Input name="image" onInput={e => setDishImage(e.target.value)} />
                        </Form.Item>
                        <Form.Item label="Категория"
                            labelCol={{
                                span: 5,
                            }}

                        >
                            <Select
                                style={{
                                    width: '100%',
                                }}
                                onChange={setCategoryId}
                            >
                                {categories.map(({ categoryId, categoryName }) => (
                                    <Option key={categoryId} value={categoryId}>{categoryName}</Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item wrapperCol={{
                            offset: 5,
                            span: 16,
                        }}
                        >
                            <Button className="button" onClick={handleSubmit} type="primary" htmlType="submit">Добавить</Button>
                        </Form.Item>
                    </Form>
                </>) : ("")
            }
        </React.Fragment >
    )
}
export default DishCreate