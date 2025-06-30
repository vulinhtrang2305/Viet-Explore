import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    TextInput,
    ToastAndroid,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, logoutUser, updateUser } from '../../store/slices/userSlice';
import { useNavigation } from '@react-navigation/native';

export default function ProfileDetail() {
    const dispatch = useDispatch();
    const navigation = useNavigation()
    const { userInfo, loading, error, message } = useSelector((state: any) => state.users);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [address, setAddress] = useState('');
    const [dob, setDob] = useState('');

    const formatDate = (date) => {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, "0");
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const year = String(d.getFullYear());
        return `${day}/${month}/${year}`;
    };

    useEffect(() => {
        if (!userInfo) {
            const token = localStorage.getItem("token"); 
            if (!token) {
                navigation.replace("login"); 
                return;
            }

            dispatch(getProfile());
        } else {
            setName(userInfo?.username || '');
            setEmail(userInfo?.email || '');
            setMobile(userInfo?.phone || '');
            setAddress(userInfo?.address || '');
            setDob(userInfo?.dob || '');
        }
    }, [userInfo]);

    const handleUpdate = async () => {
        if (!name || !email || !mobile || !address || !dob) {
            ToastAndroid.show("Vui lòng điền đầy đủ thông tin", ToastAndroid.SHORT);
            return;
        }

        const updatedData = {
            username: name,
            email,
            phone: mobile,
            address: address,
            dob: dob
        };

        try {
            await dispatch(updateUser(updatedData)).unwrap();
            navigation.goBack("UserTab");
            ToastAndroid.show("Cập nhật thành công", ToastAndroid.SHORT);
        } catch (err) {
            ToastAndroid.show(`Lỗi: ${err}`, ToastAndroid.LONG);
        }
    };



    const handleLogout = async () => {
        try {
            await dispatch(logoutUser()).unwrap();

            localStorage.removeItem("token");

            // Nếu dùng AsyncStorage (native)
            // await AsyncStorage.removeItem("token");

            ToastAndroid.show("Đăng xuất thành công", ToastAndroid.SHORT);
            navigation.reset({
                index: 0,
                routes: [{ name: "login" }],
            });
        } catch (err) {
            ToastAndroid.show("Lỗi khi đăng xuất", ToastAndroid.LONG);
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
                    placeholder="Email-id"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Date of birth"
                    value={formatDate(dob)}
                    onChangeText={setDob}
                // keyboardType=""
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
                    {loading ? 'Đang cập nhật...' : 'Update'}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>Logout</Text>
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
        position: 'relative',
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
