import { useEffect } from 'react'

export let ingredients = [{}]

const IngredientSelect = () => {
    useEffect(() => {
        const getCategories = async () => {
            const requestOptions = {
                method: 'GET'
            }
            return await fetch("api/Category/", requestOptions)

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