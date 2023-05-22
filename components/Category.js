import { FlatList } from 'react-native'
import React from 'react'
import CategoryCard from './CategoryCard'
import { categories } from '../MockData/MockData'

const Category = () => {
    
    return (
            <FlatList horizontal
                contentContainerStyle={{
                    paddingTop: 10,
                    paddingRight: 20,
                    paddingLeft: 4 ,
                }}
                data={categories}
                renderItem={({ item }) => (
                    <CategoryCard category={item} />
                )}
                showsHorizontalScrollIndicator={false}
            />
    )
}

export default Category