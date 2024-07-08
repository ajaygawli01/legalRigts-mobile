import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TemplateChoose from '../screens/TemplateChoose';
// import UserScreen from '../screens/UserScreen';

const Stack = createStackNavigator();

const MainNavigator = () => (
  <Stack.Navigator initialRouteName="TemplateChoose">
    <Stack.Screen name="TemplateChoose" component={TemplateChoose} />
    {/* <Stack.Screen name="UserScreen" component={UserScreen} /> */}
  </Stack.Navigator>
);

export default MainNavigator;
