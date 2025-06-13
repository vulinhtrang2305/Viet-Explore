// navigation/AppNavigation.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './../components/screens/HomeScreen';
import DetailsScreen from './../components/screens/DetailsScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
    );
}
