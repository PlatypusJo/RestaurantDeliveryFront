﻿import React, { useEffect, useState } from 'react' 
import './StyleDish.css'
import { categories } from '../CategorySelect/CategorySelect';
import { ingredients } from '../IngredientSelect/IngredientSelect';
import { EditOutlined, ShoppingCartOutlined, DeleteOutlined, EllipsisOutlined } from '@ant-design/icons';
import {
    Card,
    List,
    Button,
    Modal,
    Form,
    Input,
    InputNumber,
    Select,
    Tabs,
} from 'antd';
import Ingredient from '../Ingredient/Ingredient';
const { Meta } = Card;
const { Option } = Select;
/**
 * Компонент, отображающий страницу со списком блюд
 * @param {User} user авторизованный пользователь
 * @param {Dishes} dishes список DTO блюд
 * @param {Dishes} setDishes метод изменения списка DTO блюд
 * @param {Dish} removeDish метод удаления DTO блюда
 * @param {Dish} updateDish метод изменения DTO блюда
 * @returns Страница с меню ресторана, заполненная блюдами, с возможностью их редактирования и удаления (доступно только для админа)
 */
const DishDTO = ({ user, dishes, setDishes, removeDish, updateDish }) => {
    useEffect(() => {
        /**
         * Функция для обращения к swagger и получения списка DTO блюд из БД
         * */
        const getDishes = async () => {
            const requestOptions = { method: 'GET' }
            return await fetch("api/Dish/", requestOptions)
                .then(response => response.json())
                .then(
                    (data) => {
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
    
    const [dishId, setDishId] = useState(-1);
    const [dishName, setDishName] = useState("");
    const [dishGrammers, setDishGrammers] = useState(-1);
    const [categoryId, setCategoryId] = useState(-1);
    const [categoryName, setCategoryName] = useState("");
    const [dishCost, setDishCost] = useState(-1);
    const [dishImage, setDishImage] = useState("");
    const [dishIngredients, setDishIngredients] = useState([]);
    const [ingredientId, setIngredientId] = useState(-1);
    const [ingredientName, setIngredientName] = useState(-1);

    const [isModalDetailsOpen, setIsModalDetailsOpen] = useState(false);
    /**
     * Функция открытия модульного окна для просмотра подробной информации о блюде
     * @param {dishId} id id блюда для получения списка ингредиентов этого блюда
     * @param {dishName} name название блюда
     * @param {dishGrammers} grammers граммовка блюда
     * @param {dishCost} cost цена блюда
     * @param {categoryName} ctgName название категории блюда
     * @param {dishImage} image ссылка на изображение блюда
     */
    const showDetailsModal = (id, name, grammers, cost, ctgName, image) => {
        var d;
        d = dishes.filter((item) => item.dishId === id);
        //console.log(d = dishes.filter((item) => item.dishId === id));
        //console.log(d);
        //console.log(d[0].ingredientStringsDTO);
        setDishIngredients(d[0].ingredientStringsDTO);
        console.log(dishIngredients);
        setDishName(name);
        setDishGrammers(grammers);
        setDishCost(cost);
        setCategoryName(ctgName);
        setDishImage(image);
        setIsModalDetailsOpen(true);
    };
    /**
     * Функция закрытия модульного окна для просмотра информации о блюде
     * */
    const handleDetailsCancel = () => {
        setIsModalDetailsOpen(false);
    };


    const [deleteId, setDeleteId] = useState(-1);
    const [isModalRemoveOpen, setIsModalRemoveOpen] = useState(false);
    /**
     * Функция открытия модульного окна для подтверждения удаления
     * @param {dishId} val
     */
    const showRemoveModal = (val) => {
        setDeleteId(val);
        setIsModalRemoveOpen(true);
    };
    /**
     * Функция закрытия модульного окна для подтверждения удаления
     * */
    const handleRemoveCancel = () => {
        setDeleteId(-1);
        setIsModalRemoveOpen(false);
    };


    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    /**
     * Функция открытия модульного окна для изменения блюда 
     * @param {dishId} id id блюда
     * @param {dishName} name название блюда
     * @param {dishGrammers} grammers граммовка блюда
     * @param {dishCost} cost цена блюда
     * @param {categoryId} ctgId id категории блюда
     * @param {categoryName} ctgName название категории блюда
     * @param {dishImage} image ссылка на изображение блюда
     */
    const showUpdateModal = (id, name, grammers, cost, ctgId, ctgName, image) => {
        var d;
        d = dishes.filter((item) => item.dishId === id);
        setDishIngredients(d[0].ingredientStringsDTO);
        setDishId(id);
        setDishName(name);
        setDishGrammers(grammers);
        setDishCost(cost);
        setCategoryId(ctgId);
        setCategoryName(ctgName);
        setDishImage(image);
        setIsModalUpdateOpen(true);
    };
    /**
     * Функция закрытия модульного окна для изменения блюда
     * */
    const handleUpdateCancel = () => {
        setDishId(-1);
        setDishName("");
        setDishGrammers(-1);
        setDishCost(-1);
        setCategoryId(-1);
        setCategoryName("");
        setDishImage("");
        setIsModalUpdateOpen(false);
    }


    const [updateIngredientId, setUpdateIngredientId] = useState(-1);
    const [isModalIngredientUpdateOpen, setIsModalIngredientUpdateOpen] = useState(false);
    /**
     * Функция открытия модульного окна для изменения ингредиента блюда
     * @param {ingredientId} ingId 
     * @param {updateIngredientId} strId 
     */
    const showIngredientUpdateModal = (ingId, strId) => {
        setUpdateIngredientId(strId);
        setIngredientId(ingId);
        setIsModalIngredientUpdateOpen(true);
    };
    /**
     * Функция закрытия модульного окна для изменения ингредиента блюда
     * */
    const handleIngredientUpdateCancel = () => {
        setUpdateIngredientId(-1);
        setIsModalIngredientUpdateOpen(false);
    }


    const [deleteIngredientId, setDeleteIngredientId] = useState(-1);
    const [isModalIngredientRemoveOpen, setIsModalIngredientRemoveOpen] = useState(false);
    /**
     * Функция открытия модульного окна для подтверждения удаления
     * @param {deleteIngredientId} val id удаляемого ингредиента блюда
     */
    const showIngredientRemoveModal = (val) => {
        setDeleteIngredientId(val);
        setIsModalIngredientRemoveOpen(true);
    };
    /**
     * Функция закрытия модульного окна для подтверждения удаления
     * */
    const handleIngredientRemoveCancel = () => {
        setDeleteIngredientId(-1);
        setIsModalIngredientRemoveOpen(false);
    };


    const [isModalIngredientCreateOpen, setIsModalIngredientCreateOpen] = useState(false);
    /**
     * Функция открытия модульного окна для добавления ингредиента в блюдо
     * */
    const showIngredientCreateModal = () => {
        setIngredientId();
        setIsModalIngredientCreateOpen(true);
    };
    /**
     * Функция закрытие модульного окна для добавления ингредиента в блюдо
     * */
    const handleIngredientCreateCancel = () => {
        setIsModalIngredientCreateOpen(false);
    }

    /**
     * Функция для обращения к swagger и изменения блюда в БД
     * */
    const updateItem = async () => {
        setIsModalUpdateOpen(false);
        const dishDTO = {
            DishId: dishId,
            DishName: dishName,
            DishGrammers: dishGrammers,
            DishCost: dishCost,
            DishImage: dishImage,
            CategoryFk: categoryId,
            IngredientStringsDTO: dishIngredients,
        }
        console.log(dishDTO);
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dishDTO)
        }
        const response = await fetch(`api/Dish/${dishId}`, requestOptions);

        return await response.json()
            .then((data) => {
                console.log(data);
                if (response.ok) {
                    updateDish(data);
                }
                setDishId(-1);
                setDishName("");
                setDishGrammers(-1);
                setDishCost(-1);
                setCategoryId(-1);
                setCategoryName("");
                setDishImage("");
                setDishIngredients([]);
            }, (error) => console.log(error))
    }


    /**
     * Функция для обращения к swagger и удаления блюда из БД
     * @param {dishId} dishId id удаляемого блюда 
     */
    const deleteItem = async (dishId) => {
        setIsModalRemoveOpen(false);
        const requestOptions =
        {
            method: 'DELETE'
        }
        return await fetch(`api/Dish/${dishId}`, requestOptions)
            .then((response) => {
                if (response.ok) {
                    removeDish(dishId);
                }
            }, (error) => console.log(error))
    }


    // Обновление ингредиента в блюде
    /**
     * Функция изменения ингредиента
     * @param {updateIngredientId} stringId id изменяемого ингредиента блюда
     * @param {ingredientId} newIngId id нового ингредиента в строке ингредиента блюда
     */
    const updateIngredient = async (stringId, newIngId) => {
        setIsModalIngredientUpdateOpen(false);
        var ings = ingredients.filter((item) => item.ingredientId === ingredientId)
        var newIngName = ings[0].ingredientName;
        var d = [{ ingredientFk: -1, ingredientName: "", ingredientStringId: -1, dishFk: -1 }];
        for (let i = 0; i < dishIngredients.length; i++) {
            if (dishIngredients[i].ingredientStringId === stringId) {
                d[i].ingredientFk = newIngId;
                d[i].ingredientName = newIngName;
                d[i].ingredientStringId = dishIngredients[i].ingredientStringId;
                d[i].dishFk = dishIngredients[i].dishFk;
            }
            else {
                d.push({ ingredientFk: -1, ingredientName: "", ingredientStringId: -1, dishFk: -1 });
                console.log(d);
                d[i].ingredientFk = dishIngredients[i].ingredientFk;
                d[i].ingredientName = dishIngredients[i].ingredientName;
                d[i].ingredientStringId = dishIngredients[i].ingredientStringId;
                d[i].dishFk = dishIngredients[i].dishFk;
            }
        }
        setDishIngredients(d);
    }


    // Удаление ингредиента из блюда
    /**
     * Функция удаления ингредиента
     * @param {number} strId id ингредиента блюда
     */
    const deleteIngredient = async (strId) => {
        setIsModalIngredientRemoveOpen(false);
        setDishIngredients(dishIngredients.filter((item) => item.ingredientStringId !== strId));
    }


    // Добавление ингредиента в блюдо
    /**
     * Функция для обращения к swagger и создания нового ингредиента блюда в БД
     * @param {ingredientId} ingId id ингредиента блюда
     * @param {dishId} dishId id блюда
     */
    const createStringIngredient = async (ingId, dishId) => {
        setIsModalIngredientCreateOpen(false);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                DishFk: dishId,
                IngredientFk: ingId,
            })
        }
        const response = await fetch("api/IngredientString/", requestOptions)

        return await response.json()
            .then((data) => {
                console.log(data)
                // response.status === 201 && addBlog(data)
                if (response.ok) {
                    const requestOptions = { method: 'GET' }
                    return fetch("api/Dish/", requestOptions)
                        .then(response => response.json())
                        .then(
                            (data) => {
                                console.log('Data:', data)
                                setDishes(data)
                                var d;
                                d = data.filter((item) => item.dishId === dishId);
                                setDishIngredients([...dishIngredients, d[0].ingredientStringsDTO[d[0].ingredientStringsDTO.length - 1]]);
                            },
                            (error) => {
                                console.log(error)
                            }
                        )
                }

            }, (error) => console.log(error))
    }


    let tabItemsDish = [];
    tabItemsDish.push(
        {
            key: 0,
            label: "Все блюда",
            children:
                <React.Fragment>
                    <List className="list"
                        grid={{
                            gutter: 20,
                            xs: 1,
                            sm: 2,
                            md: 3,
                            lg: 4,
                            xl: 5,
                            xxl: 7,
                        }}
                        dataSource={dishes}
                        renderItem={(dish) => (
                            <List.Item className="listItem">
                                <Card
                                    key={dish.dishId}
                                    id={dish.dishId}
                                    className="card"
                                    hoverable
                                    cover={
                                        <img
                                            alt="Нет изображения"
                                            src={dish.dishImage}
                                        />
                                    }
                                    actions={user.userRole == "admin" ? (
                                        [
                                            <EllipsisOutlined onClick={() => showDetailsModal(
                                                dish.dishId, dish.dishName, dish.dishGrammers, dish.dishCost, dish.categoryName, dish.dishImage
                                            )} className="icon_standart" />,
                                            <EditOutlined onClick={() => showUpdateModal(
                                                dish.dishId, dish.dishName, dish.dishGrammers, dish.dishCost, dish.categoryFk, dish.categoryName, dish.dishImage
                                            )}
                                                className="icon_standart" key="edit" />,
                                            <DeleteOutlined onClick={() => showRemoveModal(dish.dishId)} className="icon_standart" key="bin" />,
                                        ]
                                    ) : (
                                        [
                                            <EllipsisOutlined onClick={() => showDetailsModal(
                                                dish.dishId, dish.dishName, dish.dishGrammers, dish.dishCost, dish.categoryName, dish.dishImage
                                            )} className="icon_standart" />,
                                            <ShoppingCartOutlined className="icon_standart" key="cart" />

                                        ]
                                    )}
                                >
                                    <Meta title={dish.dishName} />
                                    <div style={{ fontSize: "20px" }}>{dish.dishCost} руб.</div>
                                    <div>{dish.categoryName}</div>
                                </Card>
                            </List.Item>
                        )}
                    />
                </React.Fragment>
        });
    categories.map(({ categoryId, categoryName }) => {
        let dishesTabs = [];
        dishesTabs = dishes.filter((item) => item.categoryFk == categoryId);
        if (dishesTabs != 0) {
            tabItemsDish.push(
            {
                key: categoryId,
                label: categoryName,
                children:
                    <React.Fragment>
                    <List className="list"
                        grid={{
                            gutter: 20,
                            xs: 1,
                            sm: 2,
                            md: 3,
                            lg: 4,
                            xl: 5,
                            xxl: 7,
                        }}
                        dataSource={dishesTabs}
                        renderItem={(dish) => (
                            <List.Item className="listItem">
                                <Card
                                    key={dish.dishId}
                                    id={dish.dishId}
                                    className="card"
                                    hoverable
                                    cover={
                                        <img
                                            alt="Нет изображения"
                                            src={dish.dishImage}
                                        />
                                    }
                                    actions={user.userRole == "admin" ? (
                                        [
                                            <EllipsisOutlined onClick={() => showDetailsModal(
                                                dish.dishId, dish.dishName, dish.dishGrammers, dish.dishCost, dish.categoryName, dish.dishImage
                                            )} className="icon_standart" />,
                                            <EditOutlined onClick={() => showUpdateModal(
                                                dish.dishId, dish.dishName, dish.dishGrammers, dish.dishCost, dish.categoryFk, dish.categoryName, dish.dishImage
                                            )}
                                                className="icon_standart" key="edit" />,
                                            <DeleteOutlined onClick={() => showRemoveModal(dish.dishId)} className="icon_standart" key="bin" />,
                                        ]
                                    ) : (
                                        [
                                            <EllipsisOutlined onClick={() => showDetailsModal(
                                                dish.dishId, dish.dishName, dish.dishGrammers, dish.dishCost, dish.categoryName, dish.dishImage
                                            )} className="icon_standart" />,
                                            <ShoppingCartOutlined className="icon_standart" key="cart" />

                                        ]
                                    )}
                                >
                                    <Meta title={dish.dishName} />
                                    <div style={{ fontSize: "20px" }}>{dish.dishCost} руб.</div>
                                    <div>{dish.categoryName}</div>
                                </Card>
                            </List.Item>
                        )}
                    />
                </React.Fragment>
            })
        }
        
    })


    return (
        <React.Fragment>
            <h3>Меню ресторана</h3>

            <Tabs defaultActiveKey="0" items={tabItemsDish} />

            <Modal title="Подробная информация о блюде"
                onCancel={handleDetailsCancel}
                open={isModalDetailsOpen}
                footer={[
                    <Button type="primary" className="button" onClick={handleDetailsCancel}>
                    Закрыть
                </Button>]} >
                <>
                    
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
                    >
                        <br />
                        <Form.Item>
                                <img
                                alt="Нет изображения"
                                src={dishImage}
                                style={{
                                    width: "160%",
                                    height: "160%"
                                }}
                                />
                        </Form.Item>
                        <Form.Item disabled="true">
                            <span>Название: {dishName}</span>
                        </Form.Item>
                        <Form.Item disabled="true">
                            <span>Цена: {dishCost} руб.</span>
                        </Form.Item>
                        <Form.Item disabled="true">
                            <span>Граммовка: {dishGrammers} г.</span>
                        </Form.Item>
                        <Form.Item disabled="true">
                            <span>Категория: {categoryName}</span>
                        </Form.Item>
                        <Form.Item>
                            <span>Ингредиенты: </span>
                            {dishIngredients.map(({ dishFk, ingredientFk, ingredientName, ingredientStringId }) => (
                                <>
                                    
                                    <span>
                                         {ingredientName},
                                    </span>
                                        <span> </span>
                                    </>
                            ))}
                        </Form.Item>
                        
                    </Form>
                </>
            </Modal>

            <Modal
                title="Подтвердите действие!"
                open={isModalRemoveOpen}
                onOk={() => deleteItem(deleteId)}
                onCancel={handleRemoveCancel}
                footer={[
                    <Button type="primary" className="button" onClick={() => deleteItem(deleteId)}>
                        Да
                    </Button>,
                    <Button type="primary" className="button" onClick={handleRemoveCancel}>
                        Нет
                    </Button>
                ]}
            >
                <p>Вы уверены, что хотите удалить это блюдо из меню?</p>
            </Modal>

            <Modal
                title="Редактирование блюда"
                open={isModalUpdateOpen}
                onOk={() => updateItem()}
                onCancel={handleUpdateCancel}
                footer={[
                    <Button type="primary" className="button" onClick={updateItem}>
                        Сохранить изменения
                    </Button>,
                    <Button type="primary" className="button" onClick={handleUpdateCancel}>
                        Отменить
                    </Button>
                ]}
            >
                <>
                    <br />
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
                    >
                        <Form.Item
                            label="Название блюда"
                            labelCol={{
                                span: 6,
                            }}
                        >
                            <Input name="name" onInput={e => setDishName(e.target.value)} value={dishName} />
                        </Form.Item>
                        <Form.Item label="Граммовка"
                            labelCol={{
                                span: 6,
                            }}
                        >
                            <InputNumber style={{
                                width: '100%',
                            }}
                                min="1"
                                name="grammers"
                                onChange={setDishGrammers}
                                value={dishGrammers}
                            />
                        </Form.Item>
                        <Form.Item label="Цена"
                            labelCol={{
                                span: 6,
                            }}
                        >
                            <InputNumber style={{
                                width: '100%',
                            }}
                                min="1"
                                name="cost"
                                onChange={setDishCost}
                                value={dishCost}
                            />
                        </Form.Item>
                        <Form.Item label="Изображение"
                            labelCol={{
                                span: 6,
                            }}
                        >
                            <Input name="image" onInput={e => setDishImage(e.target.value)} value={dishImage} />
                        </Form.Item>
                        <Form.Item label="Категория"
                            labelCol={{
                                span: 6,
                            }}

                        >
                            <Select
                                style={{
                                    width: '100%',
                                }}
                                onChange={setCategoryId}
                                value={categoryId}
                            >
                                {categories.map(({ categoryId, categoryName }) => (
                                    <Option key={categoryId} value={categoryId}>{categoryName}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item label="Ингредиенты" labelCol={{
                            span: 6,
                        }}>
                            <Button onClick={() => showIngredientCreateModal()} style={{ marginLeft: "0%" }} className="button" type="primary" htmlType="submit">+</Button>
                            {dishIngredients.map(({ dishFk, ingredientFk, ingredientName, ingredientStringId }) => (
                                <>
                                    <div>
                                        {ingredientName}

                                    </div>
                                    <Button style={{ marginTop: "3%", marginLeft: "0%" }} onClick={() => showIngredientUpdateModal(ingredientFk, ingredientStringId)} className="button" type="primary">Изменить</Button>
                                    <Button style={{ marginTop: "3%", marginLeft: "5%" }} onClick={() => showIngredientRemoveModal(ingredientStringId)} className="button" type="primary" htmlType="submit">Удалить</Button>
                                </>
                            ))}
                        </Form.Item>
                    </Form>
                </>
            </Modal>

            <Modal
                title="Редактирование ингредиента"
                open={isModalIngredientUpdateOpen}
                onOk={() => updateIngredient(updateIngredientId, ingredientId)}
                onCancel={handleIngredientUpdateCancel}
                footer={[
                    <Button type="primary" className="button" onClick={() => updateIngredient(updateIngredientId, ingredientId)}>
                        Сохранить изменения
                    </Button>,
                    <Button type="primary" className="button" onClick={handleIngredientUpdateCancel}>
                        Отменить
                    </Button>
                ]}
            >
                <>
                    <br />
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
                    >
                        <Form.Item
                            label="Название ингредиента"
                            labelCol={{
                                span: 8,
                            }}
                        >
                            <Select
                                style={{
                                    width: '100%',
                                }}
                                onChange={setIngredientId}
                                value={ingredientId}
                            >
                                {ingredients.map(({ ingredientId, ingredientName }) => (
                                    <Option key={ingredientId} value={ingredientId}>{ingredientName}</Option>
                                ))}
                            </Select>
                            {/*<Input name="name" onInput={e => setIngredientName(e.target.value)} value={ingredientName} />*/}
                        </Form.Item>
                    </Form>
                </>
            </Modal>

            <Modal
                title="Добавление ингредиента"
                open={isModalIngredientCreateOpen}
                onOk={() => createStringIngredient(ingredientId, dishId)}
                onCancel={handleIngredientCreateCancel}
                footer={[
                    <Button type="primary" className="button" onClick={() => createStringIngredient(ingredientId, dishId)}>
                        Добавить
                    </Button>,
                    <Button type="primary" className="button" onClick={handleIngredientCreateCancel}>
                        Отменить
                    </Button>
                ]}
            >
                <>
                    <br />
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
                    >
                        <Form.Item
                            label="Название ингредиента"
                            labelCol={{
                                span: 8,
                            }}
                        >
                            <Select
                                style={{
                                    width: '100%',
                                }}
                                onChange={setIngredientId}
                                value={ingredientId}
                            >
                                {ingredients.map(({ ingredientId, ingredientName }) => (
                                    <Option key={ingredientId} value={ingredientId}>{ingredientName}</Option>
                                ))}
                            </Select>
                            {/*<Input name="name" onInput={e => setIngredientName(e.target.value)} value={ingredientName} />*/}
                        </Form.Item>
                    </Form>
                </>
            </Modal>

            <Modal
                title="Подтвердите действие!"
                open={isModalIngredientRemoveOpen}
                onOk={() => deleteIngredient(deleteIngredientId)}
                onCancel={handleIngredientRemoveCancel}
                footer={[
                    <Button type="primary" className="button" onClick={() => deleteIngredient(deleteIngredientId)}>
                        Да
                    </Button>,
                    <Button type="primary" className="button" onClick={handleIngredientRemoveCancel}>
                        Нет
                    </Button>
                ]}
            >
                <p>Вы уверены, что хотите удалить этот ингредиент из блюда?</p>
            </Modal>

        </React.Fragment>
    )
}
export default DishDTO