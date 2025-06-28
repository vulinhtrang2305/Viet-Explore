import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    ToastAndroid
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { loginUser, resetError } from '../../store/slices/userSlice';

export default function SignInScreen() {
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
            navigation.goBack("UserTab");
        }
    }, [userInfo]);

    const handleLogin = () => {
        if (!email || !password) {
            ToastAndroid.showWithGravity(
                'Hãy nhập đầy đủ thông tin',
                ToastAndroid.SHORT,
                ToastAndroid.TOP
            );
            return;
        }
        dispatch(loginUser({ email, password }));
    };

    return (
        <View style={styles.container}>
            {/* <Text style={styles.title}>Sign In</Text> */}

            <Image
                source={require('../../assets/logo.svg')}
                style={styles.logo}
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
                <TouchableOpacity>
                    <Text style={styles.forgot}>Forgot password</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.plainButton} onPress={handleLogin}>
                <Text style={styles.buttonText}>
                    {loading ? 'Signing in...' : 'SIGN IN'}
                </Text>
            </TouchableOpacity>

            {error && (
                <Text style={styles.errorText}>
                    {error}
                </Text>
            )}

            <TouchableOpacity onPress={() => navigation.navigate("register")}>
                <Text style={styles.signupText}>
                    Don’t have an account?
                    <Text style={styles.signupLink}> Sign Up</Text>
                </Text>
            </TouchableOpacity>

            <Text style={styles.or}>Or sign in with:</Text>

            <View style={styles.socialRow}>
                <TouchableOpacity style={styles.socialButton}>
                    <FontAwesome name="facebook" size={20} color="#3b5998" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                    <FontAwesome name="google" size={20} color="#DB4437" />
                </TouchableOpacity>
            </View>
        </View>
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
        marginTop: 30,
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
