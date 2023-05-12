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
 * @param {Categories} categoriesList список категорий
 * @param {Categories} setCategories метод изменения списка категорий
 * @param {Category} removeCategory метод удаления категории
 * @param {Category} updateCategory метод изменения категории блюд
 * @returns Страница категорий блюд, заполненная категориями, с возможностью их редактирования и удаления и доступная только для администратора
 */
const Category = ({ user, categoriesList, setCategories, removeCategory, updateCategory }) => {
    useEffect(() => {
        /**
         * Функция для обращения к swagger и получения списка категорий из БД
         * */
        const getCategories = async () => {
            const requestOptions = {
                method: 'GET'
            }
            return await fetch("api/Category/", requestOptions)

                .then(response => response.json())
                .then((data) => {
                    console.log('Data:', data)
                    setCategories(data)
                },
                    (error) => {
                        console.log(error)
                    }
                )
        }
        getCategories()
    }, [setCategories])
    const [categoryId, setCategoryId] = useState(-1);
    const [categoryName, setCategoryName] = useState("");




    const [deleteId, setDeleteId] = useState(-1);
    const [isModalRemoveOpen, setIsModalRemoveOpen] = useState(false);
    /**
     * Функция открытия модульного окна для подтверждения удаления
     * @param {categoryId} val id удаляемой категории
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
     * Функция открытия модульного окна для изменения категории 
     * @param {categoryId} id id изменяемой категории
     * @param {categoryName} name название изменяемой категории
     */
    const showUpdateModal = (id, name) => {
        setCategoryId(id);
        setCategoryName(name);
        setIsModalUpdateOpen(true);
    };
    /**
     * Функция закрытия модульного окна для изменения категории
     * */
    const handleUpdateCancel = () => {
        setCategoryId(-1);
        setCategoryName("");
        setIsModalUpdateOpen(false);
    }


    /**
     * Функция для обращения к swagger и изменения категории в БД
     * */
    const updateItem = async () => {
        setIsModalUpdateOpen(false);
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                CategoryId: categoryId,
                CategoryName: categoryName,
            })
        }
        const response = await fetch(`api/Category/${categoryId}`, requestOptions);

        return await response.json()
            .then((data) => {
                console.log(data);
                if (response.ok) {
                    updateCategory(data);
                }
                setCategoryId(-1);
                setCategoryName("");
            }, (error) => console.log(error))
    }


    /**
     * Функция для обращения к swagger и удаления категории из БД
     * @param {categoryId} categoryId id удаляемой категории
     */
    const deleteItem = async (categoryId) => {
        setIsModalRemoveOpen(false);
        const requestOptions =
        {
            method: 'DELETE'
        }
        return await fetch(`api/Category/${categoryId}`, requestOptions)
            .then((response) => {
                if (response.ok) {
                    removeCategory(categoryId);
                }
            }, (error) => console.log(error))
    }

    return (
        <React.Fragment>
            {user.userRole == "admin" ? (
                <>
                    <h3>Справочник категорий блюд</h3>
                    <List
                        itemLayout="vertical"
                        size="large"
                        pagination={{
                            onChange: (page) => {
                                console.log(page);
                            },
                            pageSize: 4,
                        }}
                        dataSource={categoriesList}
                        renderItem={(item) => (
                            <>
                                <List.Item
                                    key={item.categoryId}
                                    actions={[
                                    ]}
                                >
                                    {item.categoryName}
                                </List.Item>
                                <List.Item>
                                    <Button style={{ marginLeft: "0%" }}
                                        onClick={() => showUpdateModal(
                                            item.categoryId, item.categoryName
                                        )}
                                        className="button" type="primary" htmlType="submit">Изменить</Button>
                                    <Button onClick={() => showRemoveModal(item.categoryId)} style={{ marginLeft: "5%" }} className="button" type="primary" htmlType="submit">Удалить</Button>
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
                        <p>Категория является справочником, при её удалении могут быть удалены связанные с ней объекты, Вы уверены, что хотите удалить эту категорию?</p>
                    </Modal>

                    <Modal
                        title="Редактирование категории"
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
                                    label="Название категории"
                                    labelCol={{
                                        span: 7,
                                    }}
                                >
                                    <Input name="name" onInput={e => setCategoryName(e.target.value)} value={categoryName} />
                                </Form.Item>
                            </Form>
                        </>
                    </Modal>
                </>) : ("")
            }
        </React.Fragment>
    )
}
export default Category
