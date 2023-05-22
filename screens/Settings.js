import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/actions/userAction';
import Toast from "react-native-toast-message";
import Loading from '../components/Loading';
import AppBar from '../components/AppBar';
import { SafeAreaView } from 'react-native-safe-area-context';

const Settings = () => {

  const navigation = useNavigation()

  const { isAuthenticated, user, loadingA } = useSelector(state => state.auth)
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout())
    Toast.show({
      type: 'info',
      text1: 'Log out successfull!'
    })
  }


  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <AppBar title="Settings"/>
      <ScrollView className="px-3"
        contentContainerStyle={{
          paddingBottom: 100
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="ml-4 text-2xl font-semibold pt-8 pb-4">Hey, {isAuthenticated ? user.name : 'Guest'}</Text>
        <View className="flex-row justify-between items-center w-full mb-4">
          {!isAuthenticated ? <TouchableOpacity onPress={() => navigation.navigate("Login")} className="bg-white flex-1 p-3 rounded-xl shadow shadow-black mx-1">
            <Ionicons name="log-in-outline" color="#262525" size={25} />
            <Text className="font-semibold text-xl">Login</Text>
            <Text className="text-sm">to your existing account</Text>
            <View className="w-full pl-36 mt-2">
              <Ionicons name="chevron-forward-outline" color="#262525" size={25} />
            </View>
          </TouchableOpacity> :
            <TouchableOpacity onPress={() => navigation.navigate("Profile")} className="bg-white flex-1 p-3 rounded-xl shadow shadow-black mx-1">
              <Ionicons name="person-circle-outline" color="#262525" size={25} />
              <Text className="font-semibold text-xl">Profile</Text>
              <Text className="text-sm">Edit your profile</Text>
              <View className="w-full pl-36 mt-2">
                <Ionicons name="chevron-forward-outline" color="#262525" size={25} />
              </View>
            </TouchableOpacity>}
          <TouchableOpacity onPress={() => navigation.navigate("ChefSignup1")} className="bg-white flex-1 p-3 rounded-xl shadow shadow-black mx-1">
            <Ionicons name="log-in-outline" color="#262525" size={25} />
            <Text className="font-semibold text-xl">Signup as Chef</Text>
            <Text className="text-sm">Create an account</Text>
            <View className="w-full pl-36 mt-2">
              <Ionicons name="chevron-forward-outline" color="#262525" size={25} />
            </View>
          </TouchableOpacity>

        </View>

        {isAuthenticated && <TouchableOpacity onPress={()=>navigation.navigate('ChangePassword')} className="bg-white flex-row space-x-4 items-center px-4 m-1 py-3 rounded-xl shadow shadow-black">
            <Ionicons name='key-outline' color='#262525' size={30} />
            <Text className="text-black font-medium text-base flex-1">Change-Password</Text>
            <Ionicons name="chevron-forward" color='#262525' size={25} />
          </TouchableOpacity>}
        <TouchableOpacity className="bg-white flex-row space-x-4 items-center px-4 m-1 py-3 rounded-xl shadow shadow-black">
            <Ionicons name='information-circle-outline' color='#262525' size={30} />
            <Text className="text-black font-medium text-base flex-1">About and Legal</Text>
            <Ionicons name="chevron-forward" color='#262525' size={25} />
          </TouchableOpacity>
        <TouchableOpacity className="bg-white flex-row space-x-4 items-center px-4 m-1 py-3 rounded-xl shadow shadow-black">
            <Ionicons name='call-outline' color='#262525' size={30} />
            <Text className="text-black font-medium text-base flex-1">Call Customer Support</Text>
            <Ionicons name="chevron-forward" color='#262525' size={25} />
          </TouchableOpacity>

        {/* Log-out */}
        {loadingA && <Loading/>}

        {isAuthenticated && !loadingA && <TouchableOpacity onPress={handleLogout} className="flex-row space-x-4 items-center px-4 py-3 m-1 rounded-xl active:shadow-md active:shadow-black active:bg-white">
          <Ionicons name="log-out-outline" color='red' size={30} />
          <Text className="text-red-600 font-medium text-base flex-1">Log-out</Text>
        </TouchableOpacity>}
      </ScrollView>


    </SafeAreaView>
  )
}

export default Settings