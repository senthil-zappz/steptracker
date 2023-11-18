
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import StepTrackerScreen from './screens/StepTrackerScreen';
import UserProfileScreen from './screens/UserProfileScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StepTracker">
        <Stack.Screen name="StepTracker" component={StepTrackerScreen} options={{ title: 'Step Tracker' }} />
        <Stack.Screen name="UserProfile" component={UserProfileScreen} options={{ title: 'User Profile' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;