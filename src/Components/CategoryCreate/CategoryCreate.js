import React, { useState } from 'react';
import {
    Button,
    Form,
    Input,
} from 'antd';
import { useEffect } from 'react';

/**
 * Компонент, отображающий страницу создания категории
 * @param {User} user авторизованный пользователь
 * @param {Category} addCategory метод добавления новой категории в список категорий
 * @returns Страница создания категории
 */
const CategoryCreate = ({ user, addCategory }) => {
    const [categoryName, setCategoryName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault()
        /**
         * Функция для обращения к swagger и создания новой категории в БД
         * @returns ответ в json формате или ошибка в случае неудачного выполнения запроса
         */
        const createCategory = async () => {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    CategoryName: categoryName,
                })
            }
            const response = await fetch("api/Category/", requestOptions)

            return await response.json()
                .then((data) => {
                    console.log(data)
                    // response.status === 201 && addBlog(data)
                    if (response.ok) {
                        addCategory(data)
                    }
                }, (error) => console.log(error))
        }
        createCategory()
    }
    return (
        <React.Fragment>
            {user.userRole == "admin" ? (
                <>
                    <h3>Добавление новой категории</h3>
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
                            label="Название категории"
                            labelCol={{
                                span: 6,
                            }}
                        >
                            <Input name="name" onInput={e => setCategoryName(e.target.value)} />
                        </Form.Item>
                        <Form.Item wrapperCol={{
                            offset: 6,
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
export default CategoryCreate