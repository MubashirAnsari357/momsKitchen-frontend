import { View, ActivityIndicator, Image } from 'react-native'
import React from 'react'

const Loading = () => {
    return (
        <View className="w-max flex-1 justify-center items-center">
            {/* <ActivityIndicator size='large' color='#5E72EB' /> */}
            <Image source={require('../assets/slow-cooker.gif')} className="h-24 w-24 rounded-lg"/>
        </View>
    )
}

export default Loading