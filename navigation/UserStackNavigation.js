import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DishDetails from '../screens/DishDetails';
import ChefProfile from '../screens/ChefProfile';
import Login from '../screens/Login';
import Basket from '../screens/Basket';
import Signup from '../screens/Signup';
import OnboardingScreen from '../screens/OnboardingScreen';
import Checkout from '../screens/Checkout';
import Payment from '../screens/Payment';
import Filter from '../screens/Filter';
import OrderDetails from '../screens/OrderDetails';
import Loader from '../components/Loader';
import Toast from 'react-native-toast-message';
import Profile from '../screens/Profile';
import Dishes from '../screens/Dishes';
import ForgotPassword from '../screens/ForgotPassword';
import ResetPassword from '../screens/ResetPassword';
import Verify from '../screens/Verify';
import ChangePassword from '../screens/ChangePassword';
import UserTabNavigation from './UserTabNavigation';
import Feedbacks from '../screens/Feedbacks';
import ChefSignup1 from '../screens/ChefSignup1';
import AddFeedback from '../screens/AddFeedback';
import ChefSignup2 from '../screens/ChefSignup2';
import CameraScreen from '../screens/Camera';

const UserStackNavigation =  () => {

  const Stack = createNativeStackNavigator();
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={'Home'} >
          {/* <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} options={{ headerShown: false }} /> */}
          <Stack.Screen name="UserTabNavigation" component={UserTabNavigation} options={{ headerShown: false }} />
          <Stack.Screen name="ChefProfile" component={ChefProfile} options={{ presentation: 'fullScreenModal', animation: 'slide_from_right', headerShown: false }} />
          <Stack.Screen name="Dishes" component={Dishes} options={{ presentation: 'fullScreenModal', animation: 'slide_from_right', headerShown: false }} />
          <Stack.Screen name="DishDetails" component={DishDetails} options={{ presentation: 'fullScreenModal', animation: 'slide_from_right', headerShown: false }} />
          <Stack.Screen name="Feedbacks" component={Feedbacks} options={{ presentation: 'fullScreenModal', animation: 'slide_from_right', headerShown: false }} />
          <Stack.Screen name="AddFeedback" component={AddFeedback} options={{ presentation: 'fullScreenModal', animation: 'slide_from_bottom', headerShown: false }} />
          <Stack.Screen name="Basket" component={Basket} options={{ presentation: 'containedModal', animation: 'slide_from_bottom', headerShown: false }} />
          <Stack.Screen name="Filter" component={Filter} options={{ presentation: 'containedModal', animation: 'slide_from_bottom', headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Verify" component={Verify} options={{ headerShown: false }} />
          <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerShown: false }} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ headerShown: false }} />
          <Stack.Screen name="Profile" component={Profile} options={{ presentation: 'fullScreenModal', animation: 'slide_from_right', headerShown: false }} />
          <Stack.Screen name="OrderDetails" component={OrderDetails} options={{ presentation: 'fullScreenModal', animation: 'slide_from_right', headerShown: false }} />
          <Stack.Screen name="Checkout" component={Checkout} options={{ presentation: 'fullScreenModal', animation: 'slide_from_right', headerShown: false }} />
          <Stack.Screen name="Payment" component={Payment} options={{ presentation: 'fullScreenModal', animation: 'slide_from_right', headerShown: false }} />
          <Stack.Screen name="ChefSignup1" component={ChefSignup1} options={{ headerShown: false }} />
          <Stack.Screen name="ChefSignup2" component={ChefSignup2} options={{ headerShown: false }} />
          <Stack.Screen name="Camera" component={CameraScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
        <Toast position='bottom' bottomOffset={20} autoHide visibilityTime={2000}/>
      </NavigationContainer>
  );
}

export default UserStackNavigation
