import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    Dimensions,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { fetchSpots } from '../../../store/slices/spotSlice';
import { fetchReviews } from '../../../store/slices/reviewSlice';
import { fetchUsers } from '../../../store/slices/userSlice';

const screenWidth = Dimensions.get('window').width;

export default function ReviewDetailScreen() {
    const dispatch = useDispatch();
    const { spots } = useAppSelector((state) => state.spots);
    const { users } = useAppSelector((state) => state.users);
    const { reviews } = useAppSelector((state) => state.reviews);

    useEffect(() => {
        dispatch(fetchSpots());
        dispatch(fetchUsers());
        dispatch(fetchReviews());
    }, [dispatch]);

    const route = useRoute();
    const { spotId } = route.params;

    const selectedSpot = spots?.find(s => s._id === spotId);
    const spotReviews = reviews.filter(r => r.spotId === spotId);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Đánh giá cho: {selectedSpot?.name}</Text>

            <FlatList
                data={spotReviews}
                keyExtractor={item => item._id}
                renderItem={({ item }) => {
                    const userFind = users.find(u => u._id === item.userId);
                    return (
                        <View style={styles.card}>
                            <View style={styles.header}>
                                <Ionicons name="person-circle-outline" size={28} color="#777" />
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={styles.username}>{userFind?.username || 'Người dùng'}</Text>
                                    <Text style={styles.date}>
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.ratingRow}>
                                <Ionicons name="star" size={18} color="#FFD700" />
                                <Text style={styles.rating}>{item.rating}/5</Text>
                            </View>

                            <Text style={styles.comment}>{item.comment}</Text>

                            <FlatList
                                data={item.imageUrl}
                                horizontal
                                keyExtractor={(uri, i) => `${item._id}-${i}`}
                                renderItem={({ item: img }) => (
                                    <Image source={{ uri: img }} style={styles.reviewImage} />
                                )}
                                showsHorizontalScrollIndicator={false}
                                style={{ marginTop: 10 }}
                            />
                        </View>
                    );
                }}
                ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
                contentContainerStyle={{ paddingVertical: 12 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#333',
    },
    card: {
        backgroundColor: '#F9F9F9',
        borderRadius: 12,
        padding: 14,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 2,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    username: {
        fontWeight: '600',
        fontSize: 16,
        color: '#333',
    },
    date: {
        fontSize: 12,
        color: '#888',
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    rating: {
        marginLeft: 6,
        fontSize: 14,
        color: '#555',
    },
    comment: {
        marginTop: 8,
        fontSize: 14,
        color: '#444',
        lineHeight: 20,
    },
    reviewImage: {
        width: screenWidth * 0.6,
        height: 200,
        borderRadius: 10,
        marginRight: 10,
    },
});
