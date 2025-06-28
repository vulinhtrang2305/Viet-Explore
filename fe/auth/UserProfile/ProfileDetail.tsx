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
import { getProfile, updateUser } from '../../store/slices/userSlice';

export default function ProfileDetail() {
    const dispatch = useDispatch();
    const { userInfo, loading, error, message } = useSelector((state: any) => state.users);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        if (!userInfo) {
            dispatch(getProfile());
        } else {
            setName(userInfo?.username || '');
            setEmail(userInfo?.email || '');
            setMobile(userInfo?.phone || '');
            setAddress(userInfo?.address || '');
        }
    }, [userInfo]);

    const handleUpdate = async () => {
        if (!name || !email || !mobile || !address) {
            ToastAndroid.show("Vui lòng điền đầy đủ thông tin", ToastAndroid.SHORT);
            return;
        }

        const updatedData = {
            username: name,
            email,
            phone: mobile,
            address: address
        };

        try {
            await dispatch(updateUser(updatedData)).unwrap();
            ToastAndroid.show("Cập nhật thành công", ToastAndroid.SHORT);
        } catch (err) {
            ToastAndroid.show(`Lỗi: ${err}`, ToastAndroid.LONG);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Edit Profile</Text>

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
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 22,
        fontWeight: '600',
        marginBottom: 10,
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
        backgroundColor: '#00c6ff',
        alignItems: 'center',
    },
    updateText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
