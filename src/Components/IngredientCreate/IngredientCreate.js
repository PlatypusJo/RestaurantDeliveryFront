import React, { useState } from 'react';
import {
    Button,
    Form,
    Input,
} from 'antd';
import { useEffect } from 'react';

const IngredientCreate = ({ user, addIngredient }) => {
    const [ingredientName, setIngredientName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault()
        const createIngredient = async () => {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    IngredientName: ingredientName,
                })
            }
            const response = await fetch("api/Ingredient/", requestOptions)

            return await response.json()
                .then((data) => {
                    console.log(data)
                    // response.status === 201 && addBlog(data)
                    if (response.ok) {
                        addIngredient(data)
                    }
                }, (error) => console.log(error))
        }
        createIngredient()
    }
    return (
        <React.Fragment>
            {user.userRole == "admin" ? (
                <>
                    <h3>Добавление нового ингредиента</h3>
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
                            label="Название ингредиента"
                            labelCol={{
                                span: 7,
                            }}
                        >
                            <Input name="name" onInput={e => setIngredientName(e.target.value)} />
                        </Form.Item>
                        <Form.Item wrapperCol={{
                            offset: 7,
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
export default IngredientCreate