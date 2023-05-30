import { View, ActivityIndicator, Image } from 'react-native'
import React from 'react'

const Loading = () => {
    return (
        <View className="flex-1 justify-center items-center">
            <ActivityIndicator size='large' color='#5E72EB' />
        </View>
    )
}

export default Loading