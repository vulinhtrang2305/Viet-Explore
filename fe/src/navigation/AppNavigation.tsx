import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../components/screens/home/HomeScreen';
import DetailsScreen from '../components/screens/home/DetailsScreen';
import LocationScroll from '../components/screens/home/LoactionScroll';

export type RootStackParamList = {
    Home: undefined;
    Details: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigation() {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
    );
}
