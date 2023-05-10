import { useEffect } from 'react'

export let categories = [{}]

const CategorySelect = () => {
    useEffect(() => {
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