import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function SignInScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign In</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#aaa"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
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

            <TouchableOpacity style={styles.button}>
                <LinearGradient
                    colors={['#FFC107', '#FF9800']}
                    style={styles.gradient}
                >
                    <Text style={styles.buttonText}>SIGN IN</Text>
                </LinearGradient>
            </TouchableOpacity>

            <Text style={styles.signupText}>
                Don’t have an account?
                <Text style={styles.signupLink}> Sign Up</Text>
            </Text>

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
    button: {
        marginTop: 30,
        borderRadius: 25,
        overflow: 'hidden',
    },
    gradient: {
        paddingVertical: 14,
        borderRadius: 25,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 16,
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
});
