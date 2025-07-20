import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    ToastAndroid,
    ScrollView
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { registerUser, resetError } from '../../store/slices/userSlice';

export default function RegisterScreen() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const { loading, error, userInfo } = useSelector((state) => state.users);

    useEffect(() => {
        dispatch(resetError());
    }, [dispatch]);

    useEffect(() => {
        if (userInfo) {
            navigation.goBack("login");
        }
    }, [userInfo]);

    const handleRegister = () => {
        if (!email || !password || !username) {
            ToastAndroid.showWithGravity(
                'Hãy nhập đầy đủ thông tin',
                ToastAndroid.SHORT,
                ToastAndroid.TOP
            );
            return;
        }
        dispatch(registerUser({ username, email, password }));
    };

    return (
      <ScrollView>
            <View style={styles.container}>
                <Image
                    source={{ uri: "https://res.cloudinary.com/dd4qz2k1g/image/upload/v1752963063/Green_Minimal_Travel_Business_Logo_nnjajm.png" }}
                    style={styles.logo}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    placeholderTextColor="#aaa"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#aaa"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                />

                <View style={styles.passwordRow}>
                    <TextInput
                        style={styles.passwordInput}
                        placeholder="Password"
                        placeholderTextColor="#aaa"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>

                <TouchableOpacity style={styles.plainButton} onPress={handleRegister}>
                    <Text style={styles.buttonText}>
                        {loading ? 'Signing in...' : 'Đăng Ký'}
                    </Text>
                </TouchableOpacity>

                {error && (
                    <Text style={styles.errorText}>
                        {error}
                    </Text>
                )}
            </View>
      </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 30,
        paddingTop: 100,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 30,
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 12,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 16,
    },
    passwordRow: {
        position: 'relative',
        marginBottom: 20,
    },
    passwordInput: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 12,
        paddingHorizontal: 15,
        fontSize: 16,
    },
    forgot: {
        position: 'absolute',
        right: 10,
        top: 15,
        color: '#007BFF',
        fontSize: 14,
    },
    plainButton: {
        backgroundColor: '#FF9800',
        paddingVertical: 14,
        borderRadius: 25,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 10,
    },
    signupText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 14,
        color: '#444',
    },
    signupLink: {
        color: '#FF9800',
        fontWeight: '600',
        marginTop: 50,
    },
    or: {
        textAlign: 'center',
        marginTop: 30,
        fontSize: 14,
        color: '#666',
    },
    socialRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 15,
    },
    socialButton: {
        width: 45,
        height: 45,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 22.5,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        backgroundColor: '#fff',
    },
    logo: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginLeft: 5
    },
});
