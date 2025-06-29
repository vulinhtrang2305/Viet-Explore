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
import { fetchFavouritesByUser } from '../../../store/slices/favouriteSlice';
import { fetchSpots } from '../../../store/slices/spotSlice';

const FavouriteList = () => {
    const dispatch = useDispatch();
    const { userFavourite, loading, error } = useSelector((state: RootState) => state.favourites);
    const { spots } = useSelector((state: RootState) => state.spots);
    const userId = useSelector((state: RootState) => state.users.userInfo?._id);

    useEffect(() => {
        if (userId) {
            dispatch(fetchFavouritesByUser(userId));
        }
        dispatch(fetchSpots());
    }, [dispatch, userId]);

    const filteredSpots = userFavourite
        ? spots.filter((spot) => userFavourite.spotId.includes(spot._id?.toString()))
        : [];

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.card}>
            <Image
                source={{ uri: item.imageUrl?.[0] }}
                style={styles.image}
            />
            <View>
                <Text style={styles.title}>{item.name}</Text>
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
                keyExtractor={(item) => item._id}
                renderItem={renderItem}
                ListEmptyComponent={
                    <View style={styles.center}>
                        <Text style={styles.emptyText}>
                            Chưa có địa điểm nào trong mục yêu thích.
                        </Text>
                    </View>
                }
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
        width: 100,
        height: 100,
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
    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        color: '#666',
        fontSize: 15,
    },
});
