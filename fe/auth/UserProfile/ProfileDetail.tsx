import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, updateUser, logoutUser } from '../../store/slices/userSlice';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileDetail() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { userInfo, loading, error, message } = useSelector((state) => state.users);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [address, setAddress] = useState('');
    const [dob, setDob] = useState('');

    const formatDate = (date) => {
        if (!date) return "";
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, "0");
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const year = String(d.getFullYear());
        return `${day}/${month}/${year}`;
    };

    useEffect(() => {
        const checkAndLoad = async () => {
            if (!userInfo) {
                try {
                    const token = await AsyncStorage.getItem("token");
                    if (!token) {
                        navigation.replace("login");
                        return;
                    }
                    dispatch(getProfile());
                } catch (err) {
                    Alert.alert("Lỗi khi kiểm tra token");
                }
            } else {
                setName(userInfo?.username || '');
                setEmail(userInfo?.email || '');
                setMobile(userInfo?.phone ? String(userInfo.phone) : '');
                setAddress(userInfo?.address || '');
                setDob(userInfo?.dob || '');
            }
        };

        checkAndLoad();
    }, [userInfo]);

    const handleUpdate = async () => {
        const updatedData = {
            username: name,
            email,
            phone: mobile,
            address: address,
            dob: dob,
        };

        const userId = userInfo?._id;
        console.log(userInfo);
        
        if (!userId) {
            Alert.alert("Không tìm thấy ID người dùng");
            return;
        }

        console.log("ID người dùng:", userId);

        try {
            await dispatch(updateUser({ id: userId, updatedData })).unwrap();
            Alert.alert("Cập nhật thành công");
            navigation.goBack();
        } catch (err) {
            Alert.alert(`Lỗi: ${err}`);
        }
    };
    

    const handleLogout = async () => {
        try {
            await dispatch(logoutUser()).unwrap();
            await AsyncStorage.removeItem("token");

            Alert.alert("Đăng xuất thành công");
            navigation.reset({
                index: 0,
                routes: [{ name: "HomeScreen" }],
            });
        } catch (err) {
            Alert.alert("Lỗi khi đăng xuất");
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.avatarContainer}>
                <Image
                    source={require('../../assets/Sample_User_Icon.png')}
                    style={styles.avatar}
                />
            </View>

            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Date of birth"
                    value={formatDate(dob)}
                    onChangeText={setDob}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Mobile number"
                    value={mobile}
                    onChangeText={setMobile}
                    keyboardType="phone-pad"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Address"
                    value={address}
                    onChangeText={setAddress}
                />
            </View>

            <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
                <Text style={styles.updateText}>
                    {loading ? 'Đang cập nhật...' : 'Cập nhật'}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>Đăng xuất</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    avatarContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    form: {
        width: '100%',
        marginTop: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 12,
        paddingHorizontal: 15,
        height: 50,
        marginBottom: 15,
        fontSize: 15,
        backgroundColor: '#f9f9f9',
    },
    updateButton: {
        marginTop: 10,
        width: '100%',
        paddingVertical: 14,
        borderRadius: 25,
        backgroundColor: '#18C0C0',
        alignItems: 'center',
    },
    updateText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    logoutButton: {
        marginTop: 10,
        width: '100%',
        paddingVertical: 14,
        borderRadius: 25,
        backgroundColor: '#ff3b30',
        alignItems: 'center',
    },
    logoutText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
