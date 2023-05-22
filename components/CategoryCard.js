import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const CategoryCard = ({ category }) => {
    const { name, categoryImg } = category
    const navigation = useNavigation()
    return (
        <TouchableOpacity onPress={()=>navigation.navigate("Dishes", {name})} className="ml-3 bg-white w-24 my-1 items-center justify-center rounded-2xl shadow shadow-black">
            <Image source={categoryImg} className="w-14 h-14 mt-2" />
            <View className="justify-center items-center pb-2 mt-2">
                <Text className="font-semibold text-[#262525] text-base text-center">{name}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default CategoryCard