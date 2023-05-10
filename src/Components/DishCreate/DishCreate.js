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

//const CreateOption = () => {
//    return (
//        <React.Fragment>
//            <select name="CategoryId">
//                {/*<option key="-1">Категория блюда:</option>*/}
//                {categories.map(({ categoryId, categoryName }) => (
//                    <option key={categoryId} value={categoryId}>{categoryName}</option>
//                ))}
//            </select>
//        </React.Fragment>
//    );
//};

const DishCreate = ({ user, addDish }) => {

    const [dishName, setDishName] = useState("");
    const [dishGrammers, setDishGrammers] = useState(100);
    const [dishCost, setDishCost] = useState(100);
    const [dishImage, setDishImage] = useState("");
    const [categoryId, setCategoryId] = useState(-1);

    const handleSubmit = (e) => {
        
        e.preventDefault()
        //var { name, grammers, cost, image } = document.forms[0]
        //const name = e.target.elements.DishName.value
        //const grammers = e.target.elements.DishGrammers.value
        //const  cost  = e.target.elements.DishCost.value
        //const image = e.target.elements.DishImage.value
        //const categoryId = e.target.elements.CategoryId.value
        ////const category =
        ////{
        ////    CategoryName: categoryName
        ////}
        //const dishDTO =
        //{
        //    DishName: name,
        //    DishGrammers: grammers,
        //    DishCost: cost,
        //    DishImage: image,
        //    CategoryFk: categoryId
        //}
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
                        setDishName("");
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
                    {/*<form onSubmit={handleSubmit}>*/}
                    {/*<input type="text" name="DishName" placeholder="Название блюда:" /><br/>*/}
                    {/*<input type="text" name="DishGrammers" placeholder="Грамовка:" /><br />*/}
                    {/*<input type="number" min="0" name="DishCost" placeholder="Цена:" /><br />*/}
                    {/*<input type="text" name="DishImage" placeholder="Изображение:" /><br />*/}
                    {/*<CreateOption /><br />*/}
                    {/*<button type="submit">Добавить</button> <br />*/}
                    {/*</form>*/}
                </>) : ("")
            }
        </React.Fragment >
    )
}
export default DishCreate