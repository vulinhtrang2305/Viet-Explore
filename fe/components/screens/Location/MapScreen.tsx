import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    ActivityIndicator,
    Text,
    Platform,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { fetchSpots } from '../../../store/slices/spotSlice';

export default function MapScreen() {
    const dispatch = useDispatch();
    const { spots, loading, error } = useAppSelector((state) => state.spots);
    const [region, setRegion] = useState<Region | null>(null);

    useEffect(() => {
        dispatch(fetchSpots());
    }, [dispatch]);

    useEffect(() => {
        const validSpot = spots.find(
            (s) => s.location?.lat !== undefined && s.location?.lng !== undefined
        );
        if (validSpot) {
            setRegion({
                latitude: validSpot.location.lat,
                longitude: validSpot.location.lng,
                latitudeDelta: 3,
                longitudeDelta: 3,
            });
        }
    }, [spots]);

    if (loading || !region) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#00C2FF" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.center}>
                <Text style={{ color: 'red' }}>Lỗi: {error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={region}
                provider={
                    Platform.OS === 'android' || Platform.OS === 'ios'
                        ? PROVIDER_GOOGLE
                        : undefined
                }
            >
                {spots.map((spot) => {
                    if (!spot.location?.lat || !spot.location?.lng) return null;
                    return (
                        <Marker
                            key={spot._id}
                            coordinate={{
                                latitude: spot.location.lat,
                                longitude: spot.location.lng,
                            }}
                            title={spot.name}
                            description={spot.type || ''}
                        />
                    );
                })}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
