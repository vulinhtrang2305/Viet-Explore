import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
    lat: number;
    lng: number;
    name?: string;
};

export default function LocationScreenButton({ lat, lng, name }: Props) {
    const openGoogleMaps = () => {
        const url = `https://www.google.com/maps?q=${lat},${lng}`;
        Linking.openURL(url);
    };

    return (
        <TouchableOpacity onPress={openGoogleMaps} style={styles.button}>
            <Ionicons name="map-outline" size={18} color="#fff" style={{ marginRight: 6 }} />
            <Text style={styles.text}>Xem trên Google Maps{name ? ` - ${name}` : ''}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        marginTop: 20,
        backgroundColor: '#00C2FF',
        padding: 12,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
    },
    text: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
