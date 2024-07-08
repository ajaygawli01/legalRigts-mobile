// navigation/AuthNavigator.js
import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer, DrawerActions} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import TemplateChoose from '../screens/TemplateChoose';
import Home from '../screens/Home';
import UserHistory from '../screens/UserHistory';
import Editor from '../screens/Editor';

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
           <Stack.Screen name="Template" component={TemplateChoose} />
           <Stack.Screen name="Home" component={Home} />
           <Stack.Screen name="Editor" component={Editor} />
           <Stack.Screen name="UserHistory" component={UserHistory} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AuthNavigator;


// // navigation/AuthNavigator.js// navigation/AuthNavigator.js
// import React from 'react';
// import 'react-native-gesture-handler';
// import 'react-native-reanimated';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { DrawerContentScrollView, DrawerItem, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
// import LoginScreen from '../screens/LoginScreen';
// import SignupScreen from '../screens/SignupScreen';
// import TemplateChoose from '../screens/TemplateChoose';
// import Home from '../screens/Home'; // Assuming Home is the landing screen post login
// import UserHistory from '../screens/UserHistory';
// import Editor from '../screens/Editor';

// // Create stack navigator for the authentication flow
// const AuthStack = createStackNavigator();

// // Create drawer navigator for the post-login flow
// const Drawer = createDrawerNavigator();

// const CustomDrawerContent = (props) => {
//   return (
//     <DrawerContentScrollView {...props}>
//       <DrawerItemList {...props} />
//       <DrawerItem label="Help" onPress={() => alert('Link to help')} />
//     </DrawerContentScrollView>
//   );
// };

// const DrawerNavigator = () => (
//   <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
//     <Drawer.Screen name="Template" component={TemplateChoose} />
//     <Drawer.Screen name="Editor" component={Editor} />
//     <Drawer.Screen name="UserHistory" component={UserHistory} />
//   </Drawer.Navigator>
// );

// const AuthNavigator = () => (
//   <NavigationContainer>
//     <AuthStack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
//       <AuthStack.Screen name="Login" component={LoginScreen} />
//       <AuthStack.Screen name="Signup" component={SignupScreen} />
//       <AuthStack.Screen name="Home" component={Home} />
//       <AuthStack.Screen name="Main" component={DrawerNavigator} />
//     </AuthStack.Navigator>
//   </NavigationContainer>
// );

// export default AuthNavigator;
