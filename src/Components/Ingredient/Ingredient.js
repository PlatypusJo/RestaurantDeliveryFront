import React, { useEffect, useState } from 'react'
import {
    Card,
    List,
    Button,
    Modal,
    Form,
    Input,
} from 'antd';

/**
* Компонент, отображающий страницу со списком категорий блюд
 * @param {User} user авторизованный пользователь
 * @param {ingredients} ingredients список ингредиентов
 * @param {ingredients} setIngredients метод изменения списка ингредиентов
 * @param {ingredient} removeIngredient метод удаления ингредиента
 * @param {ingredient} updateIngredient метод изменения ингредиента блюд
 * @returns Страница ингредиентов, заполненная ингредиентами, с возможностью их редактирования и удаления и доступная только для администратора
 */
const Ingredient = ({ user, ingredients, setIngredients, removeIngredient, updateIngredient }) =>
{

    useEffect(() => {
        /**
         * Функция для обращения к swagger и получения списка ингредиентов из БД
         * */
        const getIngredients = async () => {
            const requestOptions = {
                method: 'GET'
            }
            return await fetch("api/Ingredient/", requestOptions)

                .then(response => response.json())
                .then((data) => {
                    console.log('Data:', data);
                    setIngredients(data)
                },
                    (error) => {
                        console.log(error)
                    }
                )
        }
        getIngredients()
    }, [setIngredients])

    const [ingredientId, setIngredientId] = useState(-1);
    const [ingredientName, setIngredientName] = useState("");

    const [deleteId, setDeleteId] = useState(-1);
    const [isModalRemoveOpen, setIsModalRemoveOpen] = useState(false);
    /**
     * Функция открытия модульного окна для подтверждения удаления
     * @param {ingredientId} val id удаляемого ингредиента
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
     * Функция открытия модульного окна для изменения ингредиента 
     * @param {ingredientId} id id изменяемого ингредиента
     * @param {ingredientName} name название изменяемого ингредиента
     */
    const showUpdateModal = (id, name) => {
        setIngredientId(id);
        setIngredientName(name);
        setIsModalUpdateOpen(true);
    };
    /**
     * Функция закрытия модульного окна для изменения ингредиента
     * */
    const handleUpdateCancel = () => {
        setIngredientId(-1);
        setIngredientName("");
        setIsModalUpdateOpen(false);
    }

    /**
     * Функция для обращения к swagger и изменения ингредиента в БД
     * */
    const updateItem = async () => {
        setIsModalUpdateOpen(false);
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                IngredientId: ingredientId,
                IngredientName: ingredientName,
            })
        }
        const response = await fetch(`api/Ingredient/${ingredientId}`, requestOptions);

        return await response.json()
            .then((data) => {
                console.log(data);
                if (response.ok) {
                    updateIngredient(data);
                }
                setIngredientId(-1);
                setIngredientName("");
            }, (error) => console.log(error))
    }

    /**
     * Функция для обращения к swagger и удаления ингредиента из БД
     * @param {ingredientId} ingredientId id удаляемого ингредиента
     */
    const deleteItem = async (ingredientId) => {
        setIsModalRemoveOpen(false);
        const requestOptions =
        {
            method: 'DELETE'
        }
        return await fetch(`api/Ingredient/${ingredientId}`, requestOptions)
            .then((response) => {
                if (response.ok) {
                    removeIngredient(ingredientId);
                }
            }, (error) => console.log(error))
    }

    return (
    <React.Fragment>
        {user.userRole == "admin" ? (
            <>
                <h3>Справочник ингредиентов</h3>
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: (page) => {
                            console.log(page);
                        },
                        pageSize: 5,
                    }}
                    dataSource={ingredients}
                    renderItem={(item) => (
                        <>
                            <List.Item
                                key={item.ingredientId}
                                actions={[
                                ]}
                            >
                                {item.ingredientName}
                                
                            </List.Item>
                            <List.Item>
                                <Button style={{ marginLeft: "0%" }}
                                    onClick={() => showUpdateModal(
                                        item.ingredientId, item.ingredientName
                                    )}
                                    className="button" type="primary" htmlType="submit">Изменить</Button>
                                <Button onClick={() => showRemoveModal(item.ingredientId)} style={{ marginLeft: "5%" }} className="button" type="primary" htmlType="submit">Удалить</Button>
                            </List.Item>
                            
                            
                        </>
                    )}
                />

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
                    <p>Ингредиент является справочником, при его удалении могут быть удалены связанные с ним объекты, Вы уверены, что хотите удалить этот ингредиент?</p>
                </Modal>

                <Modal
                    title="Редактирование ингредиента"
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
                                label="Название ингредиента"
                                labelCol={{
                                    span: 8,
                                }}
                            >
                                <Input name="name" onInput={e => setIngredientName(e.target.value)} value={ingredientName} />
                            </Form.Item>
                        </Form>
                    </>
                </Modal>
            </>) : ("")
        }
    </React.Fragment>
)}
export default Ingredient