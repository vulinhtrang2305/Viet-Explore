import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { useNavigation } from '@react-navigation/native';

export default function NearbyLocationC() {
    const navigation = useNavigation();
    const { spots } = useAppSelector((state) => state.spots);
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [nearbySpots, setNearbySpots] = useState([]);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                alert('Bạn cần cấp quyền vị trí để xem địa điểm gần bạn.');
                setLoading(false);
                return;
            }

            let loc = await Location.getCurrentPositionAsync({});
            setLocation(loc.coords);
        })();
    }, []);

    useEffect(() => {
        if (location && spots.length > 0) {
            const spotsNearby = spots.filter((spot) => {
                const dist = getDistance(
                    location.latitude,
                    location.longitude,
                    spot.location.lat,
                    spot.location.lng
                );
                return dist <= 50; // chỉ lấy trong bán kính 10km
            });
            setNearbySpots(spotsNearby);
            setLoading(false);
        }
    }, [location, spots]);

    const getDistance = (lat1, lon1, lat2, lon2) => {
        const toRad = (value) => (value * Math.PI) / 180;
        const R = 6371; // km
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) *
            Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    if (loading) {
        return <ActivityIndicator size="large" style={{ marginTop: 20 }} />;
    }

    if (nearbySpots.length === 0) {
        return <Text style={styles.noResult}>Không tìm thấy địa điểm gần bạn.</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>📍 Địa điểm gần bạn</Text>
            <FlatList
                horizontal
                data={nearbySpots}
                keyExtractor={(item) => item._id}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('description', { spotId: item._id })}
                        style={styles.card}
                    >
                        <Image source={{ uri: item.imageUrl[0] }} style={styles.image} />
                        <Text style={styles.name}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        paddingLeft: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    card: {
        marginRight: 16,
        width: 160,
    },
    image: {
        width: '100%',
        height: 100,
        borderRadius: 12,
    },
    name: {
        marginTop: 8,
        fontSize: 14,
        fontWeight: '500',
        color: '#444',
    },
    noResult: {
        textAlign: 'center',
        marginTop: 20,
        color: '#888',
    },
});
