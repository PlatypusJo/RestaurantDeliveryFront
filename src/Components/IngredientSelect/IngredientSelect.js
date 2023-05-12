import { useEffect } from 'react'

export let ingredients = [{}]

/**
 * Компонент для создания элемента выпадающего списка с выбором ингредиента 
 * */
const IngredientSelect = () => {
    useEffect(() => {
        /**
         * Функция для обращения к swagger и получения списка ингредиентов из БД
         * */
        const getCategories = async () => {
            const requestOptions = {
                method: 'GET'
            }
            return await fetch("api/Ingredient/", requestOptions)

                .then(response => response.json())
                .then((data) => {
                    console.log('Data:', data)
                    ingredients = data
                },
                    (error) => {
                        console.log(error)
                    }
                )
        }
        getCategories()
    })
}
export default IngredientSelect