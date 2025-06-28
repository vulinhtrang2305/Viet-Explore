import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../../store/slices/userSlice';

export default function ProfileDetail() {
    const dispatch = useDispatch();
    const userInfo = useSelector((state: any) => state.users.userInfo);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (!userInfo) {
            dispatch(getProfile());
        } else {
            setName(userInfo.name || '');
            setEmail(userInfo.email || '');
            setMobile(userInfo.phone || '');
        }
    }, [userInfo]);

    const handleUpdate = () => {
        console.log('Update clicked');
        // Gọi API update ở đây
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
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
            </View>

            <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
                <Text style={styles.updateText}>Update</Text>
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
    cameraIcon: {
        position: 'absolute',
        bottom: 0,
        right: 100 / 2 - 15,
        backgroundColor: '#007AFF',
        borderRadius: 15,
        padding: 5,
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
