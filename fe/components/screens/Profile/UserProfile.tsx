import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const UserProfile = () => {
    const menuItems = [
        { icon: 'list', label: 'Đơn hàng của tôi' },
        { icon: 'megaphone', label: 'Khuyến mãi' },
        { icon: 'camera', label: 'Thêm hình ảnh' },
        { icon: 'bookmark', label: 'Ưa thích' },
        { icon: 'star', label: 'Đánh giá TripHunter' },
        { icon: 'person-add', label: 'Tìm bạn bè' },
        { icon: 'settings', label: 'Cài đặt' },
    ];

    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Thông tin chi tiết</Text>

            <TouchableOpacity style={styles.loginRow} onPress={() => navigation.navigate("login")}>
                <Image
                    source={require("../../../assets/Sample_User_Icon.png")}
                    style={styles.avatar}
                />
                <Text style={styles.loginText}>Đăng nhập</Text>
            </TouchableOpacity>

            <ScrollView>
                {menuItems.map((item, index) => (
                    <TouchableOpacity
                        style={styles.menuItem}
                        key={index}
                        onPress={() => console.log(`Pressed ${item.label}`)}
                    >
                        <Ionicons name={item.icon} size={22} color="#444" style={styles.icon} />
                        <Text style={styles.menuText}>{item.label}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

export default UserProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 40,
    },
    header: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 10,
    },
    loginRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 15,
    },
    loginText: {
        fontSize: 16,
        color: '#333',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderBottomWidth: 0.5,
        borderBottomColor: '#eee',
    },
    icon: {
        marginRight: 15,
    },
    menuText: {
        fontSize: 15,
        color: '#333',
    },
});
