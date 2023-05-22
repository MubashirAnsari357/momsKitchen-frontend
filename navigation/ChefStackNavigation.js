import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChefDrawerNavigation from './ChefDrawerNavigation';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import DishDetails from '../screens/DishDetails';
import ChefProfile from '../screens/ChefProfile';
import Filter from '../screens/Filter';
import CameraScreen from '../screens/Camera';
import ChefEditDish from '../screens/ChefEditDish';
import Feedbacks from '../screens/Feedbacks';
import OrderDetails from '../screens/OrderDetails';
import Verify from '../screens/Verify';

const ChefStackNavigation = () => {

    const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
        <Stack.Navigator >
          <Stack.Screen name="ChefDrawerNavigation" component={ChefDrawerNavigation} options={{ headerShown: false }} />
          <Stack.Screen name="DishDetails" component={DishDetails} options={{ presentation: 'fullScreenModal', animation: 'slide_from_right', headerShown: false }} />
          <Stack.Screen name="OrderDetails" component={OrderDetails} options={{ presentation: 'fullScreenModal', animation: 'slide_from_right', headerShown: false }} />
          <Stack.Screen name="Feedbacks" component={Feedbacks} options={{ presentation: 'fullScreenModal', animation: 'slide_from_right', headerShown: false }} />
          <Stack.Screen name="ChefProfile" component={ChefProfile} options={{ headerShown: false }} />
          <Stack.Screen name="ChefEditDish" component={ChefEditDish} options={{ headerShown: false }} />
          <Stack.Screen name="Filter" component={Filter} options={{ headerShown: false, presentation: 'containedModal', animation: 'slide_from_bottom' }} />
          <Stack.Screen name="Camera" component={CameraScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Verify" component={Verify} options={{ headerShown: false }} />
        </Stack.Navigator>
        <Toast position='bottom' bottomOffset={20} autoHide visibilityTime={2000}/>
      </NavigationContainer>
  )
}

export default ChefStackNavigation