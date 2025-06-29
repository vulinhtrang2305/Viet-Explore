import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { fetchFavourites } from '../../../store/slices/favouriteSlice';
import { fetchSpots } from '../../../store/slices/spotSlice';

const FavouriteList = () => {
    const dispatch = useDispatch();
    const { favourites, loading, error } = useSelector((state: RootState) => state.favourites);
    const { spots } = useSelector((state: RootState) => state.spots);
    const userId = useSelector((state: RootState) => state.users.userInfo?._id);

    useEffect(() => {
        dispatch(fetchFavourites());
        dispatch(fetchSpots()); 
    }, [dispatch]);

    const userFavourite = favourites.find(fav => fav.userId === userId);
    const filteredSpots = userFavourite
        ? spots.filter(spot => userFavourite.spotId.includes(spot._id))
        : [];

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View>
                <Text style={styles.title}>{item.title}</Text>
                <Text numberOfLines={2} style={styles.description}>{item.description}</Text>
            </View>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#00c6ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.center}>
                <Text style={styles.error}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Địa điểm yêu thích</Text>
            <FlatList
                data={filteredSpots}
                keyExtractor={item => item._id}
                renderItem={renderItem}
                contentContainerStyle={{ paddingBottom: 100 }}
            />
        </View>
    );
};

export default FavouriteList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingTop: 20,
    },
    header: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 10,
    },
    card: {
        backgroundColor: '#f9f9f9',
        marginBottom: 12,
        padding: 12,
        borderRadius: 10,
        flexDirection: 'row',
        gap: 12,
    },
    image: {
        width: 90,
        height: 70,
        borderRadius: 8,
    },
    title: {
        fontWeight: '600',
        fontSize: 16,
    },
    description: {
        color: '#666',
        fontSize: 13,
        marginTop: 4,
        maxWidth: 230,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    error: {
        color: 'red',
    },
});