import React from 'react';
import { categories } from '../Category/Category';

const CreateOption = () => {
    return (
        <React.Fragment>
            <select name="CategoryId">
                {/*<option key="-1">Категория блюда:</option>*/}
                {categories.map(({ categoryId, categoryName }) => (
                    <option key={categoryId} value={categoryId}>{categoryName}</option>
                ))}
            </select>
        </React.Fragment>
    );
};

const DishCreate = ({ user, addDish }) =>
{
    const handleSubmit = (e) =>
    {
        e.preventDefault()
        const name = e.target.elements.DishName.value
        const grammers = e.target.elements.DishGrammers.value
        const  cost  = e.target.elements.DishCost.value
        const image = e.target.elements.DishImage.value
        const categoryId = e.target.elements.CategoryId.value
        //const category =
        //{
        //    CategoryName: categoryName
        //}
        const dishDTO =
        {
            DishName: name,
            DishGrammers: grammers,
            DishCost: cost,
            DishImage: image,
            CategoryFk: categoryId
        }
        const createDish = async () =>
        {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dishDTO)
            }
            const response = await fetch("api/Dish/", requestOptions)

            return await response.json()
                .then((data) =>
                {
                    console.log(data)
                    // response.status === 201 && addBlog(data)
                    if (response.ok) {
                        addDish(data)
                        e.target.elements.DishName.value = ""
                    }
                }, (error) => console.log(error))
        }
        createDish()
    }
    return (
        <React.Fragment>
            {user.isAuthenticated ? (<h3>Добавление блюда</h3>) : ("")}
            {user.isAuthenticated ? (<form onSubmit={handleSubmit}>
                <input type="text" name="DishName" placeholder="Название блюда:" /><br/>
                <input type="text" name="DishGrammers" placeholder="Грамовка:" /><br />
                <input type="number" min="0" name="DishCost" placeholder="Цена:" /><br />
                <input type="text" name="DishImage" placeholder="Изображение:" /><br />
                <CreateOption /><br />
                <button type="submit">Добавить</button> <br />
            </form>) : ("")}
        </React.Fragment >
    )
}
export default DishCreate