import { View, Text, Image } from 'react-native'
import React from 'react'

const Loader = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <Image source={require('../assets/foodLoader.gif')} />
      <Text className='text-base'>Loading...</Text>
    </View>
  )
}

export default Loader