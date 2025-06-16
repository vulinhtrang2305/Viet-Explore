import MainHomeC from './components/screens/HomeSreen/MainHomeC';
import AppProvider from './provider/AppProvider';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';
import DetailsLocation from './components/screens/DetailsScreen/DetailsLocation';
import AllDestination from './components/screens/AllDestination/AllDestination';
import DescriptionC from './components/screens/DescriptionScreen/DescriptionC';
import SuggestC from './components/screens/SuggestLocation/SuggestC';

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={MainHomeC} options={{ headerShown: false }} />
          <Stack.Screen name="list-details" component={AllDestination} options={{ title: "Điểm đến phổ biến" }} />
          <Stack.Screen name="catgory-location" component={DetailsLocation} options={{ title: "Điểm đến phổ biến" }} />
          <Stack.Screen name="description" component={DescriptionC} options={{ title: "Thông tin chi tiết" }} />
          <Stack.Screen name="suggest" component={SuggestC} options={{ title: "Gợi ý chuyến đi nổi bật" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}

export default App;

