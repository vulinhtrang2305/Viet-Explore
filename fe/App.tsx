// import MainHomeC from './components/screens/HomeSreen/MainHomeC';
// import AppProvider from './provider/AppProvider';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { Text, View } from 'react-native';
// import DetailsLocation from './components/screens/DetailsScreen/DetailsLocation';
// import AllDestination from './components/screens/AllDestination/AllDestination';
// import DescriptionC from './components/screens/DescriptionScreen/DescriptionC';
// import SuggestC from './components/screens/SuggestLocation/SuggestC';

// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Home Screen</Text>
//     </View>
//   );
// }

// const App = () => {
//   const Stack = createNativeStackNavigator();

//   return (
//     <AppProvider>
//       <NavigationContainer>
//         <Stack.Navigator>
//           <Stack.Screen name="Home" component={MainHomeC} options={{ headerShown: false }} />
//           <Stack.Screen name="list-details" component={AllDestination} options={{ title: "Điểm đến phổ biến" }} />
//           <Stack.Screen name="catgory-location" component={DetailsLocation} options={{ title: "Điểm đến nổi bật" }} />
//           <Stack.Screen name="description" component={DescriptionC} options={{ title: "Thông tin chi tiết" }} />
//           <Stack.Screen name="suggest" component={SuggestC} options={{ title: "Gợi ý chuyến đi nổi bật" }} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </AppProvider>
//   );
// }

// export default App;



// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { StyleSheet } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';

// import AppProvider from './provider/AppProvider';
// import MainHomeC from './components/screens/HomeSreen/MainHomeC';
// import DetailsLocation from './components/screens/DetailsScreen/DetailsLocation';
// import AllDestination from './components/screens/AllDestination/AllDestination';
// import DescriptionC from './components/screens/DescriptionScreen/DescriptionC';
// import SuggestC from './components/screens/SuggestLocation/SuggestC';

// const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

// function TabNavigator() {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         tabBarShowLabel: false,
//         tabBarStyle: styles.tabBarStyle,
//         headerShown: false,
//       }}
//     >
//       <Tab.Screen
//         name="HomeTab"
//         component={MainHomeC}
//         options={{
//           tabBarIcon: ({ focused }) => (
//             <Ionicons name="home" size={24} color={focused ? '#00C2FF' : '#fff'} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="SuggestTab"
//         component={AllDestination}
//         options={{
//           tabBarIcon: ({ focused }) => (
//             <Ionicons name="person" size={24} color={focused ? '#00C2FF' : '#fff'} />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// }

// export default function App() {
//   return (
//     <AppProvider>
//       <NavigationContainer>
//         <Stack.Navigator>
//           <Stack.Screen
//             name="MainTabs"
//             component={TabNavigator}
//             options={{ headerShown: false }}
//           />
//           <Stack.Screen
//             name="list-details"
//             component={AllDestination}
//             options={{ title: 'Điểm đến phổ biến' }}
//           />
//           <Stack.Screen
//             name="catgory-location"
//             component={DetailsLocation}
//             options={{ title: 'Điểm đến nổi bật' }}
//           />
//           <Stack.Screen
//             name="description"
//             component={DescriptionC}
//             options={{ title: 'Thông tin chi tiết' }}
//           />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </AppProvider>
//   );
// }

// const styles = StyleSheet.create({
//   tabBarStyle: {
//     position: 'absolute',
//     bottom: 20,
//     left: 20,
//     right: 20,
//     height: 70,
//     backgroundColor: '#43556B',
//     borderRadius: 20,
//     borderTopWidth: 0,
//     elevation: 5,
//   },
//   customButton: {
//     top: 30,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   centerScreen: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
// });


import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import AppProvider from './provider/AppProvider';
import MainHomeC from './components/screens/HomeSreen/MainHomeC';
import DetailsLocation from './components/screens/DetailsScreen/DetailsLocation';
import AllDestination from './components/screens/AllDestination/AllDestination';
import DescriptionC from './components/screens/DescriptionScreen/DescriptionC';
import SuggestC from './components/screens/SuggestLocation/SuggestC';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={MainHomeC}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name="home" size={24} color={focused ? '#00C2FF' : '#fff'} />
          ),
        }}
      />
      <Tab.Screen
        name="SuggestTab"
        component={AllDestination}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name="person" size={24} color={focused ? '#00C2FF' : '#fff'} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="MainTabs"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="list-details"
            component={AllDestination}
            options={{ title: 'Điểm đến phổ biến' }}
          />
          <Stack.Screen
            name="catgory-location"
            component={DetailsLocation}
            options={{ title: 'Điểm đến nổi bật' }}
          />
          <Stack.Screen
            name="description"
            component={DescriptionC}
            options={{ title: 'Thông tin chi tiết' }}
          />
          <Stack.Screen
            name="suggest"
            component={SuggestC}
            options={{ title: 'Gợi ý chuyến đi nổi bật' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    height: 70,
    backgroundColor: '#43556B',
    borderRadius: 20,
    borderTopWidth: 0,
    elevation: 5,
  },
});
