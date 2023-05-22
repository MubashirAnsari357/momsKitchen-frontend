import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import Home from '../screens/Home';
import Search from '../screens/Search';
import MyOrders from '../screens/MyOrders';
import Settings from '../screens/Settings';

const UserTabNavigation = () => {

    const Tab = createBottomTabNavigator()
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused
                            ? 'home'
                            : 'home-outline';
                    } else if (route.name === 'Search') {
                        iconName = focused ? 'search' : 'search-outline';
                    } else if (route.name === 'Orders') {
                        iconName = focused ? 'timer' : 'timer-outline';
                    } else if (route.name === 'Settings') {
                        iconName = focused ? 'settings' : 'settings-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#262525',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Home" component={Home} options={{headerShown: false}}/>
            <Tab.Screen name="Search" component={Search} options={{headerShown: false}}/>
            <Tab.Screen name="Orders" component={MyOrders} options={{headerShown: false}}/>
            <Tab.Screen name="Settings" component={Settings} options={{headerShown: false}}/>
        </Tab.Navigator >
    )
}

export default UserTabNavigation