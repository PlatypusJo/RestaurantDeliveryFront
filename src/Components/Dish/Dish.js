import React, { useEffect, useState } from 'react' 
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
    Select
} from 'antd';
const { Meta } = Card;
const { Option } = Select;
const DishDTO = ({ user, dishes, setDishes, removeDish, updateDish }) =>
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

    const [dishId, setDishId] = useState(-1);
    const [dishName, setDishName] = useState("");
    const [dishGrammers, setDishGrammers] = useState(-1);
    const [categoryId, setCategoryId] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [dishCost, setDishCost] = useState(-1);
    const [dishImage, setDishImage] = useState("");

    const [isModalDetailsOpen, setIsModalDetailsOpen] = useState(false);
    const showDetailsModal = (name, grammers, cost, ctgName, image) => {
        setDishName(name);
        setDishGrammers(grammers);
        setDishCost(cost);
        setCategoryName(ctgName);
        setDishImage(image);
        setIsModalDetailsOpen(true);
    };
    const handleDetailsCancel = () => {
        setIsModalDetailsOpen(false);
    };

    const [deleteId, setDeleteId] = useState(-1); 
    const [isModalRemoveOpen, setIsModalRemoveOpen] = useState(false);
    const showRemoveModal = (val) => {
        setDeleteId(val);
        setIsModalRemoveOpen(true);
    };
    const handleRemoveCancel = () => {
        setDeleteId(-1);
        setIsModalRemoveOpen(false);
    };

    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const showUpdateModal = (id, name, grammers, cost, ctgId, ctgName, image) => {
        setDishId(id);
        setDishName(name);
        setDishGrammers(grammers);
        setDishCost(cost);
        setCategoryId(ctgId);
        setCategoryName(ctgName);
        setDishImage(image);
        setIsModalUpdateOpen(true);
    };
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

    const updateItem = async () => {
        setIsModalUpdateOpen(false);
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                DishId: dishId,
                DishName: dishName,
                DishGrammers: dishGrammers,
                DishCost: dishCost,
                DishImage: dishImage,
                CategoryFk: categoryId
            })
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
            }, (error) => console.log(error))
    }

    const deleteItem = async ( dishId ) =>
    {
        setIsModalRemoveOpen(false);
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
            <h3>Меню ресторана</h3>
            {/*<Button type="primary" className="button" hrmlType="submit" href="/dishCreate">+ Добавить блюдо</Button>*/}
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
                                        dish.dishName, dish.dishGrammers, dish.dishCost, dish.categoryName, dish.dishImage
                                    )} className="icon_standart"/>,
                                    <EditOutlined onClick={() => showUpdateModal(
                                        dish.dishId, dish.dishName, dish.dishGrammers, dish.dishCost, dish.categoryFk, dish.categoryName, dish.dishImage
                                    )}
                                        className="icon_standart" key="edit" />,
                                    <DeleteOutlined onClick={() => showRemoveModal(dish.dishId)} className="icon_standart" key="bin" />,
                                ]
                            ) : (
                                [
                                <EllipsisOutlined onClick={() => showDetailsModal(
                                dish.dishName, dish.dishGrammers, dish.dishCost, dish.categoryName, dish.dishImage
                                    )} className="icon_standart"/>,
                                <ShoppingCartOutlined className="icon_standart" key="cart" />

                            ]
                            )}
                        >
                            <Meta title={dish.dishName} />
                            <div style={{ fontSize:"20px" }}>{dish.dishCost} руб.</div>
                            <div>{dish.categoryName}</div>
                        </Card>
                    </List.Item>
                )}
            />

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
                    </Form>
                </>
            </Modal>

                {/*{dishes.map(({*/}
                {/*    dishId,*/}
                {/*    dishImage,*/}
                {/*    dishCost,*/}
                {/*    dishGrammers,*/}
                {/*    dishName,*/}
                {/*    categoryName,*/}
                {/*    categoryFk,*/}
                {/*}) => (<></>*/}
                {/*))}*/}
                {/*//<div className="Dish" key={dishId} id={dishId} >*/}
                {/*//        <strong >*/}
                {/*//            {dishId}:*/}
                {/*//            <img src={dishImage} alt="Нет изображения"></img> <br />*/}
                {/*//            Название: {dishName} {user.userRole == "admin" ? (<button onClick={(e) => deleteItem({ dishId })}>Удалить блюдо</button>) : ("")} <br />*/}
                {/*//            Граммовка: {dishGrammers} <br />*/}
                {/*//            Цена: {dishCost}<br />*/}
                {/*//            Категория: {categoryName}<br />*/}
                {/*//        </strong>*/}
                {/*//</div>*/}
        </React.Fragment>
    )
}
export default DishDTO