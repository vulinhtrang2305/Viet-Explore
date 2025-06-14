import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../components/screens/home/HomeScreen';
import ProfileScreen from '../components/screens/home/DetailsScreen';

const Tab = createBottomTabNavigator();

function CustomButton({ children, onPress }: any) {
    return (
        <TouchableOpacity
            style={styles.customButton}
            onPress={onPress}
            activeOpacity={0.9}
        >
            <View style={styles.plusButton}>{children}</View>
        </TouchableOpacity>
    );
}

export default function CustomTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBarStyle,
                headerShown: false,
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Ionicons style={styles.iconStyle} name="home" size={30} color={focused ? '#00C2FF' : '#fff'} />
                    ),
                }}
            />

            <Tab.Screen
                name="Plus"
                component={() => null}
                options={{
                    tabBarButton: (props) => (
                        <CustomButton {...props}>
                            <Text style={styles.plusText}>+</Text>
                        </CustomButton>
                    ),
                }}
                listeners={{
                    tabPress: (e) => {
                        e.preventDefault();
                        console.log('Plus button pressed');
                    },
                }}
            />

            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Ionicons style={styles.iconStyle} name="person" size={24} color={focused ? '#00C2FF' : '#fff'} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabBarStyle: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 25,
        height: 70,
        backgroundColor: '#43556B',
        borderRadius: 20,
        borderTopWidth: 0,
        elevation: 0,
    },
    customButton: {
        top: -30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    plusButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 5,
    },
    plusText: {
        fontSize: 30,
        color: '#000',
    },
    iconStyle: {
        marginTop: 20
    }
});
