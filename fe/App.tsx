import "./utils/localStoragePatch";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Provider } from "react-redux";
import { store } from "./store";

import MainHomeC from "./components/screens/HomeSreen/MainHomeC";
import DetailsLocation from "./components/screens/DetailsScreen/DetailsLocation";
import AllDestination from "./components/screens/AllDestination/AllDestination";
import DescriptionC from "./components/screens/DescriptionScreen/DescriptionC";
import SuggestC from "./components/screens/SuggestLocation/SuggestC";
import SuggestDetails from "./components/screens/SuggestLocation/SuggestDetail";
import UserProfile from "./components/screens/Profile/UserProfile";
import Login from "./auth/LoginForm/Login";
import RegisterScreen from "./auth/RegisterForm/Register";
import ProfileDetail from "./auth/UserProfile/ProfileDetail";
import FavouriteList from "./components/screens/FavouriteList/Favourite";
import CreateReviewScreen from "./src/components/screens/home/CreateReviewScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
        headerShown: false,
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={MainHomeC}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="home"
              size={28}
              color={focused ? "#00C2FF" : "#fff"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="UserTab"
        component={UserProfile}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="person"
              size={28}
              color={focused ? "#00C2FF" : "#fff"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      {/* <AppProvider> */}
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
            options={{ title: "Điểm đến phổ biến" }}
          />
          <Stack.Screen
            name="catgory-location"
            component={DetailsLocation}
            options={{ title: "Điểm đến nổi bật" }}
          />
          <Stack.Screen
            name="description"
            component={DescriptionC}
            options={{ title: "Thông tin chi tiết" }}
          />
          <Stack.Screen
            name="suggest"
            component={SuggestC}
            options={{ title: "Gợi ý chuyến đi nổi bật" }}
          />
          <Stack.Screen
            name="suggestDetail"
            component={SuggestDetails}
            options={{ title: "Gợi ý chuyến đi chi tiết" }}
          />
          <Stack.Screen
            name="login"
            component={Login}
            options={{ title: "Đăng nhập" }}
          />
          <Stack.Screen
            name="register"
            component={RegisterScreen}
            options={{ title: "Đăng ký tài khoản mới" }}
          />
          <Stack.Screen
            name="UserProfileDetail"
            component={ProfileDetail}
            options={{ title: "Chỉnh sửa thông tin cá nhân" }}
          />
          <Stack.Screen
            name="favouriteScreen"
            component={FavouriteList}
            options={{ title: "Danh sách các địa điểm yêu" }}
          />
          <Stack.Screen
            name="createReview"
            component={CreateReviewScreen}
            options={{ title: "Viết đánh giá" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      {/* </AppProvider> */}
    </Provider>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    position: "absolute",
    bottom: 20,
    marginHorizontal: 10,
    height: 70,
    backgroundColor: "#43556B",
    borderRadius: 20,
    borderTopWidth: 0,
    elevation: 5,
  },
});
