import { useEffect } from 'react'

export let categories = [{}]

/**
 * Компонент для создания элемента выпадающего списка с выбором категории 
 * */
const CategorySelect = () => {
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
                    categories = data
                },
                    (error) => {
                        console.log(error)
                    }
                )
        }
        getCategories()
    })
}
export default CategorySelect